import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice.js";
import cartSlice from "./cartSlice.js";
import notificationSlice from "./notificationSlice.js";
const store = configureStore({
    reducer:{
        ui:uiSlice.reducer,
        cart:cartSlice.reducer,
        notification: notificationSlice.reducer,
    },
});

export default store;