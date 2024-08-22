import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
    name:'notificationSlice',
    initialState:{
        notification:null,
    },
    reducers:{
        setNotification(state, action){
            state.notification = action.payload;
        },
    }
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;