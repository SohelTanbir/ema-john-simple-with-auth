import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import addToDatabaseCart, { getDatabaseCart } from'../../../utilities/databaseManager';
import './Shop.css';
import { Link } from 'react-router-dom';



const Shop = () => {
    const [products, setProducts]= useState([]);
    const [cart,setcart] = useState([]);

    useEffect(()=>{
        fetch('https://ancient-wave-06547.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])


    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productkeys = Object.keys(savedCart);
       if(products.length > 0){
       const previousCart = productkeys.map(existingkey =>{
        const product = products.find(pd => pd.key === existingkey);
        product.quantity = savedCart[existingkey];
        return product
       });
       setcart(previousCart);
       }
    },[products])


    const handlerAddProduct =(product)=>{
        const tobeadded = product.key;
        const sameProduct = cart.find(pd => pd.key === tobeadded);
        let count = 1;
        let newCart;
        if(sameProduct){
           count = sameProduct.quantity + 1;
           sameProduct.quantity = count;
           const othersProdcut = cart.filter(pd => pd.key !== tobeadded);
            newCart = [...othersProdcut, sameProduct]
        }else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setcart(newCart);
        
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                <h2>Product List</h2>
                <ul>
                    {
                        products.map(pd =><Product showAddToCart={true} key={pd.key} Product={pd} handlerAddProduct={handlerAddProduct}></Product>)
                    }
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review"><button className="cart-btn">Order Review</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;