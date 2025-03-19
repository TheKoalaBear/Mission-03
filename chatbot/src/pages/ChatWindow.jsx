import { useState } from "react";
import MessageBox from "./MessageBox";
import TextInput from "./TextInput";
import styles from "./css/ChatWindow.module.css";
import { completeInterview } from "../api";

const ChatWindow = () => {
      const [messages, setMessages] = useState(["Interviewer: Enter a Job Title to begin."]);
      const [history, setHistory] = useState([]);
      const [jobTitle, setJobTitle] = useState(""); // Added jobTitle state

      const addMessage = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            const role = jobTitle ? jobTitle.toLowerCase() : "user";
            console.log("Sending message with role:", role);
            setHistory((prevHistory) => [...prevHistory, { role, content: message }]);
      };

      const handlePostInterviewQuestion = async (question) => {
            try {
                  const response = await fetch("http://localhost:4000/app/simulate", {
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

      const handleCompleteInterview = async () => {
            try {
                  console.log("Sending messages to server:", history);
                  console.log("Received messages", messages);
                  const response = await fetch("http://localhost:4000/completeInterview", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ messages: history }), // Send entire history to backend
                  });

                  if (!response.ok) {
                        throw new Error(`Failed to complete interview: ${response.statusText}`);
                  }

                  const data = await response.json();
                  addMessage(`Feedback: ${data.feedback || "No feedback received."}`);
            } catch (error) {
                  console.error("Error in handleCompleteInterview:", error);
                  addMessage(`Error: ${error.message}`);
                  console.error(error);
            }
      };

      return (
            <div className={styles.chatBotWindow}>
                  <div className={styles.window}>
                        <MessageBox messages={messages} />
                  </div>
                  <TextInput
                        addMessage={(message) => {
                              if (!jobTitle) {
                                    setJobTitle(message); // Set jobTitle on first input
                                    addMessage(`Job Title set to: ${message}`);
                              } else {
                                    addMessage(message);
                              }
                        }}
                        handlePostInterviewQuestion={handlePostInterviewQuestion}
                  />
                  <button className={styles.interviewButton} onClick={handleCompleteInterview}>
                        Complete Interview
                  </button>
            </div>
      );
};

export default ChatWindow;
