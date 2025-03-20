import { useState } from "react";
import MessageBox from "./MessageBox";
import TextInput from "./TextInput";
import styles from "./css/ChatWindow.module.css";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    "Interviewer: Enter a Job Title to begin.",
  ]);
  const [history, setHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [endpoints, setEndpoints] = useState([
    "completeInterview",
    "interview",
    "interview",
    "interview",
    "interview",
    "interview",
    "startInterview",
  ]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handlePostInterviewQuestion = async (question) => {
    try {
      const response = await fetch(`http://localhost:4000/${endpoints.pop()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      setEndpoints([...endpoints]);

      if (!response.ok) {
        throw new Error("Failed to get response from server");
      }

      const data = await response.json();
      addMessage(`Interviewer: ${data.response}`);

      // Show popup when the interview is complete
      if (endpoints.length === 0) {
        setShowPopup(true);
      }
    } catch (error) {
      console.error(error);
      addMessage(`Error: ${error.message}`);
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className={styles.chatBotWindow}>
      <div className={styles.window}>
        <MessageBox messages={messages} />
      </div>
      <TextInput
        addMessage={addMessage}
        handlePostInterviewQuestion={handlePostInterviewQuestion}
      />
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <p>Do you want to start again?</p>
            <button onClick={handleRestart}>Restart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
