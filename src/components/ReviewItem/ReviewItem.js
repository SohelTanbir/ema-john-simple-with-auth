import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    // console.log(props);
    const ReviewItemStyle = {borderBottom:'1px solid gray', marginBottom:'10px', padding:'0 50px 15px', width:'70%'}
    return (
        <div style={ReviewItemStyle}>
            <h3>{name}</h3>
            <p>Quantity: {quantity}</p>
            <p><small>Price: ${price}</small></p>
            <button className="cart-btn" onClick={()=> props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;