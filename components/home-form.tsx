"use client";

import React, { useState } from "react";
import { ReactMic } from "react-mic";

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
    <div>
      <h1>Form with Dropdowns and Audio Recorder</h1>
      <form onSubmit={handleSubmit}>
        {/* Dropdown 1 */}
        <label>
          Choose an option (Dropdown 1):
          <select
            value={firstDropdown}
            onChange={(e) => setFirstDropdown(e.target.value)}
            required
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </label>
        <br />

        {/* Dropdown 2 */}
        <label>
          Choose an option (Dropdown 2):
          <select
            value={secondDropdown}
            onChange={(e) => setSecondDropdown(e.target.value)}
            required
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="optionA">Option A</option>
            <option value="optionB">Option B</option>
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
  );
}
