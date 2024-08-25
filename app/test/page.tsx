"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";
// Import customIcon if you have it, otherwise remove the icon prop in Marker
// import customIcon from './path-to-your-icon';

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [32, 32],
});

const MapComponent: React.FC = () => {
  const [routesData1, setRoutesData1] = useState<any[]>([]); // Initialize as an array
  const [routesData2, setRoutesData2] = useState<any[]>([]);
  const [routesData3, setRoutesData3] = useState<any[]>([]);
  const [decodedPolyline1, setDecodedPolyline1] = useState(); // Initialize as an array
  const [decodedPolyline2, setDecodedPolyline2] = useState(); // Initialize as an array
  const [decodedPolyline3, setDecodedPolyline3] = useState(); // Initialize as an array

  useEffect(() => {
    const fetchRoutesData = async () => {
      try {
        const response = await fetch("/api/optimizeRoutes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log("data ", data);
        console.log("data[0] ", data[0]);

        setRoutesData1(data[0].coordinates || []); // Ensure it's an array
        setDecodedPolyline1(
          polyline.decode(data[0].geometry).map(([lat, lng]) => [lat, lng])
        );

        setRoutesData2(data[1].coordinates || []); // Ensure it's an array
        setDecodedPolyline2(
          polyline.decode(data[1].geometry).map(([lat, lng]) => [lat, lng])
        );

        setRoutesData3(data[2].coordinates || []); // Ensure it's an array
        setDecodedPolyline3(
          polyline.decode(data[2].geometry).map(([lat, lng]) => [lat, lng])
        );
      } catch (error) {
        console.error("Error fetching routes data:", error);
      }
    };

    fetchRoutesData();
  }, []);

  return (
    <>
      {routesData1.length > 0 && (
        <MapContainer
          center={[1.3521, 103.8198]}
          zoom={13}
          style={{ height: "100vh" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {routesData1.map((route, index) => (
            <Marker
              key={index}
              position={[route.location[1], route.location[0]]}
              icon={customIcon} // Remove this line if customIcon is not defined
            />
          ))}
          <Polyline positions={decodedPolyline1} color="blue" weight={5} />

          {routesData2.map((route, index) => (
            <Marker
              key={index}
              position={[route.location[1], route.location[0]]}
              icon={customIcon} // Remove this line if customIcon is not defined
            />
          ))}
          <Polyline positions={decodedPolyline2} color="green" weight={5} />

          {routesData3.map((route, index) => (
            <Marker
              key={index}
              position={[route.location[1], route.location[0]]}
              icon={customIcon} // Remove this line if customIcon is not defined
            />
          ))}
          <Polyline positions={decodedPolyline3} color="yellow" weight={5} />
        </MapContainer>
      )}
    </>
  );
};

export default MapComponent;
