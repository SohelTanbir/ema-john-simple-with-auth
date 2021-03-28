import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Header/Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import PlaceOrderimg from  '../../images/giphy.gif';
import { useHistory } from 'react-router';


const Review = (props)=>{
    // from cart
    const [ReviwCart, setReviewCart] = useState([]);
       // remove item from cart
   const removeProduct = (productkey)=>{
    const newCart =  ReviwCart.filter(pd => pd.key !== productkey);
    setReviewCart(newCart);
    removeFromDatabaseCart(productkey);
}
   useEffect(()=>{
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
        fetch('https://ancient-wave-06547.herokuapp.com/productsKeys', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setReviewCart(data));
   },[]);

   const [orderPlaced, setOrderPlaced] = useState(false);
    const history =  useHistory()

   const handleProceedCheckout = ()=>{
    history.push('/shipment');
   }

let welcome;
if(orderPlaced){
    welcome = <img src={PlaceOrderimg} alt=""/>
}
    return(
        <div className="twin-container">
             <div className="product-container">
                {
                ReviwCart.map(pd => <ReviewItem product={pd} key={pd.key} removeProduct={removeProduct}></ReviewItem>)
                }
            </div>
            { 
                welcome
            }
            <div className="cart-container">
                <Cart cart={ReviwCart}>
                   <button onClick={handleProceedCheckout} className="cart-btn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    )
}

export default Review