import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name:'ui',
    initialState:{showCart:true},
    reducers:{
        toggle(state){
            state.showCart = !state.showCart;
        }
    }
});

export default uiSlice;
export const uiActions = uiSlice.actions;