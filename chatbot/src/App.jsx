import { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./commons/NavBar";
import ChatWindow from "./pages/ChatWindow";

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className={theme}>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <div className="chatBotWindow">
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;
