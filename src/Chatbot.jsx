import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sessionId = "123"; // Static session for now
  const API_URL = "http://localhost:5000/chatbot"; // Change to your backend endpoint

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}?sessionId=${sessionId}&userInput=${encodeURIComponent(userMessage)}`
      );
      const data = await res.json();

      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Cannot reach server." },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>ChatGPT Clone</header>

      {/* Chat messages */}
      <div style={styles.chatContainer}>
        {messages.map((msg, i) => (
          <div key={i} style={styles.messageRow}>
            <div
              style={{
                ...styles.messageBubble,
                background: msg.sender === "user" ? "#343541" : "#444654",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ color: "#aaa", fontSize: "14px", margin: "10px" }}>
            Chatbot is typing...
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <form style={styles.inputWrapper} onSubmit={handleSend}>
        <input
          style={styles.input}
          type="text"
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button style={styles.sendBtn} type="submit">
          <FaPaperPlane size={18} />
        </button>
      </form>
    </div>
  );
}

const styles = {
page: {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100vw", // full screen
  backgroundColor: "#343541",
  color: "#fff",
  fontFamily: "'Inter', sans-serif",
},

chatContainer: {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  padding: "20px",
  maxWidth: "900px", // center content like ChatGPT
  width: "100%",
  margin: "0 auto",  // centers the inner container
},



  header: {
    background: "#202123",
    padding: "15px 20px",
    fontSize: "18px",
    fontWeight: "600",
    borderBottom: "1px solid #14d537ff",
  },
  // chatContainer: {
  //   flex: 1,
  //   padding: "20px",
  //   display: "flex",
  //   flexDirection: "column",
  //   overflowY: "auto",
  // },
  messageRow: {
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
  },
  messageBubble: {
    padding: "12px 16px",
    borderRadius: "8px",
    maxWidth: "70%",
    fontSize: "15px",
    lineHeight: "1.5",
    color: "#fff",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
    borderTop: "1px solid #3e3f4b",
    backgroundColor: "#0f1401ff",
  },
  input: {
    width: "100%",
    maxWidth: "800px",
    padding: "14px 18px",
    fontSize: "16px",
    borderRadius: "24px",
    border: "1px solid #565869",
    outline: "none",
    backgroundColor: "#40414f",
    color: "#fff",
    marginRight: "10px",
  },
  sendBtn: {
    background: "#40414f",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "50%",
    cursor: "pointer",
  },
};
