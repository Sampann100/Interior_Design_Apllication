import { useParams } from "react-router-dom";
import { useState } from "react";

const CommentBox = () => {
  const { itemId } = useParams();
  const [comment, setComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPosting(true);
    setSuccess(null);

    try {
      const response = await fetch("https://interior-design-apllication-backend.onrender.com/comment", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, comment }),
      });
      if (response.ok) {
        setComment("");
        setSuccess("Comment posted!");
      } else {
        setSuccess("Failed to post comment.");
      }
    } catch (error) {
      setSuccess("Error posting comment.");
    }
    setIsPosting(false);
  };

  return (
    <div
      className="mb-4 p-4 rounded-4 shadow-sm"
      style={{
        border: "1.5px solid #cd8f52",
        background: "#fffdfa",
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <label htmlFor="commentInput" className="form-label fw-semibold" style={{ color: "#cd8f52" }}>
        Leave a Comment:
      </label>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column flex-md-row align-items-stretch gap-3"
      >
        <input
          type="text"
          className="form-control"
          name="comment"
          id="commentInput"
          placeholder="Share your thoughts..."
          style={{
            borderRadius: "2rem",
            fontSize: "1.1rem",
            background: "#f8f5f0",
            border: "1px solid #e7cba0",
            paddingLeft: "20px",
            minWidth: 0,
          }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isPosting}
          maxLength={200}
          required
        />
        <button
          className="btn fw-semibold"
          style={{
            background: "#cd8f52",
            color: "#fff",
            borderRadius: "2rem",
            minWidth: "120px",
            fontSize: "1.1rem",
            letterSpacing: "1px",
            boxShadow: "0 2px 8px rgba(205,143,82,0.08)",
          }}
          type="submit"
          disabled={isPosting || !comment.trim()}
        >
          {isPosting ? "Posting..." : "Post"}
        </button>
      </form>
      {success && (
        <div className={`mt-3 alert ${success === "Comment posted!" ? "alert-success" : "alert-danger"} py-2`}>
          {success}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
