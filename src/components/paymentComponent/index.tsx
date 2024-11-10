
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { axios } from '../../lib/axios';
import { PAYPAL_CLIENT_ID } from '../../config';


const PaymentComponent = () => {


    const createOrder = async (data:any, actions:any) => {
        
        const response = await axios.post('/create_payment/')
        var token = '';
        var links = response.data.links;
        for (var i = 0; i < links.length; i++) {
            if (links[i].rel === 'approval_url') {
                token = links[i].href.split('EC-', 2)[1];
            }
        }
        return token;
        // return response.data.id
    };

    const onApprove = async (data:any, actions:any) => {
        axios.post('/execute_payment/', {
            paymentID: data.orderID,
            payerID: data.payerID,
        }).then((r)=>{
            console.log('Payment successful', r.data);
        })
    };

    return (
        <PayPalScriptProvider options={{ 'clientId':PAYPAL_CLIENT_ID, 'currency':'GBP', }}>
            <PayPalButtons  createOrder={createOrder} onApprove={onApprove} />
            

        </PayPalScriptProvider>
    );
};

export default PaymentComponent;