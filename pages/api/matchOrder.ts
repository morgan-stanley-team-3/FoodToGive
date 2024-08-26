// pages/api/matchOrders.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Db, MongoClient } from 'mongodb';

// MongoDB connection details
const uri =
  'mongodb+srv://rwu:Wu123456@atlascluster.zs8ab.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';
const dbName = 'database';
const donationsCollection = 'donations';
const requestsCollection = 'requests';
const agencyScoreCollection = 'agency';
const entityCollection = 'entities';

// Interface definitions
interface Donation {
  entityName: string;
  foodType: string;
  foodName: string;
  foodCategory: string;
  bestBeforeDate: string;
  specialStorageRequirements: string;
  deliveryMethod: string; // "self-drop" or "pickup"
  dropOffTime: string;
  pickUpLocation: string;
  pickUpTime: string;
  datePrepared: string;
  quantity: number; // or could do weight but servings make more sense
  consumeByTime: string;
}

interface Request {
  entityName: string;
  foodType: string;
  foodName: string;
  needByTime: string;
  foodCategory: string;
  specialRequest: string;
  deliveryMethod: string; // "self-drop" or "pickup"
  deliveryTime: string;
  deliveryLocation: string;
  quantity: number; // In kg or units
}

interface EntityLocation {
  entityName: string;
  Geo_location: [number, number]; // [x, y] coordinates
}

interface AgencyScore {
  entityName: string;
  score: number;
}

// Validity check function
const checkMatchValidity = (donation: Donation, request: Request): boolean => {
  if (
    donation.foodType !== request.foodType ||
    donation.foodCategory !== request.foodCategory ||
    donation.deliveryMethod !== request.deliveryMethod
  ) {
    return false;
  }

  if (
    donation.deliveryMethod === 'selfDelivery' &&
    donation.dropOffTime &&
    new Date(donation.dropOffTime) > new Date(request.needByTime)
  ) {
    return false;
  }

  if (
    donation.deliveryMethod === 'pickup' &&
    donation.pickUpTime &&
    new Date(donation.pickUpTime) > new Date(request.deliveryTime)
  ) {
    return false;
  }

  return true;
};

// Basic Cartesian distance calculation (Euclidean distance)
const calculateDistance = (
  coord1: [number, number],
  coord2: [number, number]
): number => {
  const [x1, y1] = coord1;
  const [x2, y2] = coord2;

  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

// Calculate match score based on quantity and distance
const calculateMatchScore = async (
  donation: Donation,
  request: Request,
  db: Db
): Promise<number> => {
  let score = 0;

  const entities = db.collection<EntityLocation>(entityCollection);

  // Retrieve coordinates for donation and request entities
  const donationEntity = await entities.findOne({
    entityName: donation.entityName,
  });
  const requestEntity = await entities.findOne({
    entityName: request.entityName,
  });

  if (donationEntity && requestEntity) {
    const distance = calculateDistance(
      donationEntity.Geo_location,
      requestEntity.Geo_location
    );

    // Add more points the closer the distance is (inverse relationship)
    score += Math.max(0, 50 - distance); // Example: max score of 50 for zero distance, decreases with distance
  }

  // Quantity score, the closer it is, the better
  if (Math.abs(donation.quantity - request.quantity) <= 50) {
    // Assuming 50 kg/unit tolerance
    score += 50 - Math.abs(donation.quantity - request.quantity);
  }

  return score;
};

// Main handler for matching donations and requests
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let client: MongoClient;

  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);

    const donations = await db
      .collection<Donation>(donationsCollection)
      .find({})
      .toArray();
    const requests = await db
      .collection<Request>(requestsCollection)
      .find({})
      .toArray();
    const agencyScores = await db
      .collection<AgencyScore>(agencyScoreCollection)
      .find({})
      .toArray();

    // Create the matches pair and check match validity before calculating score
    const matches = [];

    for (const donation of donations) {
      const potentialMatches = requests
        .filter((request) => checkMatchValidity(donation, request))
        .map(async (request) => ({
          request,
          score: await calculateMatchScore(donation, request, db),
        }));

      if (potentialMatches.length > 0) {
        const resolvedMatches = await Promise.all(potentialMatches);

        resolvedMatches.forEach(async (match) => {
          // Update the agency's score for every valid match
          const agencyScore = agencyScores.find(
            (score) => score.entityName === match.request.entityName
          );
          if (agencyScore) {
            agencyScore.score += match.score;
            await db
              .collection<AgencyScore>(agencyScoreCollection)
              .updateOne(
                { entityName: match.request.entityName },
                { $set: { score: agencyScore.score } }
              );
          } else {
            await db.collection<AgencyScore>(agencyScoreCollection).insertOne({
              entityName: match.request.entityName,
              score: match.score,
            });
          }
        });

        // Find the best match for the current donation
        resolvedMatches.sort((a, b) => b.score - a.score);
        const bestMatch = resolvedMatches[0];

        matches.push({
          donation,
          bestMatch: bestMatch.request,
          score: bestMatch.score,
        });
      }
    }
    console.log('hi', matches);

    // Return the best match for each donation
    res.status(200).json(matches);
  } catch (error) {
    console.error('Error matching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (client!) await client.close();
  }
}
