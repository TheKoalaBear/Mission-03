import { useEffect, useRef } from "react";
import styles from "./css/MessageBox.module.css";

const MessageBox = ({ messages }) => {
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.messageBox}>
      {messages.map((message, index) => {
        const isUserMessage = message.startsWith("You:");
        return (
          <div
            key={index}
            className={
              isUserMessage ? styles.chatBubbleUser : styles.chatBubbleAI
            }
          >
            {message}
          </div>
        );
      })}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageBox;
