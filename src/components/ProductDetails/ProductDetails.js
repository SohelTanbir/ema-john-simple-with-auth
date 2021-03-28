import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Header/Product/Product';

const ProductDetails = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});

    useEffect(()=>{
        fetch('https://ancient-wave-06547.herokuapp.com/products/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey])
    return (
        <div>
            <h2> Product details</h2>
            <Product showAddToCart={false} Product={product}></Product>
        </div>
    );
};

export default ProductDetails;