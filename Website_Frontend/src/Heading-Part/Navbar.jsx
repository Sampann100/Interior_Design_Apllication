import { useState, useEffect } from "react";
import style from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import { IoBagAdd } from "react-icons/io5";
import {
  FiUser,
  FiSettings,
  FiShoppingBag,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { userDataAction } from "../../store/userDataSlice";
import { bagActions } from "../../store/bagSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bagItemLength = useSelector((state) => state.bagItem) || [];
  const user =
    useSelector((state) => state.userData?.user?.userData?.Username) || "U";
  const userSuccessRate =
    useSelector((state) => state.userData?.success) || false;

  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCartBtnClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("https://interior-design-apllication-backend.onrender.com/cart", {
        withCredentials: true,
      });
      res.status === 200 ? navigate("/cart") : navigate("/login");
    } catch {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://interior-design-apllication-backend.onrender.com/logout",
        {},
        { withCredentials: true }
      );
      dispatch(userDataAction.clearProfileData());
      dispatch(bagActions.clearBag());
      localStorage.clear();
      toast.success("Logged out successfully! 👋");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      console.error("Logout Error: ", err);
    }
  };

  const getAvatarStyle = (username = "") => {
    const colors = [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#ff9800",
      "#795548",
    ];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const bgColor = colors[Math.abs(hash) % colors.length];
    const r = parseInt(bgColor.substr(1, 2), 16);
    const g = parseInt(bgColor.substr(3, 2), 16);
    const b = parseInt(bgColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return { bgColor, textColor: brightness < 128 ? "#fff" : "#000" };
  };

  const { bgColor, textColor } = getAvatarStyle(user);

  return (
    <header className={`${style.header} ${isScrolled ? style.scrolled : ""}`}>
      <nav className={`navbar navbar-expand-lg py-2 ${style.navbarCustom}`}>
        <div className="container">
          {/* Logo */}
          <Link to="/" className={style.logoWrapper}>
            <img
              className={style.headingImage}
              src="Marc.png"
              alt="Marc Pridmore"
            />
          </Link>

          {/* Mobile Toggle */}
          <button
            className={style.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FiMenu />
          </button>

          {/* Navigation Links */}
          <ul className={`${style.navLinks} ${menuOpen ? style.open : ""}`}>
            {[
              { path: "/home", label: "Home" },
              { path: "/about", label: "About" },
              { path: "/service", label: "Services" },
              { path: "/contact", label: "Contact" },
              { path: "/addProduct", label: "Add Product" },
            ].map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`${style.navLink} ${
                    location.pathname === path ? style.active : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className={style.actions}>
            {!userSuccessRate ? (
              <Link to="/Login">
                <button className={style.loginBtn}>
                  <FiUser size={18} />
                  <span>Login</span>
                </button>
              </Link>
            ) : (
              <div className={style.userMenu}>
                <Avatar
                  onClick={() => setShowDropdown(!showDropdown)}
                  sx={{
                    bgcolor: bgColor,
                    color: textColor,
                    width: 40,
                    height: 40,
                    fontSize: "1rem",
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  {user.charAt(0).toUpperCase()}
                </Avatar>
                {showDropdown && (
                  <div className={style.dropdown}>
                    <div className={style.dropdownHeader}>
                      <Avatar
                        sx={{
                          bgcolor: bgColor,
                          color: textColor,
                          width: 32,
                          height: 32,
                          fontSize: "0.9rem",
                        }}
                      >
                        {user.charAt(0).toUpperCase()}
                      </Avatar>
                      <div className={style.userInfo}>
                        <span className={style.userName}>{user}</span>
                        <small className={style.userEmail}>View Profile</small>
                      </div>
                    </div>
                    <Link to="/orders" className={style.dropdownItem}>
                      <FiShoppingBag size={18} /> My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`${style.dropdownItem} ${style.logoutBtn}`}
                    >
                      <FiLogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            <button className={style.cartBtn} onClick={handleCartBtnClick}>
              <IoBagAdd size={24} />
              {bagItemLength.length > 0 && (
                <span className={style.cartBadge}>{bagItemLength.length}</span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
