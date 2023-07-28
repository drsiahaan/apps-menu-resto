import React from 'react';
import './OrderSummary.css';

const OrderSummary = ({ orderItems, handleRemove, handleQuantityChange, handleClearOrder }) => {
    const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
    return (
      <div className="OrderSummary">
        <h2>Pesanan Anda</h2>
        <ul>
          {orderItems.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span> - <span>Rp {item.price}</span>
              <div>
                <button onClick={() => handleQuantityChange(index, 'decrease')}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(index, 'increase')}>+</button>
              </div>
              <button onClick={() => handleRemove(index)}>Hapus</button>
            </li>
          ))}
        </ul>
        <h3>Total Harga: Rp {totalPrice}</h3>
        <button onClick={handleClearOrder}>Clear Pesanan</button>
      </div>
    );
  };

export default OrderSummary;
