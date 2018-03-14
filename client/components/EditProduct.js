import React from 'react';
import SharedProductForm from './SharedProductForm';

const EditProduct = (props) => {
    return <SharedProductForm {...props} newProduct={false} />;
};

export default EditProduct;
