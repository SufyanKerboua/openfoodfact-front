import React, { useState } from 'react';
import axios from 'axios';

import ProductItem from '../components/ProductItem';
import CircularLoader from '../components/CircularLoader';

import { apiConfig } from '../config/apiConfig';

import '../styles/ProductList.css';

function ProductList ({token, products, setBarCodeProduct}) {
    const [isSpinning, setIsSpinning] = useState(false);
    const radiusBtn = 65;
    const radiusBtnRemove = 21;

    const removePanel = (barCode) => {
        setIsSpinning(true);
        axios.delete(`${apiConfig.protocol}://${apiConfig.baseUrl}:${apiConfig.port}/product/${barCode}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(res => {              
            setIsSpinning(false);
            setBarCodeProduct(false);
          }).catch(err => {
            setIsSpinning(false);
        });
    }
    
    return products == null ? (
        <div>
            Récupération des produits en cours ...
        </div>
    ) : (
        <div className='dashboard-container'>
            <CircularLoader isSpinning={isSpinning} />
            {
                products.map((product, index) => {
                    return (
                        <div key={'container-' + index} className='ad-product-item'>
                            <svg key={index + 'svg'} width={radiusBtnRemove * 2} height={radiusBtnRemove * 2} onClick={() => removePanel(product.bar_code)}>
                                <circle cx={radiusBtnRemove} cy={radiusBtnRemove} r={radiusBtnRemove - 5} strokeWidth="1" />
                                <line  x1={(radiusBtnRemove/5)*3} y1={radiusBtnRemove} x2={(radiusBtnRemove/5)*7} y2={radiusBtnRemove} stroke="white" strokeWidth="2" />
                                Sorry, your browser does not support inline SVG.
                            </svg>
                            <ProductItem 
                                key={index} 
                                name={product.product_name} 
                                barCode={product.bar_code} 
                                imageUrl={product.image_url}
                                setBarCodeProduct={setBarCodeProduct}
                                />
                        </div>
                    )
                })
            }
            <div className='ad-add-product-container'>
                <svg width={radiusBtn * 2} height={radiusBtn * 2} onClick={() => setBarCodeProduct(true)}>
                    <circle cx={radiusBtn} cy={radiusBtn} r={radiusBtn - 5} strokeWidth="1" />
                    <line  x1={radiusBtn} y1={radiusBtn*2 * 80/100} x2={radiusBtn} y2={radiusBtn*2 * 20/100} stroke="white" strokeWidth="8" />
                    <line  x1={radiusBtn*2 * 80/100} y1={radiusBtn} x2={radiusBtn*2 * 20/100} y2={radiusBtn} stroke="white" strokeWidth="8" />
                    Sorry, your browser does not support inline SVG.
                </svg>
            </div>
        </div>
    )
}

export default ProductList;