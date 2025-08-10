import { useEffect } from "react";
import BagItem from "../src/NavbarBtn/BagItem";
import style from "./Bag.module.css";
import BagSummary from "../src/NavbarBtn/BagSummary";
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { fetctStatusAction } from "../store/fetchStatus";
import { Link } from "react-router-dom";

const Bag = () => {
  const dispatch = useDispatch();
  const fetchStatus = useSelector((state) => state.fetchStatus);
  const bagItems = useSelector((state) => state.bagItem);

  useEffect(() => {
    fetch("https://interior-design-apllication-backend.onrender.com/cart", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        dispatch(bagActions.addToBag(data));
        dispatch(fetctStatusAction.markFetchDone());
        dispatch(fetctStatusAction.markFetchFinish());
      })
      .catch((err) => console.log("Error: ", err));
  }, [dispatch, fetchStatus.fetchDone]);

  return (
    <main className={style.bagPageWrapper}>
      <div className={style.bagContainer}>
        <div className={style.bagItems}>
          {Array.isArray(bagItems) && bagItems.length > 0 ? (
            bagItems.map((item) => (
              <div key={item._id} className={style.fadeIn}>
                <BagItem newitem={item} />
              </div>
            ))
          ) : (
            <div className={style.emptyCart}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/102/102661.png"
                alt="Empty Cart"
                className={style.emptyCartIcon}
              />
              <h2>Your cart is empty</h2>
              <p>Looks like you haven’t added anything yet!</p>
              <Link to="/">
                <button className={style.shopNowBtn}>Continue Shopping</button>
              </Link>
            </div>
          )}
        </div>

        {Array.isArray(bagItems) && bagItems.length > 0 && (
          <div className={style.bagSummary}>
            <h3 className={style.summaryTitle}>Order Summary</h3>
            <BagSummary />
          </div>
        )}
      </div>
    </main>
  );
};

export default Bag;
