import React from 'react';

const Cart = (props) => {
    let cart = props.cart;
    let total = 0;
    for(let i= 0; i<cart.length; i++){
        let product = cart[i];
         total = total + product.price * (product.quantity || 1);
    }

    let shipping = 0;
    if(total > 10){
        shipping = 2;
    }
    else if(total > 30){
        shipping = 4.99;
    }
    else if(total > 50){
        shipping = 10;
    }
    let tex = total * 0.1;
    function toFixedNumber(number){
         return number.toFixed(0)
    }
    let totalPrice = total + tex + shipping;
    return (
        <div>
            <h3>Order Summery</h3>
            <h4>Total items: {cart.length}</h4>
            <h4>Product Price: ${toFixedNumber(total)}</h4>
            <h4>Shipping cost: ${toFixedNumber(shipping)}</h4>
            <h4>Text + VAT: ${toFixedNumber(tex)}</h4>
            <h3>Total Price: ${toFixedNumber(totalPrice)}</h3>
            {
                props.children
            }
        </div>
    );
};

export default Cart;