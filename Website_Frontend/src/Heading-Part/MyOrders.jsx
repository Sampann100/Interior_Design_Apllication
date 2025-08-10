import { useState, useEffect } from "react";
import {
  FaBox,
  FaCalendarAlt,
  FaTruck,
  FaCheck,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import {
  MdLocalShipping,
  MdInventory,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrderItem = async () => {
      const response = await axios.get(
        "http://localhost:5000/orderPlacedItem",
        { withCredentials: true }
      );

      if (response.status) setOrders(response.data.orderPlacedItems);
    };

    fetchOrderItem();
  }, []);

  return (
    <div
      className="min-vh-100"
      style={{ background: "linear-gradient(135deg, #f9f6f2 0%, #fff 100%)" }}
    >
      <Link
        to="/cart"
        className="d-inline-flex align-items-center text-decoration-none mb-4 hover-lift"
        style={{
          color: "#cd8f52",
          padding: "0.75rem 1.5rem",
          background: "white",
          borderRadius: "2rem",
          boxShadow: "0 2px 12px rgba(205,143,82,0.1)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateX(-5px)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(205,143,82,0.15)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateX(0)";
          e.currentTarget.style.boxShadow = "0 2px 12px rgba(205,143,82,0.1)";
        }}
      >
        <MdOutlineKeyboardArrowLeft size={24} />
        <span className="ms-2 fw-semibold">Back to Cart</span>
      </Link>

      {/* Order Stats Section */}
      <div className="container py-5">
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div
              className="card border-0 shadow-sm rounded-4 hover-lift"
              style={{ transition: "all 0.3s ease" }}
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle p-3"
                    style={{ background: "rgba(205,143,82,0.1)" }}
                  >
                    <MdInventory size={24} style={{ color: "#cd8f52" }} />
                  </div>
                  <div>
                    <h3 className="mb-0 fw-bold">{orders.length}</h3>
                    <div className="text-muted">Total Orders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle p-3"
                    style={{ background: "rgba(40,167,69,0.1)" }}
                  >
                    <FaCheck size={24} style={{ color: "#28a745" }} />
                  </div>
                  <div>
                    <h3 className="mb-0 fw-bold">
                      {
                        orders.filter((order) => order.status === "delivered")
                          .length
                      }
                    </h3>
                    <div className="text-muted">Delivered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle p-3"
                    style={{ background: "rgba(0,123,255,0.1)" }}
                  >
                    <MdLocalShipping size={24} style={{ color: "#007bff" }} />
                  </div>
                  <div>
                    <h3 className="mb-0 fw-bold">
                      {
                        orders.filter((order) => order.status === "shipped")
                          .length
                      }
                    </h3>
                    <div className="text-muted">In Transit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="d-flex flex-wrap gap-3 mb-4 justify-content-between align-items-center">
          <h2 className="mb-0 fw-bold d-flex align-items-center gap-2">
            <FaBox style={{ color: "#cd8f52" }} />
            My Orders
          </h2>

          <div className="d-flex gap-3">
            <div className="position-relative">
              <input
                type="text"
                className="form-control ps-4"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  borderRadius: "2rem",
                  border: "2px solid #e0e0e0",
                  padding: "0.6rem 1rem",
                  width: "250px",
                }}
              />
              <FaSearch
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6c757d",
                }}
              />
            </div>

            <select
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                borderRadius: "2rem",
                border: "2px solid #e0e0e0",
                padding: "0.6rem 2rem 0.6rem 1rem",
                cursor: "pointer",
              }}
            >
              <option value="all">All Orders</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border"
              style={{ color: "#cd8f52", width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-12">
              <div
                className="card border-0 shadow-sm rounded-4 overflow-hidden hover-lift"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="card-body">
                  <div className="row g-4">
                    {orders.map((item) => (
                      <div key={item._id} className="col-md-6">
                        <div
                          className="d-flex gap-3 p-3 rounded-4"
                          style={{ background: "#f8f9fa" }}
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.itemName}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "12px",
                            }}
                          />
                          <div className="flex-grow-1">
                            <h6 className="mb-2 fw-bold">{item.itemName}</h6>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <div className="text-muted">
                                Quantity: {item.quantity}
                              </div>
                              <div
                                className="fw-semibold"
                                style={{ color: "#cd8f52" }}
                              >
                                ₹{item.current_price}
                              </div>
                            </div>
                            <div className="progress" style={{ height: "6px" }}>
                              <div
                                className="progress-bar"
                                style={{
                                  width:
                                    item.status === "delivered"
                                      ? "100%"
                                      : item.status === "shipped"
                                      ? "66%"
                                      : "33%",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-footer bg-white border-0 py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <FaCalendarAlt style={{ color: "#6c757d" }} />
                      <span className="text-muted">
                        Ordered on{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
