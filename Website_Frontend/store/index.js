import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./itemSlice";
import fetchSliceStatus from "./fetchStatus";
import bagSlice from "./bagSlice";
import userDataSlice from "./userDataSlice";
import payedItemSlice from "./payedItemSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("bagItems");
    if (serializedState === null) return undefined;
    return {
      bagItem: JSON.parse(serializedState),
    };
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.bagItem);
    localStorage.setItem("bagItems", serializedState);
  } catch (err) {
    // ignore write errors
  }
};

const preloadedState = loadState();

const designerStore = configureStore({
  reducer: {
    items: itemSlice.reducer,
    fetchStatus: fetchSliceStatus.reducer,
    bagItem: bagSlice.reducer,
    userData: userDataSlice.reducer,
    payedItem: payedItemSlice.reducer,
  },
  preloadedState,
});

designerStore.subscribe(() => {
  saveState(designerStore.getState());
});

export default designerStore;
