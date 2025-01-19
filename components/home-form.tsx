"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import app from "../firebase/clientApp"; // your Firebase config
import Image from 'next/image';
import { ReactMic } from "react-mic";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillStopCircleFill } from "react-icons/bs";
import { BsFillRecordFill } from "react-icons/bs";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
// import "../src/app/globals.css";
import Link from "next/link";

export default function HomeForm() {
  const [name, setName] = useState("");
  const [secondDropdown, setSecondDropdown] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [useTextarea, setUseTextarea] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [sessionsForUser, setSessionsForUser] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Ensure you call it inside a page component

  const db = getFirestore(app);

  const handleStartRecording = () => setIsRecording(true);
  const handleStopRecording = (recordedBlob: { blob: Blob | MediaSource; }) => {
    setIsRecording(false);
    setAudioURL(URL.createObjectURL(recordedBlob.blob));
  };

  const {
    transcript, 
    listening, 
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  const generatePercentage = (inputString: string, cohereString: string) => {
    const sentenceRegex = /([.!?])\s+/;
  
    // Split the inputString into sentences
    const inputSentences = inputString.split(sentenceRegex).filter(Boolean);
    let inputResult: string[] = [];
    for (let i = 0; i < inputSentences.length; i += 2) {
      const sentence = inputSentences[i] + (inputSentences[i + 1] || '');
      inputResult.push(sentence.trim());
    }
  
    // Split the cohereString into sentences
    const cohereSentences = cohereString.split(sentenceRegex).filter(Boolean);
    let cohereResult: string[] = [];
    for (let i = 0; i < cohereSentences.length; i += 2) {
      const sentence = cohereSentences[i] + (cohereSentences[i + 1] || '');
      cohereResult.push(sentence.trim());
    }
  
    let similarCount = 0;
    let totalCount = 0;
  
    // Compare sentences
    const minLength = Math.min(inputResult.length, cohereResult.length);
    for (let i = 0; i < minLength; i++) {
      // Get the sentences, use empty string if one array is shorter
      const inputSentence = inputResult[i] || "";
      const cohereSentence = cohereResult[i] || "";
  
      // Compare sentences and count similarity
      if (inputSentence === cohereSentence) {
        similarCount++;
      }
      totalCount++;
    }
  
    // Calculate percentage of similarity
    const percentage = (similarCount / totalCount) * 100;
  
    console.log(`Similar sentences: ${similarCount}`);
    console.log(`Total comparisons: ${totalCount}`);
    console.log(`Similarity percentage: ${percentage.toFixed(2)}%`);
  
    return percentage;  // Optionally return the percentage
  };
  
  
  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent form submission and page reload

    if (!name.trim()) {
      alert("Please enter a name.");
      return;
    }

    if (!textareaValue.trim() && !audioURL) {
      alert("Please record audio or enter text.");
      return;
    }

    setIsLoading(true); // Start loading

    //checks fetching the reordered shit
    const response = await fetch('http://127.0.0.1:5000/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({yap: textareaValue ? textareaValue : audioURL }),
    });

    const result = await response.json();

    const docRef = doc(db, "yaps", name.toLowerCase());

    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
            // Access the document ID
            const data = docSnapshot.data();
            const sessionCount = Object.keys(data).filter(key => key.startsWith('Session')).length;
            if (secondDropdown !== "Nope, this is a new yap session") {
              //this one is getting the previous shit addded to the new shit
              const docRef2 = doc(db, "yaps", name.toLowerCase())
              const fieldValue = docSnapshot.data()[secondDropdown]?.yap;
              const combinedValue = `${fieldValue} ${textareaValue || audioURL}`;
              console.log(combinedValue)
              
              //calls api to make new updated thingy
              const response = await fetch('http://127.0.0.1:5000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({yap: combinedValue}),
              });
          
              const result = await response.json(); 
              const percentage = 100 - generatePercentage(combinedValue, result); 
              console.log("WORKED!")
              //updates the yap on the same drop down
              try {
                await updateDoc(docRef2, {
                  [`${secondDropdown}.yap`]: result, // textareaValue takes precedence
      
                }); 
              } catch (error) {
                console.error("Error updating document: ", error);
              }
              try {
                await updateDoc(docRef2, {
                  "results": {
                    yap: result,
                    percentage
                  }
                });  
              } catch (error) {
                console.error("Error updating session count: ", error);
              }
            }
            else {
              const percentage = 100 - generatePercentage(textareaValue ? textareaValue : audioURL, result);
              console.log(percentage);        
              try {
                await updateDoc(docRef, {
                  [`Session ${String(sessionCount + 1)}`]: {
                    name,
                    secondDropdown,
                    yap: result,
                  }
                });  
              } catch (error) {
                console.error("Error updating session count: ", error);
              }

              try {
                await updateDoc(docRef, {
                  "results": {
                    yap: result,
                    percentage
                  }
                });  
              } catch (error) {
                console.error("Error updating session count: ", error);
              }

            }
          } else {
            const percentage = 100 - generatePercentage(textareaValue ? textareaValue : audioURL, result);
            console.log(percentage);        
            try {
              await setDoc(docRef, {
              "Session 1": {
                name,
                secondDropdown,
                yap: result,
              },
              });
              console.log("Document written with custom ID: ", docRef.id);
            } catch (error) {
              console.error("Error adding document: ", error);
            }

            try {
              await updateDoc(docRef, {
                "results": {
                  yap: result,
                  percentage
                }
              });  
            } catch (error) {
              console.error("Error updating session count: ", error);
            }

          } 

    setIsLoading(false); // Stop loading once the result is returned
    // After successful submission, redirect to results page
    // router.push(`/results`);
    router.push(`/results?name=${name}`);
  };

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
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
          <Image src="/brewing.png" alt="Teabag brewing" width="150" height="150" quality="95" className="mt-5 animate-bounce"></Image>
          {/* <div className="text-white text-xl">Loading...</div> */}
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
         <div>
           <Image src="/teabag2.png" alt="Teabag logo" width="192" height="192" quality="95" className="mt-5"></Image>
         </div>

         <Image src="/teabag-top.png" alt="Teabag top" width="630" height="630" quality="95" className="-mt-12"></Image>
        <form onSubmit={onSubmit} className="mb-10 flex flex-col gap-3 border-r-8 border-b-8 border-l-8 border-gray-900 p-5 bg-[#E3B491] shadow-lg">
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
              className="p-2.5 rounded-full bg-gray-100 focus:bg-gray-50 shadow-md"
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
              className="p-2.5 bg-gray-100 focus:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full shadow-md"
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
                mimeType="audio/wav"
                className="w-[160] h-12 rounded-md shadow-md"
              />
              <div className="flex gap-16 mt-2 w-100">
                <button
                  type="button"
                  onClick={SpeechRecognition.startListening()}
                  disabled={isRecording}
                  className="px-4 py-2 bg-[#C2D02F] text-black rounded hover:bg-[#AFBC29] disabled:bg-gray-300 shadow-md"
                >
                 <BsFillRecordFill />
                </button>
                <button
                  type="button"
                  onClick={() => setIsRecording(false)}
                  disabled={!isRecording}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 shadow-md"
                >
                  <BsFillStopCircleFill />
                </button>
              </div>
              {audioURL && (
                <div className="mt-4">
                  <h4>Recorded Audio:</h4>
                  <audio controls src={audioURL}
                  className="w-[160]"
                  ></audio>
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setAudioURL("")}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 shadow-md"
                    >
                      <BsFillTrashFill />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <p className="py-[50]">OR</p>
            </div>

            {/* Textarea */}
            <div className="flex flex-col items-start">
              <h3>Enter Text</h3>
              <textarea
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                className="w-full h-full p-2 border border-gray-300 rounded-md shadow-md"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#C2D02F] text-black rounded hover:bg-[#AFBC29] shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}


