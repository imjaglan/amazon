import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

//the global store
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});
