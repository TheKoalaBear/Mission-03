import React, { useState } from "react";
import styles from "./css/TextInput.module.css";

const TextInput = ({ addMessage, handlePostInterviewQuestion }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSend = () => {
    if (message.trim() === "") {
      setError("Message cannot be empty");
      return;
    }
    addMessage(`You: ${message}`);
    handlePostInterviewQuestion(message);
    setMessage("");
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div>
      <div className={styles.inputTextBox}>
        <input
          required=""
          placeholder="Message..."
          type="text"
          id={styles.messageInput}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button id={styles.sendButton} onClick={handleSend}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 664 663"
          >
            <path
              fill="none"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            ></path>
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="33.67"
              stroke="#6c6c6c"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            ></path>
          </svg>
        </button>
      </div>
      {error && <div className={styles.errorPopup}>{error}</div>}
    </div>
  );
};

export default TextInput;
