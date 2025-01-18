
// pages/results/index.tsx
"use client";

import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../../../firebase/clientApp"; // Adjust the path based on your project structure

export default function Page() {
  const [yapData, setYapData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming `name` is passed as a query parameter or stored somehow
        const name = "someUser"; // Replace with dynamic logic based on user input
        const db = getFirestore(app);
        const docRef = doc(db, "yap", name.toLowerCase());
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          setYapData(docSnapshot.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!yapData) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>Results for {yapData.name}</h1>
      <ul>
        {Object.keys(yapData).map((sessionKey) => (
          <li key={sessionKey}>
            <h2>{sessionKey}</h2>
            <p>{yapData[sessionKey].yap}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
