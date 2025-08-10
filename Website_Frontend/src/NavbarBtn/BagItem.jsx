import {
  MdDeleteForever,
  MdLocalShipping,
  MdAssignmentReturn,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import style from "./BagItem.module.css";
import { useDispatch } from "react-redux";
import { bagActions } from "../../store/bagSlice";
import { fetctStatusAction } from "../../store/fetchStatus";

const BagItem = ({ newitem }) => {
  const item = newitem;
  const dispatch = useDispatch();

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((item.original_price - item.current_price) / item.original_price) * 100
  );

  // ...existing handleRemoveItemFromCart function...
  const handleRemoveItemFromCart = async (e, itemId) => {
    e.preventDefault();
    const res = await fetch(
      "https://interior-design-apllication-backend.onrender.com/deleteCartItem",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      }
    );

    if (res.ok) {
      dispatch(bagActions.removeFromBag(itemId));
      dispatch(fetctStatusAction.markFetchDone());
      dispatch(fetctStatusAction.markFetchFinish());
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={style.bagItem}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className={style.imageContainer}>
          <motion.img
            src={item.imageUrl}
            alt={item.itemName}
            className={style.productImage}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className={style.discountBadge}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {discountPercentage}% OFF
          </motion.div>
        </div>

        <div className={style.contentContainer}>
          <div className={style.header}>
            <h3 className={style.productName}>{item.itemName}</h3>
            <p className={style.designer}>By Erikka Fogleman</p>
          </div>

          <div className={style.priceSection}>
            <div className={style.priceContainer}>
              <span className={style.currentPrice}>
                ₹{item.current_price.toLocaleString()}
              </span>
              <span className={style.originalPrice}>
                ₹{item.original_price.toLocaleString()}
              </span>
            </div>
          </div>

          <div className={style.shippingInfo}>
            <div className={style.infoItem}>
              <MdAssignmentReturn className={style.icon} />
              <span>
                <strong>28 days</strong> return available
              </span>
            </div>
            <div className={style.infoItem}>
              <MdLocalShipping className={style.icon} />
              <span>
                Delivery by <strong>28 oct</strong>
              </span>
            </div>
          </div>
        </div>

        <motion.button
          className={style.removeButton}
          onClick={(e) => handleRemoveItemFromCart(e, item._id)}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <MdDeleteForever size={24} />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default BagItem;
