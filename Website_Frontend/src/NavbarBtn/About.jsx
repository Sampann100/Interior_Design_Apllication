import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section
      className="container py-5 px-4 rounded-4 shadow-lg"
      style={{
        background: "linear-gradient(135deg, #fffdfa 60%, #f8ebdf 100%)",
        maxWidth: "1100px",
        overflow: "hidden",
        marginTop: "6.1rem"
      }}
    >
      <div className="row align-items-center g-5">
        {/* Left Content */}
        <div className="col-md-7">
          <h2
            className="fw-bold mb-4"
            style={{
              color: "#cd8f52",
              fontSize: "2.6rem",
              fontFamily: "'Playfair Display', serif",
              lineHeight: "1.3",
            }}
          >
            Marc Pridmore Interiors:
            <span style={{ color: "#5a4633" }}> A Legacy of Elegance</span>
          </h2>

          <p
            className="text-dark mb-3"
            style={{
              fontSize: "1.15rem",
              lineHeight: "1.7",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Immerse yourself in the world of luxury interior design with Marc
            Pridmore Interiors. Since our humble beginnings in Orange County in
            2000, we have been dedicated to furnishing opulent mansions and
            grand residential properties worldwide with unparalleled
            sophistication and style.
          </p>

          <p
            className="text-dark mb-3"
            style={{
              fontSize: "1.15rem",
              lineHeight: "1.7",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Our esteemed team of designers and craftsmen bring dreams to life,
            turning spaces into masterpieces that leave a lasting impression.
            With meticulous attention to detail and an eye for perfection, we go
            above and beyond to exceed expectations.
          </p>

          <p
            className="text-dark mb-4"
            style={{
              fontSize: "1.15rem",
              lineHeight: "1.7",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Experience timeless elegance and superior quality that defines Marc
            Pridmore Interiors. Elevate your living spaces to new heights.
          </p>

          {/* Buttons */}
          <div className="d-flex gap-3 mt-4">
            <Link to="/service">
              <button
                className="btn fw-semibold"
                style={{
                  background: "#cd8f52",
                  color: "#fff",
                  borderRadius: "2rem",
                  padding: "10px 32px",
                  fontSize: "1.1rem",
                  letterSpacing: "1px",
                  boxShadow: "0 4px 12px rgba(205,143,82,0.25)",
                  border: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#b97a45")}
                onMouseLeave={(e) => (e.target.style.background = "#cd8f52")}
              >
                Our Portfolio
              </button>
            </Link>
            <Link to="/contact">
              <button
                className="btn fw-semibold"
                style={{
                  borderRadius: "2rem",
                  padding: "10px 32px",
                  fontSize: "1.1rem",
                  letterSpacing: "1px",
                  border: "2px solid #cd8f52",
                  color: "#cd8f52",
                  background: "transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#cd8f52";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#cd8f52";
                }}
              >
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="col-md-5 text-center">
          <div
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <img
              src="NavbarHeroImage3.jpg"
              alt="Marc Pridmore Interiors"
              style={{
                width: "100%",
                maxWidth: "420px",
                borderRadius: "2rem",
                boxShadow: "0 12px 32px rgba(205,143,82,0.2)",
                objectFit: "cover",
                transform: "scale(1)",
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />
            {/* Soft gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "2rem",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(205,143,82,0.05) 100%)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
