import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentBox from "./CommentBox";

const ProductDetail = () => {
  const items = useSelector((state) => state.items);
  const { itemId } = useParams();
  const item = items.find((item) => item._id === itemId);

  if (!item) {
    return (
      <div className="container mx-auto text-center mt-10">
        <h2 className="text-2xl text-gray-700">Loading item details...</h2>
      </div>
    );
  }

  return (
    <>
      <main className="container mx-auto bg-white shadow-lg rounded-lg p-8 mt-10 max-w-6xl my-4">
        <h2 className="text-3xl text-red-500 font-bold text-center mb-6">
          Details of {item.itemName}
        </h2>

        <div className="row g-0 position-relative">
          <div className="col-md-6 mb-md-0 p-md-4">
            <img
              src={
                item.imageUrl.startsWith("http")
                  ? item.imageUrl
                  : `/${item.imageUrl}`
              }
              alt={item.itemName}
              style={{
                objectFit: "cover",
                transition: "transform 0.3s ease",
                borderRadius: "20px",
                height: "530px",
                width: "580px",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="col-md-6 p-4 ps-md-0">
            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold mb-2">Location</h3>
              <p className="text-gray-600">Delhi</p>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold mb-2">Current Price</h3>
              <p className="text-green-600 text-xl font-bold">
                ${item.current_price} / night
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold mb-2">Original Price</h3>
              <p className="text-green-600 text-xl font-bold">
                ${item.original_price} / night
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold mb-2">Rating</h3>
              <div className="flex items-center">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="ml-2 text-lg">4.3 / 5</span>
              </div>
            </div>
            <div className="mt-2 mb-5"></div>
          </div>
        </div>

        <CommentBox />
      </main>
    </>
  );
};

export default ProductDetail;
