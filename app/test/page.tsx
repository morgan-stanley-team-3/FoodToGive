"use client";
import React, { useEffect } from "react";

const MyComponent: React.FC = () => {
  useEffect(() => {
    const fetchMatchingData = async () => {
      try {
        const response = await fetch("/api/matchOrder");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching routes data:", error);
      }
    };

    fetchMatchingData();
  }, []);

  return <></>; // This returns an empty fragment; you might want to return some JSX here
};

export default MyComponent;
