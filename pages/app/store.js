import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

//the global store
const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});

export default store;
