import style from "./Footer.module.css";
import React from "react";

const Footer = () => {
  return (
    <footer className={`pt-5 pb-3 mt-5 ${style.footer} bg-dark text-light`}>
      <div className="container">
        <div className="row gy-4 align-items-start">
          <div className="col-12 col-md-3 text-center text-md-start mb-4 mb-md-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="mb-3"
              role="img"
              viewBox="0 0 24 24"
            >
              <title>Product</title>
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"></path>
            </svg>
            <div>
              <small className="d-block text-secondary">
                © 2017–2024 Marc Pridmore Designs
              </small>
            </div>
          </div>
          <div className="col-6 col-md-2">
            <h6 className="fw-bold mb-3 text-uppercase">Features</h6>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Cool stuff
                </a>
              </li>
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Random feature
                </a>
              </li>
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Team feature
                </a>
              </li>
              <li>
                <a className="link-light text-decoration-none" href="#">
                  For developers
                </a>
              </li>
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Another one
                </a>
              </li>
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Last time
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-2">
            <h6 className="fw-bold mb-3 text-uppercase">Resources</h6>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Resource name
                </a>
              </li>
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Resource
                </a>
              </li>
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Another resource
                </a>
              </li>
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Final resource
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-2">
            <h6 className="fw-bold mb-3 text-uppercase">Industries</h6>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Business
                </a>
              </li>
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Education
                </a>
              </li>
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Government
                </a>
              </li>
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Gaming
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h6 className="fw-bold mb-3 text-uppercase">About</h6>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Team
                </a>
              </li>
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Locations
                </a>
              </li>
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Privacy
                </a>
              </li>
              <li>
                <a className="link-light text-decoration-none" href="#">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <div className="text-center small text-secondary">
          Made with <span style={{ color: "#cd8f52" }}>♥</span> by Marc Pridmore
          Designs
        </div>
      </div>
    </footer>
  );
};

export default Footer;
