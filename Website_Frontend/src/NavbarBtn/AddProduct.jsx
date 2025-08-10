import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { itemActions } from "../../store/itemSlice";
import style from "./AddProduct.module.css";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:5000/items", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const res = await fetch("http://localhost:5000/items", {
      credentials: "include",
    });
    const items = await res.json();

    dispatch(itemActions.addInitialState(items));
    navigate("/");
    reset();
  };

  return (
    <div className={`${style["add-product-bg"]} py-5`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className={`${style["glass-card"]} p-4`}>
              <h2 className={`text-center mb-4 fw-bold ${style["stylish-title"]}`}>
                Add Interior Product
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                {/* Product Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Product Name</label>
                  <input
                    type="text"
                    {...register("itemName", {
                      required: "Product name is required.",
                      pattern: {
                        value: /^[A-Za-z\s&]+$/,
                        message: "Only letters, spaces & '&' allowed.",
                      },
                    })}
                    className={`form-control ${style["modern-input"]} ${errors.itemName ? "is-invalid" : ""}`}
                    placeholder="E.g. Scandinavian Sofa"
                  />
                  {errors.itemName && (
                    <div className="invalid-feedback">{errors.itemName.message}</div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    {...register("description", {
                      required: "Description is required.",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Only letters and spaces allowed.",
                      },
                    })}
                    className={`form-control ${style["modern-input"]} ${errors.description ? "is-invalid" : ""}`}
                    placeholder="Describe the product..."
                    rows="3"
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description.message}</div>
                  )}
                </div>

                {/* Prices */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Current Price ($)</label>
                    <input
                      type="number"
                      {...register("current_price", { required: true, min: 1 })}
                      className={`form-control ${style["modern-input"]} ${errors.current_price ? "is-invalid" : ""}`}
                      placeholder="499"
                    />
                    {errors.current_price && (
                      <div className="invalid-feedback">Current price is required.</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Original Price ($)</label>
                    <input
                      type="number"
                      {...register("original_price", { required: true, min: 1 })}
                      className={`form-control ${style["modern-input"]} ${errors.original_price ? "is-invalid" : ""}`}
                      placeholder="699"
                    />
                    {errors.original_price && (
                      <div className="invalid-feedback">Original price is required.</div>
                    )}
                  </div>
                </div>

                {/* Image URL */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Product Image URL</label>
                  <input
                    type="url"
                    {...register("imageUrl", { required: true })}
                    className={`form-control ${style["modern-input"]} ${errors.imageUrl ? "is-invalid" : ""}`}
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.imageUrl && (
                    <div className="invalid-feedback">Image URL is required.</div>
                  )}
                </div>

                <button
                  className={`btn ${style["modern-btn"]} w-100 py-2 fw-semibold rounded-pill`}
                  type="submit"
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
