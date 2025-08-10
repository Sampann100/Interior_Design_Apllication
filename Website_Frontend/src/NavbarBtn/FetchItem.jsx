import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetctStatusAction } from "../../store/fetchStatus";
import { itemActions } from "../../store/itemSlice";
import { userDataAction } from "../../store/userDataSlice";

const FetchItem = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);

  // Fetch Items
  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetctStatusAction.markFetchStarted());

    fetch("https://interior-design-apllication-backend.onrender.com/items", {
      signal: controller.signal,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((items) => {
        dispatch(itemActions.addInitialState(items));
        dispatch(fetctStatusAction.markFetchDone());
        dispatch(fetctStatusAction.markFetchFinish());
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Items fetch error:", error);
        }
      });

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  // Fetch User
  useEffect(() => {
    if (!user) {
      return;
    }

    const controller = new AbortController();
    dispatch(fetctStatusAction.markFetchStarted());

    fetch("https://interior-design-apllication-backend.onrender.com/", {
      signal: controller.signal,
      credentials: "include",
    })
      .then((res) => {
        if(res.status === 401){
          throw new Error(res.statusText)
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          dispatch(userDataAction.setProfileData(data));
        }
        dispatch(fetctStatusAction.markFetchDone());
        dispatch(fetctStatusAction.markFetchFinish());
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("User fetch error:", error);
        }
      });

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return null;
};

export default FetchItem;
