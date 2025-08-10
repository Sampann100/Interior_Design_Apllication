import { Link } from "react-router-dom";

const ChatBot = () => {
  return (
    <Link
      to="/chatbot"
      className="btn btn-light d-flex align-items-center justify-content-center shadow"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      title="Need Help?"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 1000,
        borderRadius: "50%",
        padding: "0.5rem",
        transition: "transform 0.3s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src="chat-bot-messge.png"
        alt="Chat with us"
        style={{
          width: "3.5rem",
          height: "3.5rem",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    </Link>
  );
};

export default ChatBot;
