import React from 'react'
import { PayPalButton } from "react-paypal-button-v2";

const PaypalButton = ({ amount, onSuccess, currency }) => {
  return (
    <PayPalButton
      amount={amount}
      currency={currency}
      onSuccess={(details, data) => onSuccess(details, data)}
      disableCard="visa"
      options={{
        clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID
      }}
    />
  )
}

export default PaypalButton