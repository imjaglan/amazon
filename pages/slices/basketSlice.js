import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

//create the basket
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //ACTIONS
    addToBasket: (state, action) => {
      //payload contains the product we dispached from product.js
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      //the id or data we are passing comes from action.payload
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];
      if (index >= 0) {
        //the item exist it will return it's index..remove the item..splice==cutting it out.. remove it by one
        newBasket.splice(index, 1);
      } else {
        //the item does not exist
        console.warn(`
       Cant remove product (id:${action.payload.id}) as its not present in the basket 
        `);
      }
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

//loop through every item get the item price adding it to total, total starts from 0
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
