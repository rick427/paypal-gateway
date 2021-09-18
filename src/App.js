import React from 'react';
import ReactDOM from "react-dom";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const App = () => {
  //@: create order 
  function _createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "1",
          },
        },
      ],
    });
  }

  //@: After a success payment
  async function _onApprove(data, actions) {
    let order = await actions.order.capture();
    console.log(order);
    return order;
  }

  //:@ If error
  function _onError(err) {
    console.log(err);
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

export default App
