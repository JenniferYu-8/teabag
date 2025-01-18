"use client";

import React, { useState } from "react";
import { ReactMic } from "react-mic";
import Image from 'next/image';

export default function HomeForm() {
  const [firstDropdown, setFirstDropdown] = useState("");
  const [secondDropdown, setSecondDropdown] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [useTextarea, setUseTextarea] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  const handleStartRecording = () => setIsRecording(true);
  const handleStopRecording = (recordedBlob: { blob: Blob | MediaSource; }) => {
    setIsRecording(false);
    setAudioURL(URL.createObjectURL(recordedBlob.blob));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log({
      firstDropdown,
      secondDropdown,
      audioURL: useTextarea ? textareaValue : audioURL,
    });
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="pb-5">
          <Image src="/teabag.png" alt="Teabag logo" width="192" height="192" quality="95"></Image>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          {/* Dropdown 1 */}
          <label className="flex flex-col">
            Who is doing all this yapping?
            <select
              value={firstDropdown}
              onChange={(e) => setFirstDropdown(e.target.value)}
              required
            >
              <option value="" disabled>
                Select...
              </option>
              <option value="me">Me</option>
              <option value="other">I gotta summarize someone else's yap</option>
            </select>
          </label>
          <br />

          {/* Dropdown 2 */}
          <label className="flex flex-col">
            Do you want to add onto a certain conversation?:
            <select
              value={secondDropdown}
              onChange={(e) => setSecondDropdown(e.target.value)}
              required
            >
              <option value="" disabled>
                Select...
              </option>
              <option value="new-yap">Nope, this is a new yap session</option>
              <option value="yap-1">Yap 1</option>
            </select>
          </label>
          <br />

          {/* Toggle between Audio Recorder and Textarea */}
          <label>
            Use Textarea Instead of Recorder:
            <input
              type="checkbox"
              checked={useTextarea}
              onChange={() => setUseTextarea(!useTextarea)}
            />
          </label>
          <br />

          {!useTextarea ? (
            <>
              {/* Audio Recorder */}
              <ReactMic
                record={isRecording}
                onStop={handleStopRecording}
                mimeType="audio/webm"
              />
              <button
                type="button"
                onClick={handleStartRecording}
                disabled={isRecording}
              >
                Start Recording
              </button>
              <button
                type="button"
                onClick={() => setIsRecording(false)}
                disabled={!isRecording}
              >
                Stop Recording
              </button>
              {audioURL && (
                <div>
                  <h3>Recorded Audio:</h3>
                  <audio controls src={audioURL}></audio>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Textarea */}
              <label>
                Enter text:
                <textarea
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                />
              </label>
            </>
          )}
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>

    </section>
  );
}
