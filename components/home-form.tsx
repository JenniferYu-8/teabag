"use client";

import React, { useState } from "react";
import { ReactMic } from "react-mic";
import Image from 'next/image';
import {useCollection} from "react-firebase-hooks/firestore"
import app from "../firebase/clientApp";
import firebase from "firebase/compat/app";
import { getFirestore, addDoc, doc, setDoc, getDoc, updateDoc, collection, Firestore, QuerySnapshot, DocumentData } from "firebase/firestore";

require('dotenv').config();


export default function HomeForm() {
  const [name, setName] = useState("");
  const [secondDropdown, setSecondDropdown] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [useTextarea, setUseTextarea] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [sessionsForUser, setSessionsForUser] = useState<string[]>([]); ;

  const handleStartRecording = () => setIsRecording(true);
  const handleStopRecording = (recordedBlob: { blob: Blob | MediaSource; }) => {
    setIsRecording(false);
    setAudioURL(URL.createObjectURL(recordedBlob.blob));
  };

  //backend starts here
  const db = getFirestore(app);
  const yapsCollectionRef = collection(db, "yaps");
  // const [yapData, yapLoading, yapError] = useCollection(yapsCollectionRef, {});
  // const user = "wooooo";
    
  // if (!yapLoading && yapData) {
  //   yapData.docs.map((doc) => console.log(doc.data()));
  // }

  //add feature
  const onSubmit = async (e: { preventDefault: () => void; }) => {
    const docRef = doc(db, "yaps", name.toLowerCase());
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // Access the document ID
      const data = docSnapshot.data();
      const sessionCount = Object.keys(data).filter(key => key.startsWith('Session')).length;
      await updateDoc(docRef, {
        [`Session ${String(sessionCount + 1)}`]: {
          name,
          secondDropdown,
          audioURL: useTextarea ? textareaValue : audioURL,
        }
      });  
    } else {
      try {
        await setDoc(docRef, {
        "Session 1": {
          name,
          secondDropdown,
          audioURL: useTextarea ? textareaValue : audioURL,
        },
        });
        console.log("Document written with custom ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } 
  }


  //add onChangeName feature
  const onChangeName = async (newName: string) => {
    console.log("we are running");
    const docRef = doc(db, "yaps", newName.toLowerCase());
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      // Access the document data
      const data = docSnapshot.data();
      let sessionCount = Object.keys(data);
      setSessionsForUser(sessionCount); 
      console.log(sessionCount);  
    }
    else {
      setSessionsForUser([]); 
    }
  };
    
  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        <div className="pb-1">
          <Image src="/teabag.png" alt="Teabag logo" width="192" height="192" quality="95"></Image>
        </div>

        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3">
          {/* Dropdown 1 */}
          <label className="flex flex-col">
            Yapper's name
            <input
              type="text"
              value={name}
              onChange={(e) => {
                const newName = e.target.value;
                setName(newName);
                onChangeName(newName); // Pass the new name to the function
              }}
              required
              className="p-2.5 rounded-full bg-gray-100 focus:bg-gray-50"
            />
          </label>
          <br />

          {/* Dropdown 2 */}
          <label className="flex flex-col">
            Do you want to add onto a certain conversation?:
            <select
              value={secondDropdown}
              onChange={(e) => setSecondDropdown(e.target.value)}
              required
              className="p-2.5 bg-gray-100 focus:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full"
            >
              <option value="" disabled>
                Select...
              </option>
              
              <option value="new-yap">Nope, this is a new yap session</option>
              {sessionsForUser.map((user) => (
                  <option key={user} value={user}>{user}</option>
              ))} 
              </select>
          </label>
          <br />

          <div className="flex flex-col md:flex-row gap-8">
            {/* Audio Recorder */}
            <div className="flex flex-col items-start">
              <h3>Audio Recorder</h3>
              <ReactMic
                record={isRecording}
                onStop={handleStopRecording}
                mimeType="audio/webm"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleStartRecording}
                  disabled={isRecording}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                >
                  Start Recording
                </button>
                <button
                  type="button"
                  onClick={() => setIsRecording(false)}
                  disabled={!isRecording}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
                >
                  Stop Recording
                </button>
              </div>
              {audioURL && (
                <div className="mt-4">
                  <h4>Recorded Audio:</h4>
                  <audio controls src={audioURL}></audio>
                </div>
              )}
            </div>

            {/* Textarea */}
            <div className="flex flex-col items-start">
              <h3>Enter Text</h3>
              <textarea
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                className="w-full h-32 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>


          <button type="submit">Submit</button>
        </form>
      </div>

    </section>
  );
}
