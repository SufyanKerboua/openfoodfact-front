import React from 'react';

import '../styles/ProductItem.css'

function ProductItem ({name, barCode, imageUrl, setBarCodeProduct}) {
    return (
        <div className='product-item' onClick={() => setBarCodeProduct(barCode)}>
            <div className='product-item-container'>
                <p><b>Nom du produit : </b>{name}</p>
                <p><b>Code Barre : </b>{barCode}</p>
                <img src={imageUrl} alt={name} />
            </div>
        </div>
    )
}

export default ProductItem;