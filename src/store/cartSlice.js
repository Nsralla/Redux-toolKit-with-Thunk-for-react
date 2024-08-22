import { createSlice } from "@reduxjs/toolkit";
import { notificationActions } from "./notificationSlice";
const cartSlice = createSlice({
    name:'cartSlice',
    initialState:{
        items:[],
        totalQuantity:0,
        changed:false,
    },
    reducers:{
        addItemToCart(state, action){
            state.changed = true;
            // take the item
            const newItem = action.payload;
            // check if the item already exists
            const existingItem= state.items.find(item=> item.id === newItem.id);
            state.totalQuantity++;
            if(!existingItem){
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity:1,
                    totalPrice: newItem.price,
                    name: newItem.title,
                });
            }
            else{    
                    existingItem.quantity++;
                    existingItem.totalPrice = existingItem.totalPrice + newItem.price;
                }
        },
        removeItemFromCart(state,action){
            state.changed = true;
            // take the id, check if the quantity equals one
            const id = action.payload.id;
            const existingItem = state.items.find(item=>item.id === id);
            state.totalQuantity--;
            if(existingItem.quantity === 1){
                // remove the item from the items
                state.items = state.items.filter(item=>item.id !== existingItem.id);
            }else{
                // reduce the quantity and the total price
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }

        },
        replaceCart(state, action){
            state.changed=false;
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
        }
        
    }
});


// thunk to send data to fire base
export const updateCartAPI = (cart)=>{
    return async (dispatch)=>{
        dispatch(
            notificationActions.setNotification({
                status: "pending",
                title: "Sending...",
                message: "Sending cart data!",
            })
        );

        try {
            const response = await fetch(
                "https://cartprojet-8131b-default-rtdb.firebaseio.com/cart.json",
                {
                method: "PUT",
                body: JSON.stringify(cart),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update cart");
            }
            dispatch(
                notificationActions.setNotification({
                    status: "success",
                    title: "Success!",
                    message: "Cart data sent successfully!",
                })
            );

        } catch (error) {
            dispatch(
                notificationActions.setNotification({
                    status: "error",
                    title: "Error!",
                    message: "Failed to send cart data!",
                })
            );
        }
        setTimeout(() => {
            dispatch(notificationActions.setNotification(null));
        }, 3000);

    }
}

// thunk to fetch data from FIREBASE
export const fetchCartAPI = ()=>{
    return async (dispatch)=>{
        dispatch(
            notificationActions.setNotification({
                status: "pending",
                title: "Fetching...",
                message: "Fetching cart data!",
            })
        );

        try {
            const response = await fetch(
                "https://cartprojet-8131b-default-rtdb.firebaseio.com/cart.json"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch cart");
            }
            const data = await response.json();
            console.log(data);
            dispatch(cartActions.replaceCart({items:data.items || [], totalQuantity:data.totalQuantity || 0}));
            dispatch(
                notificationActions.setNotification({
                    status: "success",
                    title: "Success!",
                    message: "Cart data fetched successfully!",
                })
            );

        } catch (error) {
            dispatch(
                notificationActions.setNotification({
                    status: "error",
                    title: "Error!",
                    message: "Failed to fetch cart data!",
                })
            );
        }
        setTimeout(() => {
            dispatch(notificationActions.setNotification(null));
        }, 3000);

    }
}



export default cartSlice;
export const cartActions = cartSlice.actions;