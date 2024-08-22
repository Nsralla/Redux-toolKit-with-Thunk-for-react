import {  useEffect} from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { updateCartAPI } from "./store/cartSlice";
import './App.css';
import { fetchCartAPI } from "./store/cartSlice";
let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state=> state.notification.notification);
  const isCartChanged = useSelector(state=> state.cart.changed);
  const dispatch = useDispatch();

  // call thunk to fetch data from firebase
  useEffect(()=>{
    dispatch(fetchCartAPI());
  },[dispatch]);

// call thunk to send data to firebase
  useEffect(() => {
    if (!isCartChanged) {
      return;
    }
      dispatch(updateCartAPI(cart));
  }, [cart, dispatch, isCartChanged]);

  return (
    <>
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
      {notification && (
        <div className={`notification ${notification.status}`}>
          <h2>{notification.title}</h2>
          <p>{notification.message}</p>
        </div>
      )}
    </>
  );
}

export default App;
