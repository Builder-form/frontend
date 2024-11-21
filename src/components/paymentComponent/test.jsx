import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const App = () => {
    const handleApprove = async (data) => {
        const response = await fetch('http://localhost:8000/api/payments/create-payment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const orderData = await response.json();
        console.log(orderData);
    };

    return (
        <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
            <PayPalButtons
                createOrder={(data, actions) =>{ return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: "10.00", // Фиксированная цена товара
                        },
                    }],
                });
            }}
            onApprove={async (data, actions) => {
                await handleApprove(data);
                return actions.order.capture().then(function (details) {
                    alert('Transaction completed by ' + details.payer.name.given_name);
                });
            }}
        />
    </PayPalScriptProvider>
);
};

export default App;
