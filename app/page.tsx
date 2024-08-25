"use client";
// Sample usage of optimizeRoutes API

import React, { useEffect, useState } from 'react';

const RouteOptimizer: React.FC = () => {
  const [routesData, setRoutesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchRoutesData = async () => {
      try {
        const response = await fetch('/api/optimizeRoutes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRoutesData(data);
      } catch (error) {
        console.error('Error fetching routes data:', error);
      }
    };

    fetchRoutesData();
  }, []);

  return (
    <div>
      <h1>Routes Data</h1>
      <pre>{JSON.stringify(routesData, null, 2)}</pre>
    </div>
  );
};

export default RouteOptimizer;
