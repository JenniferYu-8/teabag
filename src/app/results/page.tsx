"use client"

import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {useSearchParams} from "next/navigation";
import app from "../../../firebase/clientApp"; // Ensure this is correctly imported

export default function Page() {
  const [yapData, setYapData] = useState<any>(null); // to store fetched data
  const [loading, setLoading] = useState(true); // to manage loading state
  
  const searchParams = useSearchParams();
  const name = searchParams.get("name"); // Extract name from query params

  useEffect(() => {
    if (!name) return; // If name is not present, do nothing

    const fetchData = async () => {
      try {
        const db = getFirestore(app); // Initialize Firestore
        const docRef = doc(db, "yaps", name.toLowerCase()); // Reference to the document
        console.log("Fetching data for:", name);
        
        const docSnap = await getDoc(docRef); // Fetch document snapshot
        
        if (docSnap.exists()) {
          setYapData(docSnap.data()); // Set data if document exists
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchData(); // Call the async fetchData function

  }, [name]); // Re-run when 'name' changes

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  if (!yapData) {
    return <div className="flex justify-center items-center h-screen text-lg">No data available for {name}</div>;
  }

  return (
    <section className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto mt-10 bg-gray-100 shadow-lg rounded-lg p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800">De-yappified story {yapData.name}</h1>
        <div className="space-y-4 mb-5">
          <p className="text-gray-600">{yapData.results.yap}</p>

        </div>
      </div>
      <div className="flex items-center justify-center mt-10">
        <button >
          <a href="/"
            className="px-4 py-2 mt-4 text-sm font-medium text-white bg-[#C2D02F] rounded-md hover:bg-[#AFBC29]"
          >Go back</a>
        </button>
      </div >
    </section>
  );
}




// // pages/results/index.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation"; // Import useSearchParams to get query parameters
// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import app from "../../../firebase/clientApp"; // Adjust the path based on your project structure

// export default function Page() {
//   const [yapData, setYapData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const searchParams = useSearchParams();
//   const name = searchParams.get("name"); // Extract the 'name' parameter from the query string

//   useEffect(() => {
//     // Fetch data only if 'name' is available in the query
//     if (!name) return;

//     const fetchData = async () => {
//       try {
//         const db = getFirestore(app);
//         const docRef = doc(db, "yap", Array.isArray(name) ? name[0].toLowerCase() : name.toLowerCase()); // Handle case where 'name' might be an array
//         const docSnapshot = await getDoc(docRef);

//         if (docSnapshot.exists()) {
//           setYapData(docSnapshot.data());
//         } else {
//           console.log("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [name]); // Re-run the effect when 'name' changes

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!yapData) {
//     return <div>No data available for {name}</div>;
//   }

//   return (
//     <section className="bg-gray-50">
//       <div className="flex flex-col items-center justify-center text-center">
//         <h1>Results for {yapData.name}</h1>
//         <ul>
//           {Object.keys(yapData).map((sessionKey) => (
//             <li key={sessionKey}>
//               <h2>{sessionKey}</h2>
//               <p>{yapData[sessionKey].yap}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }

