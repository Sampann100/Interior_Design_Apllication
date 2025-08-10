import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FiCheck, FiAlertTriangle } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Address1: "",
    Address2: "",
    Country: "",
    State: "",
    Zip: "",
    Message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      const response = await fetch(
        "http://localhost:5000/personalcontactdetail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (response.ok) {
        toast.success("✅ Contact details saved successfully!");
        setFormData({
          FirstName: "",
          LastName: "",
          Email: "",
          Address1: "",
          Address2: "",
          Country: "",
          State: "",
          Zip: "",
          Message: "",
        });
      } else {
        toast.error("❌ Failed to save contact details. Please try again.");
      }
    } catch {
      toast.error(
        "⚠️ Unable to connect to server. Please check your connection."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "800px", width: "100%", borderRadius: "20px" }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#2C3E50" }}>
          Contact Detail Form
        </h2>
        <form onSubmit={handleSubmit} className="row g-3">
          {[
            { label: "First Name", name: "FirstName", type: "text" },
            { label: "Last Name", name: "LastName", type: "text" },
            { label: "Email", name: "Email", type: "email", col: 12 },
            { label: "Address 1", name: "Address1", type: "text", col: 6 },
            {
              label: "Address 2",
              name: "Address2",
              type: "text",
              col: 6,
              required: false,
            },
          ].map((field, i) => (
            <div key={i} className={`col-md-${field.col || 6}`}>
              <label className="form-label fw-semibold">
                {field.label}{" "}
                <span className="text-muted">
                  {field.required === false ? "(optional)" : "(required)"}
                </span>
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="form-control"
                style={{
                  borderRadius: "12px",
                  border: "1px solid #ccc",
                  padding: "10px 14px",
                  transition: "all 0.2s ease-in-out",
                }}
                onFocus={(e) => (e.target.style.border = "1px solid #3498DB")}
                onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
                required={field.required != false}
              />
            </div>
          ))}

          <div className="col-md-5">
            <label className="form-label fw-semibold">Country</label>
            <select
              className="form-select"
              name="Country"
              value={formData.Country}
              onChange={handleChange}
              style={{ borderRadius: "12px" }}
              required
            >
              <option value="">Choose...</option>
              <option>United States</option>
              <option>India</option>
              <option>Pakistan</option>
              <option>Australia</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">State</label>
            <select
              className="form-select"
              name="State"
              value={formData.State}
              onChange={handleChange}
              style={{ borderRadius: "12px" }}
              required
            >
              <option value="">Choose...</option>
              <option>Madhya Pradesh</option>
              <option>Maharashtra</option>
              <option>Rajasthan</option>
              <option>Gujarat</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Zip</label>
            <input
              type="text"
              name="Zip"
              value={formData.Zip}
              onChange={handleChange}
              className="form-control"
              style={{ borderRadius: "12px" }}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Message</label>
            <textarea
              name="Message"
              value={formData.Message}
              onChange={handleChange}
              className="form-control"
              rows="3"
              style={{ borderRadius: "12px" }}
              required
            ></textarea>
          </div>

          <div className="col-12 text-center mt-3">
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 fw-bold"
              style={{
                borderRadius: "25px",
                background: "linear-gradient(90deg, #3498DB, #2ECC71)",
                border: "none",
              }}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Contact Details"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
    </div>
  );
};

export default Contact;
