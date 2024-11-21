
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { axios } from '../../lib/axios';
import { PAYPAL_CLIENT_ID } from '../../config';


const PaymentComponent = () => {


    const handleApprove = async (data:any, actions:any) => {
        
        const response = await axios.post('/create_payment/')
        console.log(response)
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
        <PayPalScriptProvider options={{ 'clientId':PAYPAL_CLIENT_ID, 'currency':'GBP'}}>
            <PayPalButtons
                createOrder={(data, actions) =>{ return actions.order.create({
                    purchase_units: [{
                        amount: {
                            currency_code: "GBP",
                            value: "10.00",
                        },
                        
                    }], 
                } as any);
            }}
            onApprove={async (data:any, actions:any) => {
                await handleApprove(data, actions)
                return actions?.order.capture().then(function (details:any) {
                    alert('Transaction completed by ' + details.payer.name.given_name);
                });
            }}
            ></PayPalButtons>
        </PayPalScriptProvider>
    );
};

export default PaymentComponent;