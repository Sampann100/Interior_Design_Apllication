import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle, FaShoppingBag, FaReceipt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { payedItemActions } from "../../store/payedItemSlice";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const paymentData = useSelector((state) => state.payedItem);

  useEffect(() => {
    const userDetailFunction = async () => {
      const response = await axios.get("https://interior-design-apllication-backend.onrender.com/userDetail", {
        withCredentials: true,
      });

      if (response.status) {
        const data = response.data;
        dispatch(payedItemActions.setPayedItem(data));
      }
    };

    userDetailFunction();
  }, [dispatch]);
  
  const paymentDetails = location.state || {
    orderId: paymentData?.razorpay_order_id || "N/A",
    amount: paymentData?.amount || "0.00",
    email: paymentData?.email || "Not Available",
    date: paymentData?.createAt
      ? new Date(paymentData.createAt).toLocaleString()
      : "Unknown",
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f9f6f2 0%, #fff 100%)",
        minHeight: "100vh",
      }}
      className="d-flex align-items-center justify-content-center py-5"
    >
      <div className="container">
        <div
          className="card border-0 shadow-lg rounded-4 overflow-hidden mx-auto"
          style={{ maxWidth: "670px" }}
        >
          {/* Success Header */}
          <div
            className="card-header border-0 text-center p-4"
            style={{
              background: "linear-gradient(135deg, #fff 0%, #f9f6f2 100%)",
            }}
          >
            <div className="mb-3">
              <FaCheckCircle
                size={80}
                style={{
                  color: "#5cb85c",
                  filter: "drop-shadow(0 4px 6px rgba(92,184,92,0.2))",
                }}
              />
            </div>
            <h2
              className="mb-2 fw-bold"
              style={{ color: "#2c2c2c", fontSize: "2rem" }}
            >
              Payment Successful!
            </h2>
            <p className="text-muted mb-0">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          <div className="card-body p-4">
            {/* Order Details */}
            <div className="card border-0 bg-light rounded-4 mb-4">
              <div className="card-body p-4">
                <div className="row g-4">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-3 p-2 me-3"
                        style={{ background: "rgba(205,143,82,0.1)" }}
                      >
                        <FaReceipt size={24} style={{ color: "#cd8f52" }} />
                      </div>
                      <div>
                        <div className="text-muted small">Order ID</div>
                        <div className="fw-semibold">
                          {paymentDetails.orderId}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-3 p-2 me-3"
                        style={{ background: "rgba(205,143,82,0.1)" }}
                      >
                        <MdEmail size={24} style={{ color: "#cd8f52" }} />
                      </div>
                      <div>
                        <div className="text-muted small">Email</div>
                        <div className="fw-semibold">
                          {paymentDetails.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-3 p-2 me-3"
                        style={{ background: "rgba(205,143,82,0.1)" }}
                      >
                        <FaShoppingBag size={24} style={{ color: "#cd8f52" }} />
                      </div>
                      <div>
                        <div className="text-muted small">Amount Paid</div>
                        <div className="fw-semibold">
                          ₹{paymentDetails.amount}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-3 p-2 me-3"
                        style={{ background: "rgba(205,143,82,0.1)" }}
                      >
                        <FaReceipt size={24} style={{ color: "#cd8f52" }} />
                      </div>
                      <div>
                        <div className="text-muted small">Date</div>
                        <div className="fw-semibold">{paymentDetails.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link
                to="/"
                className="btn btn-lg fw-semibold"
                style={{
                  background: "#cd8f52",
                  color: "#fff",
                  borderRadius: "2rem",
                  padding: "0.8rem 2rem",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#ba7f49";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#cd8f52";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Continue Shopping
              </Link>
              <Link
                to="/orders"
                className="btn btn-lg fw-semibold"
                style={{
                  background: "#f9f6f2",
                  color: "#cd8f52",
                  borderRadius: "2rem",
                  padding: "0.8rem 2rem",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#f5efe7";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#f9f6f2";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                View Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
