'use client'

import {useCollection} from "react-firebase-hooks/firestore"
import app from "../../firebase/clientApp";
import firebase from "firebase/compat/app";
import { getFirestore, collection, Firestore, QuerySnapshot, DocumentData } from "firebase/firestore";

require('dotenv').config();

export default function Home() {
  const db = getFirestore(app);
  const yapsCollectionRef = collection(db, "yaps");
  const [yapData, yapLoading, yapError] = useCollection(yapsCollectionRef, {});
    
  if (!yapLoading && yapData) {
    yapData.docs.map((doc) => console.log(doc.data()));
  }

  console.log(process.env.apiKey);

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    </main>
  );
}

