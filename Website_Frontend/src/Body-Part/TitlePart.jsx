import { useEffect } from "react";
import style from "./TitlePart.module.css";
import { Link } from "react-router-dom";
import Typewriter from "react-typewriter-effect";
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../../store/bagSlice";
import { fetctStatusAction } from "../../store/fetchStatus";
import { itemActions } from "../../store/itemSlice";
import ChatBot from "./ChatBot";

export default function TitlePart() {
  const items = useSelector((state) => state.items || []);
  const bagItems = useSelector((state) => state.bagItem || []);
  const user = useSelector((state) => state.userData.success);

  const bagItemId = Array.isArray(bagItems)
    ? bagItems.map((item) => item._id)
    : [];

  const fetchStatus = useSelector((state) => state.fetchStatus);
  const dispatch = useDispatch();

  //auto renderig page
  useEffect(() => {
    if (!user) {
      return;
    }

    fetch("http://localhost:5000/cart", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) dispatch(bagActions.addToBag(data));
        else dispatch(bagActions.addToBag([]));
        dispatch(fetctStatusAction.markFetchDone());
        dispatch(fetctStatusAction.markFetchFinish());
      })
      .catch((err) => console.log("Error: ", err));
  }, [dispatch, fetchStatus.fetchDone]);

  //Add To Cart
  const addToCart = async (e, itemId) => {
    e.preventDefault();

    try {
      if (!itemId) {
        console.log(itemId);
        return;
      }

      const response = await fetch("http://localhost:5000/cart", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        await fetch("http://localhost:5000/cart", {
          method: "GET",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(bagActions.addToBag(data));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Remove From Cart
  const handleRemoveItemFromCart = async (e, itemId) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/deleteCartItem", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(bagActions.removeFromBag(itemId));
      dispatch(fetctStatusAction.markFetchDone());
      dispatch(fetctStatusAction.markFetchFinish());
    }
  };

  //Delete Item
  const handleDeleteSubmit = async (e, itemId) => {
    e.preventDefault();
    console.log("Deleting item with ID:", itemId);
    const response = await fetch("http://localhost:5000/itemDelete", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    });
    if (response.ok) {
      await fetch("http://localhost:5000/items", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(itemActions.addInitialState(data));
          dispatch(bagActions.removeFromBag(itemId));
          dispatch(fetctStatusAction.markFetchDone());
          dispatch(fetctStatusAction.markFetchFinish());
        });
    }
  };

  //Toggle cart
  const isInCart = (itemId) => {
    return bagItemId.includes(itemId);
  };

  return (
    <main>
      <ChatBot />
      <section className="container">
        <h1 className="my-5 preFade fadeIn">
          <div className="d-flex justify-content-center">
            <Typewriter
              multiText={[
                "Orange County Interior Design",
                "Luxury Interior Styling",
                "Elegant Spaces by Marc Pridmore",
                "Sophisticated Living Solutions",
              ]}
              multiTextLoop
              multiTextDelay={1500}
              typeSpeed={90}
              eraseSpeed={20}
              cursorColor="#000"
              className={style.sqsrte}
            />
          </div>
        </h1>

        <p className={`text-center ${style.para}`}>
          Discover the epitome of luxury and sophistication at Marc Pridmore
          Designs, Southern California's premier interior design firm and
          showroom. Our expert design services ensure that every space we touch
          exudes elegance and refinement.
        </p>
        <br />
        <section className="container pb-5">
          <div className="row g-4">
            {Array.isArray(items) &&
              items.map((item, index) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12"
                  key={item._id || item.id || index}
                >
                  <div className="card h-100 shadow border-0 rounded-4 position-relative">
                    <form
                      onSubmit={(e) => handleDeleteSubmit(e, item._id)}
                      className="position-absolute top-0 end-0 m-2"
                      style={{ zIndex: 2 }}
                    >
                      <input name="itemId" value={item._id} type="hidden" />
                      <button
                        type="submit"
                        className="bg-transparent border-0 p-0"
                        title="Delete Product"
                      >
                        {/* <MdDeleteForever size={26} color="red" /> */}
                      </button>
                    </form>
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={item.imageUrl}
                        alt={`Product ${index + 1}`}
                        className="card-img-top img-fluid rounded-top"
                        style={{
                          height: "250px",
                          objectFit: "cover",
                          transition: "transform 0.3s cubic-bezier(.4,2,.6,1)",
                          cursor: "pointer",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.transform = "scale(1)")
                        }
                      />
                    </Link>
                    <div className="card-body d-flex flex-column">
                      <div className="mb-2">
                        <div className="fw-bold fs-5">{item.itemName}</div>
                        <p
                          className="mb-1 text-muted"
                          style={{ fontWeight: 500 }}
                        >
                          {item.description}
                        </p>
                        <p className="mb-1 small text-secondary">
                          Erikka Fogleman
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="fs-5 fw-semibold text-dark">
                          ₹{item.current_price}
                        </span>
                        <span className="text-decoration-line-through text-muted ms-2">
                          ₹{item.original_price}
                        </span>
                        <Link
                          to={`/product/${item._id}`}
                          className="ms-auto text-decoration-underline small"
                        >
                          View details
                        </Link>
                      </div>
                      {!isInCart(item._id) ? (
                        <button
                          className="btn btn-dark w-100 mt-auto"
                          type="button"
                          onClick={(e) => addToCart(e, item._id)}
                          style={{
                            transition: "backgroundColor 0.3s, transform 0.2s",
                          }}
                        >
                          🛒 Add to Cart
                        </button>
                      ) : (
                        <button
                          className="btn btn-success w-100 mt-auto"
                          type="button"
                          onClick={(e) => handleRemoveItemFromCart(e, item._id)}
                          style={{
                            transition: "backgroundColor 0.3s, transform 0.2s",
                          }}
                        >
                          🛒 Remove from Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </section>

      <hr />
      <section>
        <section className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-7">
              <img
                className={`img-fluid rounded-4 shadow`}
                style={{ height: "200px", width: "auto" }}
                src="Mp.png"
                alt="Marc Pridmore"
              />
              <h3 className={`mt-4 fw-bold`}>
                WELCOME TO MARC PRIDMORE INTERIORS
              </h3>
              <p className={`lead`}>
                Experience the epitome of luxury interior design. Our journey
                began in 2000, and today, we continue to grace Orange County
                mansions and residential properties worldwide with our exquisite
                touch. Explore our world of elegance.
              </p>
              <button
                onClick={() => alert("Your appointment is Confirmed")}
                className={`btn btn-warning px-4 py-2 fw-semibold rounded-pill shadow`}
              >
                BOOK APPOINTMENT
              </button>
            </div>
            <div className="col-md-5">
              <img
                className={`img-fluid rounded-4 shadow`}
                style={{ height: "600px", width: "700px" }}
                src="boxImage11.png"
                alt="Showroom"
              />
            </div>
          </div>
        </section>

        <section className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-5 order-md-2">
              <h4 className={`${style.designTitle} fw-bold`}>
                DESIGN SERVICES
              </h4>
              <p className={`${style.elegant} fs-5`}>Elegant Interior Design</p>
              <p>
                Embark on a journey of sophistication and luxury with
                one-of-a-kind designs and elegant, seamless living solutions
                tailored to your way of living. Our Interior design services
              </p>
              <Link to="/Contact">
                <button
                  className={`${style.CallButton} btn btn-outline-dark px-4 py-2 rounded-pill`}
                >
                  CALL TO ENQUIRE
                </button>
              </Link>
            </div>
            <div className="col-md-7 mb-3">
              <img
                className={`${style.boxImage12} img-fluid rounded-4 shadow`}
                src="boxImage12.png"
                alt="Design Services"
              />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
