import React, { useState, useEffect } from 'react';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000); // Fetch orders every 5 seconds (adjust as needed)

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleDeleteOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div>
      <h2>Daftar Pesanan</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <h3>{order.customerName}</h3>
              <h1>{order.customerAddress}</h1>
              <p>Tanggal Pesanan: {order.date}</p>
              <ul>
                {order.orderItems.map((item, i) => (
                  <li key={i}>
                    <span>{item.name}</span> - <span>{item.category}</span> - <span>Qty: {item.quantity}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => handleDeleteOrder(index)}>Hapus Pesanan</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Belum ada pesanan.</p>
      )}
    </div>
  );
};

export default OrderListPage;
