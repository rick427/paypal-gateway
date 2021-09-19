import React from 'react';
import ReactDOM from "react-dom";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const Home = ({match}) => {
  const {amount} = match.params;

  //@: create order 
  function _createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    });
  }

  //@: After a success payment
  async function _onApprove(data, actions) {
    let order = await actions.order.capture();
    console.log(order);
    window.ReactNativeWebView && 
      window.ReactNativeWebView.postMessage(JSON.stringify(order))
    return order;
  }

  //:@ If error
  function _onError(err) {
    console.log(err);
    let errObj = {err, status: 'FAILED'}
    window.ReactNativeWebView && 
      window.ReactNativeWebView.postMessage(JSON.stringify(errObj))
  }

  return (
    <div className="container">
      <div className="card">
        <PayPalButton
          createOrder={(data, actions) => _createOrder(data, actions)}
          onApprove={(data, actions) => _onApprove(data, actions)}
          onCancel={() => _onError("Canceled")}
          onError={(err) => _onError(err)}
        />
      </div>
    </div>
  )
}

export default Home
