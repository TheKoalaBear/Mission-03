import { useState } from "react";
import MessageBox from "./MessageBox";
import TextInput from "./TextInput";
import styles from "./css/ChatWindow.module.css";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    "Interviewer: Enter a Job Title to begin.",
  ]);
  const [history, setHistory] = useState([]);

  const endpoint = [
    "completeInterview",
    "interview",
    "interview",
    "interview",
    "interview",
    "interview",
    "startInterview",
  ];

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handlePostInterviewQuestion = async (question) => {
    try {
      const response = await fetch(`http://localhost:4000/${endpoint.pop()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from server");
      }

      const data = await response.json();
      addMessage(`Interviewer: ${data.response}`);
    } catch (error) {
      console.error(error);
      addMessage(`Error: ${error.message}`);
    }
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
    </div>
  );
};

export default ChatWindow;
