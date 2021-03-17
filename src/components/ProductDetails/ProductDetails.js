import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Header/Product/Product';

const ProductDetails = () => {
    const { productKey } = useParams();

   const productDetails = fakeData.find(pd => pd.key === productKey);
   console.log(productDetails);
    return (
        <div>
            <h2>{productKey} Product details page coming sooon</h2>
            <Product showAddToCart={false} Product={productDetails}></Product>
        </div>
    );
};

export default ProductDetails;