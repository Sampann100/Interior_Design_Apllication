import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  MdOutlineKeyboardArrowLeft,
  MdLockOutline,
  MdPayment,
  MdPerson,
} from "react-icons/md";
import { useSelector } from "react-redux";
import {
  FaCreditCard,
  FaPaypal,
  FaGooglePay,
} from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { useEffect } from "react";
import axios from "axios";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    amount: "",
    razorpay_order_id: "",
    razorpay_payment_id: "",
    razorpay_signature: "",
    paymentStatus: "",
  });

  const [formError, setFormError] = useState({});

  const validateForm = () => {
    const error = {};

    if (!formData.fullName.trim()) error.fullName = "Full Name is required";
    else if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(formData.fullName.trim()))
      error.fullName = "Please enter your full name";

    if (!formData.email.trim()) {
      error.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      error.email = "Email is invalid";
    }

    if (!formData.phoneNumber.trim()) {
      error.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      error.phoneNumber = "Phone number is invalid";
    }

    if (!formData.address.trim()) error.address = "Address is required";

    return error;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setFormError((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript(`https://checkout.razorpay.com/v1/checkout.js`);
  }, []);

  const bagItems = useSelector((state) => state.bagItem) || [];

  const CONVENIENCE_FEES = 99;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItems.forEach((item) => {
    totalMRP += item.original_price;
    totalDiscount += item.original_price - item.current_price;
  });

  const finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;
  formData.amount = finalPayment;

  const handlePayment = async (e, price) => {
    e.preventDefault();
    const error = validateForm();
    if (Object.keys(error).length > 0) {
      setFormError(error);
      const firstError = document.querySelector(".is-invalid");
      if (firstError)
        firstError.scrollIntroView({ behavior: "smooth", block: "center" });

      return;
    }

    try {
      const options = {
        courseId: 1,
        amount: price,
      };

      const response = await axios.post(
        "https://interior-design-apllication-backend.onrender.com/createOrder",
        options,
        { withCredentials: true }
      );

      const data = response.data;

      const paymentObject = new window.Razorpay({
        key: "rzp_test_FfPqGcF4EJ5XJh",
        order_id: data.id,
        ...data,
        handler: async function (response) {
          formData.razorpay_order_id = response.razorpay_order_id;
          formData.razorpay_payment_id = response.razorpay_payment_id;
          formData.razorpay_signature = response.razorpay_signature;

          const options2 = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          await axios
            .post("https://interior-design-apllication-backend.onrender.com/verifyPayment", options2, {
              withCredentials: true,
            })
            .then(async (res) => {
              if (res.data.success) {
                formData.paymentStatus = res.data.success;
                await axios.post(
                  "https://interior-design-apllication-backend.onrender.com/savePaymentInfo",
                  formData,
                  {
                    withCredentials: true,
                  }
                );
                navigate("/payment-successfull");
              } else alert("Payment Failed!!");
            });
        },
      });

      paymentObject.open();
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        razorpay_order_id: "",
        razorpay_payment_id: "",
        razorpay_signature: "",
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div
      style={{ background: "linear-gradient(135deg, #f9f6f2 0%, #fff 100%)" }}
      className="min-vh-100 py-5"
    >
      <div className="container">
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
            e.currentTarget.style.boxShadow =
              "0 4px 20px rgba(205,143,82,0.15)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(205,143,82,0.1)";
          }}
        >
          <MdOutlineKeyboardArrowLeft size={24} />
          <span className="ms-2 fw-semibold">Back to Cart</span>
        </Link>

        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          <div
            className="card-header border-0 py-4"
            style={{
              background: "linear-gradient(135deg, #fff 0%, #f9f6f2 100%)",
            }}
          >
            <h1
              className="text-center mb-2"
              style={{
                color: "#cd8f52",
                fontSize: "2.2rem",
                fontWeight: "700",
              }}
            >
              Secure Checkout
            </h1>
            <p className="text-center text-muted mb-0">
              <MdLockOutline className="me-2" />
              Your payment information is encrypted
            </p>
          </div>

          <div
            className="card border-0 shadow-sm rounded-4 mb-4 hover-shadow"
            style={{ transition: "all 0.3s ease" }}
          >
            <div className="card-body p-4">
              <h4
                className="fw-bold mb-4 d-flex align-items-center"
                style={{ color: "#2c2c2c" }}
              >
                <MdPerson
                  className="me-2"
                  size={24}
                  style={{ color: "#cd8f52" }}
                />
                Personal Details
              </h4>

              <div className="row g-4">
                <div className="col-md-6 mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control form-control-lg ${
                        formError.fullName ? "is-invalid" : ""
                      }`}
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      style={{
                        borderRadius: "1rem",
                        fontSize: "1rem",
                        border: "2px solid #e0e0e0",
                        height: "60px",
                        backgroundColor: "#fff",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#cd8f52";
                        e.target.style.boxShadow =
                          "0 0 0 0.2rem rgba(205,143,82,0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e0e0e0";
                        e.target.style.boxShadow = "none";
                      }}
                      value={formData.fullName || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="fullName" className="text-muted">
                      Full Name
                    </label>
                  </div>
                  {formError.fullName && (
                    <small className="text-danger d-block mt-1">
                      {formError.fullName}
                    </small>
                  )}
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      name="email"
                      className={`form-control form-control-lg border-2 ${
                        formError.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      placeholder="example@email.com"
                      style={{
                        borderRadius: "1rem",
                        fontSize: "1rem",
                        border: "2px solid #e0e0e0",
                        height: "60px",
                        backgroundColor: "#fff",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#cd8f52";
                        e.target.style.boxShadow =
                          "0 0 0 0.2rem rgba(205,143,82,0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e0e0e0";
                        e.target.style.boxShadow = "none";
                      }}
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      required
                    />
                    {formError.email && (
                      <div className="invalid-feedback">{formError.email}</div>
                    )}
                    <label htmlFor="emailAddress" className="text-muted">
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="tel"
                      className={`form-control form-control-lg border-2 ${
                        formError.phoneNumber ? "is-invalid" : ""
                      }`}
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="+91 123 456 7890"
                      style={{
                        borderRadius: "1rem",
                        fontSize: "1rem",
                        border: "2px solid #e0e0e0",
                        height: "60px",
                        backgroundColor: "#fff",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#cd8f52";
                        e.target.style.boxShadow =
                          "0 0 0 0.2rem rgba(205,143,82,0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e0e0e0";
                        e.target.style.boxShadow = "none";
                      }}
                      value={formData.phoneNumber || ""}
                      onChange={handleInputChange}
                      required
                    />
                    {formError.phoneNumber && (
                      <div className="invalid-feedback">
                        {formError.phoneNumber}
                      </div>
                    )}
                    <label htmlFor="phoneNumber" className="text-muted">
                      Phone Number
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <textarea
                      className={`form-control form-control-lg border-2 ${
                        formError.address ? "is-invalid" : ""
                      }`}
                      id="address"
                      name="address"
                      rows="3"
                      placeholder="Your delivery address"
                      style={{
                        borderRadius: "1rem",
                        fontSize: "1rem",
                        border: "2px solid #e0e0e0",
                        height: "60px",
                        backgroundColor: "#fff",
                        transition: "all 0.3s ease",
                        resize: "vertical",
                        minHeight: "60px",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#cd8f52";
                        e.target.style.boxShadow =
                          "0 0 0 0.2rem rgba(205,143,82,0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e0e0e0";
                        e.target.style.boxShadow = "none";
                      }}
                      value={formData.address || ""}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                    {formError.address && (
                      <div className="invalid-feedback">
                        {formError.address}
                      </div>
                    )}
                    <label htmlFor="address" className="text-muted">
                      Delivery Address
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex align-items-center gap-2 text-muted small">
                    <MdLockOutline size={16} />
                    <span>
                      Your personal information is secure and encrypted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-lg-8">
                {/* Payment Methods */}
                <div className="mb-4">
                  <h4
                    className="fw-bold mb-3 d-flex align-items-center"
                    style={{ color: "#2c2c2c" }}
                  >
                    <MdPayment className="me-2" size={24} />
                    Payment Method
                  </h4>

                  <div className="d-flex flex-wrap gap-3 mb-4">
                    {[
                      {
                        id: "card",
                        icon: FaCreditCard,
                        label: "Credit Card",
                        description: "Pay securely with credit/debit card",
                      },
                      {
                        id: "paypal",
                        icon: FaPaypal,
                        label: "PayPal",
                        description: "Fast & secure payment",
                      },
                      {
                        id: "phonepe",
                        icon: SiPhonepe,
                        label: "PhonePe",
                        description: "UPI & wallet payment",
                      },
                      {
                        id: "gpay",
                        icon: FaGooglePay,
                        label: "Google Pay",
                        description: "Quick UPI payment",
                      },
                    ].map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className="payment-method-card"
                        style={{
                          flex: "1 1 240px",
                          padding: "1.5rem",
                          borderRadius: "1.2rem",
                          border: `2px solid ${
                            paymentMethod === method.id ? "#cd8f52" : "#e0e0e0"
                          }`,
                          background:
                            paymentMethod === method.id
                              ? "linear-gradient(135deg, #fff 0%, #f9f6f2 100%)"
                              : "#fff",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "translateY(-3px)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 24px rgba(205,143,82,0.12)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <method.icon
                            size={28}
                            color={
                              paymentMethod === method.id ? "#cd8f52" : "#666"
                            }
                          />
                          <div>
                            <div
                              className="fw-bold mb-1"
                              style={{
                                color:
                                  paymentMethod === method.id
                                    ? "#cd8f52"
                                    : "#2c2c2c",
                              }}
                            >
                              {method.label}
                            </div>
                            <div className="small text-muted">
                              {method.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary Card - Enhanced */}
              <div className="col-lg-4">
                <div
                  className="card border-0 shadow-lg rounded-4 position-sticky"
                  style={{ top: "2rem" }}
                >
                  <div className="card-body p-4">
                    <h4 className="fw-bold mb-4">Order Summary</h4>

                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Subtotal</span>
                      <span className="fw-semibold">₹{totalMRP}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Discount</span>
                      <span className="text-success fw-semibold">
                        -₹{totalDiscount}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Shipping</span>
                      <span className="fw-semibold">₹99</span>
                    </div>

                    <hr className="my-4" />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <span className="fw-bold fs-5">Total</span>
                      <span
                        className="fw-bold"
                        style={{ color: "#cd8f52", fontSize: "1.5rem" }}
                      >
                        ₹{finalPayment}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="btn w-100 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                      style={{
                        background: "#cd8f52",
                        color: "#fff",
                        borderRadius: "2rem",
                        fontSize: "1.1rem",
                        letterSpacing: "0.5px",
                        transition: "all 0.3s ease",
                      }}
                      onClick={(e) => handlePayment(e, finalPayment)}
                      onMouseOver={(e) => {
                        e.target.style.background = "#ba7f49";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = "#cd8f52";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      <MdLockOutline size={20} />
                      Pay Securely
                    </button>

                    <p className="text-center text-muted small mt-3 mb-0">
                      Your payment is secured by 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
