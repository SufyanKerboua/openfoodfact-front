import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

import CircularLoader from '../components/CircularLoader';
import InputField from '../components/InputField';
import { apiConfig } from '../config/apiConfig';

import '../styles/Product.css';


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: 1
    },
}));

function AdminPanel({token, barCodeProduct, setBarCodeProduct, isProductCreateView}) {
    const [isPanelEditLoading, setIsPanelEditLoading] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [product, setProduct] = useState([]);
    const [code, setCode] = useState('');
    const classes = useStyles();
    const url = `${apiConfig.protocol}://${apiConfig.baseUrl}:${apiConfig.port}/product/`;

    useEffect(() => {
        console.log({'Create View state': isProductCreateView});
        if (!isProductCreateView) {
            console.log('here');
            setIsPanelEditLoading(true);
            setIsSpinning(true);
            fetchProduct();
        }
    }, []);

    const fetchProduct = () => {
        console.log({'Bar code in fetch': barCodeProduct});
        axios.get(`${url}${barCodeProduct}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(res => {              
            setIsSpinning(false);
            console.log({res: res});
            setProduct(res.data.product);
            setIsPanelEditLoading(false);
          }).catch(err => {
            setIsSpinning(false);
        })
    }

    const addProduct = () => {
        console.log({'Bar code to Add POST fetch': code});
        axios.post(`${url}${code}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(res => {              
            setIsSpinning(false);
            console.log({res: res});
            setBarCodeProduct(false);
            setIsPanelEditLoading(false);
          }).catch(err => {
            setIsSpinning(false);
            setBarCodeProduct(false);
            console.log({'err': err})
            const errorCode = err.response.data.statusCode;
            if (errorCode === 404)
                alert('Le code barre du produit n\'est pas trouvable, veuillez en saisir un autre.');
            else if (errorCode === 409)
                alert('Le code barre du produit entré est déjà dans votre liste, veuillez en saisir un autre.');
        })
    }

    return !isPanelEditLoading ? (
        <div>
        <Backdrop className={classes.backdrop} open={true} onClick={() => setBarCodeProduct(false)}>
        </Backdrop>
        {
            isProductCreateView ?
            <div id='product-card'>
                <h2>Veuillez rentrer un code barre</h2>
                <InputField style={{margin: '20px'}} field="Code barre" isPassWord={false} setData={setCode} value={code} />
                <button className='save-product' onClick={() => addProduct()}>Rajouter le produit</button>
            </div>
            :
            <div id='product-card'>
                <h2>{product.product_name}</h2>
                <p>Code barre: {product.bar_code}</p>
                <p>Marque: {product.brands}</p>
                <p>{product.ingredients_text}</p>
                <img src={product.image_url} alt={'Product ' + product.product_name} />
                {/* <DashboardComeBackBtn setBarCodeProduct={setBarCodeProduct} /> */}
            </div>
        }
        </div>
    ) : (
        <div id='admin-panel-edit'>
            <CircularLoader isSpinning={isSpinning} text='Récupération du produit en cours...'/>
        </div>
    )
}

export default AdminPanel;