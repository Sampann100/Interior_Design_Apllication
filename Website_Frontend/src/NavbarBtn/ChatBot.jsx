import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/chatbot",
        { message: input },
        { withCredentials: true }
      );
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: response.data.reply, sender: "bot" },
        ]);
        setIsTyping(false);
      }, 1000); // delay for realism
    } catch {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "⚠️ Something went wrong. Please try again.",
            sender: "bot",
          },
        ]);
        setIsTyping(false);
      }, 800);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdf7f2, #f6e0c8)",
        fontFamily: "Poppins, Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          backdropFilter: "blur(14px)",
          background: "rgba(255,255,255,0.65)",
          borderRadius: "1.5rem",
          boxShadow: "0 8px 28px rgba(0,0,0,0.1)",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px",
            textAlign: "center",
            background: "linear-gradient(90deg, #cd8f52, #e6b17e)",
            color: "white",
            fontWeight: 600,
            fontSize: "1.2rem",
            letterSpacing: "0.5px",
          }}
        >
          💬 Interior Design Assistant
          <div style={{ fontSize: "0.85rem", fontWeight: 400, opacity: 0.9 }}>
            Ask me anything, I’m here to help
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            padding: "16px",
            background: "rgba(255,255,255,0.3)",
          }}
        >
          {messages.length === 0 && (
            <div
              className="text-center text-muted"
              style={{ marginTop: "40%", fontSize: "0.95rem" }}
            >
              👋 Hi! How can I help you with your interior design today?
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex mb-3 ${
                msg.sender === "user" ? "justify-content-end" : "justify-content-start"
              }`}
              style={{ animation: "fadeInScale 0.25s ease" }}
            >
              <div
                style={{
                  maxWidth: "75%",
                  padding: "10px 14px",
                  borderRadius: "1.2rem",
                  background:
                    msg.sender === "user"
                      ? "linear-gradient(135deg, #cd8f52, #e6b17e)"
                      : "white",
                  color: msg.sender === "user" ? "#fff" : "#444",
                  boxShadow:
                    msg.sender === "user"
                      ? "0 3px 10px rgba(205,143,82,0.3)"
                      : "0 2px 6px rgba(0,0,0,0.08)",
                  borderBottomRightRadius:
                    msg.sender === "user" ? "0.4rem" : "1.2rem",
                  borderBottomLeftRadius:
                    msg.sender === "user" ? "1.2rem" : "0.4rem",
                  fontSize: "0.95rem",
                  lineHeight: "1.4",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="d-flex justify-content-start mb-3">
              <div
                style={{
                  background: "white",
                  padding: "8px 12px",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          style={{
            padding: "10px",
            background: "rgba(255,255,255,0.9)",
            borderTop: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              style={{
                borderRadius: "2rem 0 0 2rem",
                border: "1.5px solid #cd8f52",
                background: "#fffdfa",
                fontSize: "0.95rem",
              }}
            />
            <button
              className="btn"
              style={{
                background: "linear-gradient(135deg, #cd8f52, #e6b17e)",
                color: "#fff",
                borderRadius: "0 2rem 2rem 0",
                fontSize: "1.1rem",
                border: "1.5px solid #cd8f52",
              }}
              onClick={sendMessage}
              disabled={!input.trim()}
            >
              <IoSend size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .dot {
            width: 6px;
            height: 6px;
            background: #aaa;
            border-radius: 50%;
            animation: bounce 1s infinite;
          }
          .dot:nth-child(2) { animation-delay: 0.2s; }
          .dot:nth-child(3) { animation-delay: 0.4s; }
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0.8); }
            40% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default Chatbot;
