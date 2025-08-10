import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cardData = [
  {
    img: "Image1.png",
    alt: "Premium Interior Design Services",
    title: "Premium Interior Design",
    desc: "Elevate your space to opulence. Discover the essence of luxury and sophistication tailored just for you.",
  },
  {
    img: "https://sumesshmenonassociates.com/wp-content/uploads/2024/02/luxurious-living-room-banner.webp",
    alt: "Custom Lighting Solutions",
    title: "Custom Lighting Solutions",
    desc: "One-of-a-kind lighting fixtures crafted to match your unique space and lifestyle with elegance.",
  },
  {
    img: "Image3.png",
    alt: "Elegant Drapery Design",
    title: "Elegant Drapery Design",
    desc: "Luxurious drapery cascading gracefully to transform any room into a timeless masterpiece.",
  },
  {
    img: "https://www.decorilla.com/online-decorating/wp-content/uploads/2024/10/living-room-by-top-interior-design-website-Decorilla-scaled.jpg",
    alt: "Luxury Furniture Sourcing",
    title: "Luxury Furniture Sourcing",
    desc: "Curated high-end furniture pieces from world-class designers to complement your interior vision.",
  },
  {
    img: "https://interiordesign.net/wp-content/uploads/2025/08/InteriorDesign_Surround_Parador-1024x733.jpg",
    alt: "Art & Accessories Curation",
    title: "Art & Accessories Curation",
    desc: "Exclusive artwork, sculptures, and accessories chosen to bring personality and depth to your space.",
  },
  {
    img: "https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2016/11/23075942/Cover.png",
    alt: "Custom Wall Treatments",
    title: "Custom Wall Treatments",
    desc: "From textured panels to premium wallpapers, create stunning backdrops that elevate every room.",
  },
  {
    img: "https://thearchitectsdiary.com/wp-content/uploads/2024/10/modern-home-interior-design-6.jpg",
    alt: "Outdoor Luxury Living",
    title: "Outdoor Luxury Living",
    desc: "Designing elegant patios, terraces, and gardens for seamless indoor-outdoor living experiences.",
  },
  {
    img: "https://i.ytimg.com/vi/_79wHBLPTbA/hq720.jpg",
    alt: "Space Planning & Styling",
    title: "Space Planning & Styling",
    desc: "Optimizing layouts and styling details to create a perfect balance of comfort, beauty, and function.",
  },
];

const Service = () => {
  return (
    <div
      className="container my-5"
      style={{
        background: "linear-gradient(135deg, #fffdfa 60%, #f8ebdf 100%)",
        borderRadius: "2rem",
        padding: "3rem 2rem",
      }}
    >
      <motion.h1
        className="text-center mb-5"
        style={{
          color: "#cd8f52",
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.8rem",
          fontWeight: 700,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Interior Design Services
      </motion.h1>

      <div className="row g-4">
        {cardData.map((card, idx) => (
          <motion.div
            className="col-md-6 col-lg-3"
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
          >
            <motion.div
              className="card h-100 border-0"
              style={{
                borderRadius: "1.5rem",
                overflow: "hidden",
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 28px rgba(205,143,82,0.2)",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", overflow: "hidden" }}>
                <motion.img
                  src={card.img}
                  alt={card.alt}
                  style={{
                    width: "100%",
                    height: "260px",
                    objectFit: "cover",
                  }}
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.4 }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(205,143,82,0.2) 100%)",
                  }}
                ></div>
              </div>

              {/* Card Body */}
              <div className="card-body d-flex flex-column align-items-center p-4">
                <h5
                  className="mb-3 text-center"
                  style={{
                    fontSize: "1.3rem",
                    color: "#cd8f52",
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {card.title}
                </h5>
                <p
                  className="text-center"
                  style={{
                    fontSize: "0.95rem",
                    color: "#555",
                    lineHeight: "1.6",
                  }}
                >
                  {card.desc}
                </p>
                <Link to="/">
                  <motion.button
                    className="btn fw-semibold mt-auto"
                    style={{
                      background: "linear-gradient(135deg, #cd8f52, #b97a45)",
                      color: "#fff",
                      borderRadius: "2rem",
                      padding: "8px 24px",
                      fontSize: "1rem",
                      letterSpacing: "1px",
                      border: "none",
                      marginTop: "1rem",
                      boxShadow: "0 2px 8px rgba(205,143,82,0.2)",
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 4px 16px rgba(205,143,82,0.3)",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    View Designs
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Service;
