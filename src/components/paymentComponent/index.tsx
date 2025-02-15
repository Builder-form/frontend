import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { axios } from '../../lib/axios';
import { PAYPAL_CLIENT_ID } from '../../config';
import { App, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ProjectIE } from '../../types';


const PaymentComponent: React.FC<{ project_name: string, onCreate: (data: any, actions: any) => void}> = (props) => {
    const { message, modal, notification } = App.useApp();
    const [name, setName] = useState(props.project_name);
    useEffect(()=>{
        setName(props.project_name)
    }, [props.project_name])

    console.log(name, 'NAME', props.project_name)
   
    const handleApprove =(data: any, actions: any) => {        
            props.onCreate(data, actions)
    };

    let navigate = useNavigate()

    // const onApprove = async (data:any, actions:any) => {
    //     axios.post('/execute_payment/', {
    //         paymentID: data.orderID,
    //         payerID: data.payerID,
    //     }).then((r)=>{
    //         console.log('Payment successful', r.data);
    //     })
    // };



    return (
        <div style={{ minWidth: '328px', minHeight: '200px' }}>
            <PayPalScriptProvider options={{ 'clientId': PAYPAL_CLIENT_ID, 'currency': 'GBP' }}>
                <PayPalButtons
                    style={{
                        label: 'checkout',
                        color: 'black',
                        borderRadius: 8,
                        layout: 'vertical',
                    }}
                    createOrder={(data, actions) => {
                        console.log(props.project_name, 'NAME Create')
                        let order = actions.order.create({
                            purchase_units: [{
                                amount: {
                                    currency_code: "GBP",
                                    value: "10.00",
                                },
                            }],
                        } as any
                        );
                        console.log('ON CREATE', data, actions, order)
                        return order;
                    }}
                    onApprove={async (data: any, actions: any) => {
                        console.log(props.project_name, 'NAME Approve')
                        handleApprove(data, actions)
                        return actions?.order.capture().then(function (details: any) {
                            message.success('Transaction completed by ' + details.payer.name.given_name);
                        });
                    }}
                ></PayPalButtons>
            </PayPalScriptProvider>
        </div>
    );
};

export default PaymentComponent;