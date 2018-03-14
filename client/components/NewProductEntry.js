import React from 'react';
import SharedProductForm from './SharedProductForm';

const NewProductEntry = (props) => {
    return <SharedProductForm {...props} newProduct={true} />;
};

export default NewProductEntry;
