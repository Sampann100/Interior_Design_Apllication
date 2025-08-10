import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdShoppingBag, MdLocalOffer, MdPayment } from "react-icons/md";
import styles from "./BagSummary.module.css";

const BagSummary = () => {
  let bagItem = useSelector((state) => state.bagItem) || [];
  const CONVENIENCE_FEES = 99;
  
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItem.forEach((item) => {
    totalMRP += item.original_price;
    totalDiscount += item.original_price - item.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.card}>
        <div className={styles.header}>
          <MdShoppingBag size={24} />
          <h2>Price Details ({bagItem.length} Items)</h2>
        </div>

        <div className={styles.content}>
          <div className={styles.priceRow}>
            <span>Total MRP</span>
            <span className={styles.amount}>₹{totalMRP.toLocaleString()}</span>
          </div>

          <div className={styles.priceRow}>
            <div className={styles.discountLabel}>
              <MdLocalOffer size={20} />
              <span>Discount on MRP</span>
            </div>
            <span className={styles.discountAmount}>
              -₹{totalDiscount.toLocaleString()}
            </span>
          </div>

          <div className={styles.priceRow}>
            <span>Convenience Fee</span>
            <span className={styles.convenienceFee}>₹{CONVENIENCE_FEES}</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.totalRow}>
            <div className={styles.totalLabel}>
              <MdPayment size={20} />
              <span>Total Amount</span>
            </div>
            <span className={styles.totalAmount}>
              ₹{finalPayment.toLocaleString()}
            </span>
          </div>
        </div>

        <Link to="/payment" className={styles.checkoutLink}>
          <motion.button 
            className={styles.checkoutButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Counseller
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default BagSummary;