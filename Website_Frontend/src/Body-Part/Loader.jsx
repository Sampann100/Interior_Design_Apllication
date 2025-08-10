import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Loader = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "84vh",
        background: "linear-gradient(120deg, #fffdfa 60%, #f7e7d7 100%)",
      }}
    >
      {/* Gold ring loader with a subtle shadow */}
      <div
        style={{
          width: "6rem",
          height: "6rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "8px solid #f3e7d7",
            borderTop: "8px solid #cd8f52",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            boxShadow: "0 4px 24px rgba(205,143,82,0.12)",
          }}
        />
      </div>
      <div
        className="fw-semibold"
        style={{
          color: "#cd8f52",
          fontSize: "1.35rem",
          letterSpacing: "1px",
          textShadow: "0 2px 8px #f7e7d7",
        }}
      >
        Please wait, loading...
      </div>
      {/* Keyframes for custom spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
};

export default Loader;