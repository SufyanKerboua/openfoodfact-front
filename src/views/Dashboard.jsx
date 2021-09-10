import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../components/Header';

import '../styles/Dashboard.css'

import { apiConfig } from '../config/apiConfig';
import ProfileSetting from './ProfileSetting'
import Product from './Product';
import ProductList from './ProductList';

function Dashboard ({token, setToken}) {
    const [products, setProducts] = useState(null);
    const [barCodeProduct, setBarCodeProduct] = useState(null);
    const [profileView, setProfileView] = useState(false);

    const fetchProductList = () => {
        axios.get(`${apiConfig.protocol}://${apiConfig.baseUrl}:${apiConfig.port}/product`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(res => {
              console.log({'res /product :': res});
              setToken(res.data.token);
              setProducts(res.data.products);
          }).catch(err => {
              alert('Couldn\'t fetch all products...');
          })
    }

    useEffect(() => {
        fetchProductList();
    }, []);

    useEffect(() => {
        console.log({'Bar code': barCodeProduct});
    }, [barCodeProduct]);

    useEffect(() => {
        fetchProductList();
        if (barCodeProduct === false)
            setBarCodeProduct(null);
    }, [barCodeProduct, profileView]);

    return (
        <div id='dashboard'>
            {
                barCodeProduct ?
                    <Product token={token} barCodeProduct={barCodeProduct} setBarCodeProduct={setBarCodeProduct} isProductCreateView={barCodeProduct === true ? true : false} />
                : null
            }
            <Header setToken={setToken} setProfileView={setProfileView} profileView={profileView}/>
            {
                profileView ?
                    <ProfileSetting token={token} setToken={setToken} setProfileView={setProfileView} />
                :
                    <ProductList token={token} products={products} setBarCodeProduct={setBarCodeProduct} />
            }
        </div>
    )

}

export default Dashboard;