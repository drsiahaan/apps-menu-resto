import React, { useState } from 'react';
import OrderSummary from './OrderSummary';
import './Pemesanan.css';

const MenuList = ({ menuItems, handleOrder }) => {
  return (
    <div>
      <h2>Menu Restoran</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <span>{item.name}</span> - <span>{item.category}</span> - <span>Rp {item.price}</span>
            <button onClick={() => handleOrder(item)}>Pesan</button>
          </li>
        ))}
      </ul>
    </div>
  );
};



function Pemesanan() {
  const [orderItems, setOrderItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const menuItems = [
    {
      name: 'Nasi Goreng',
      category: 'Makanan',
      price: 15000,
    },
    {
      name: 'Mie Ayam',
      category: 'Makanan',
      price: 12000,
    },
    {
      name: 'Ayam Goreng',
      category: 'Makanan',
      price: 18000,
    },
    {
      name: 'Es Teh Manis',
      category: 'Minuman',
      price: 5000,
    },
    {
      name: 'Jus Jeruk',
      category: 'Minuman',
      price: 8000,
    },
    {
      name: 'Kopi Hitam',
      category: 'Minuman',
      price: 10000,
    },
  ];

  const handleOrder = (item) => {
    const existingItem = orderItems.find((orderItem) => orderItem.name === item.name);

    if (existingItem) {
      const updatedItems = orderItems.map((orderItem) =>
        orderItem.name === item.name ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
      );
      setOrderItems(updatedItems);
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemove = (index) => {
    const updatedOrder = [...orderItems];
    updatedOrder.splice(index, 1);
    setOrderItems(updatedOrder);
  };

  const handleQuantityChange = (index, type) => {
    const updatedItems = [...orderItems];
    const item = updatedItems[index];

    if (type === 'increase') {
      updatedItems[index] = { ...item, quantity: item.quantity + 1 };
    } else if (type === 'decrease' && item.quantity > 1) {
      updatedItems[index] = { ...item, quantity: item.quantity - 1 };
    }

    setOrderItems(updatedItems);
  };

  const handleOrderSubmit = () => {
    if (!customerName.trim()) {
      alert('Nama pemesanan tidak boleh kosong!');
      return;
    }
  
    if (orderItems.length === 0) {
      alert('Pesanan tidak boleh kosong!');
      return;
    }

    if (!customerAddress.trim()) {
      alert('Alamat pemesan tidak boleh kosong!');
      return;
    }

    setShowConfirmation(true); // Tampilkan modal konfirmasi saat tombol "Pesan" ditekan
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false); // Tutup modal konfirmasi saat diklik "Cancel"
  };

  const handleConfirmOrder = () => {

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      customerName,
      customerAddress,
      orderItems,
      date: new Date().toLocaleString(), // You can also add the order date/time
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
  
    // Clear the order and customer name after saving to localStorage
    setOrderItems([]);
    setCustomerName('');
    setCustomerAddress('');
    setShowConfirmation(false);
  };

  const handleClearOrder = () => {
    setOrderItems([]); // Hapus semua pesanan saat tombol "Clear Pesanan" ditekan
  };

  return (
    <div className="App">
      <div>
        <label htmlFor="customerName">Nama Pesanan:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <label htmlFor="customerAddress">Alamat Pemesan:</label>
        <input
          type="text"
          id="customerAddress"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
      </div>
      <MenuList menuItems={menuItems} handleOrder={handleOrder} />
      <OrderSummary
        orderItems={orderItems}
        handleRemove={handleRemove}
        handleQuantityChange={handleQuantityChange}
        handleClearOrder={handleClearOrder}
      />
      {showConfirmation && (
        <div className="Modal">
          <h2>Apakah Anda yakin ingin memesan?</h2>
          <button onClick={handleConfirmOrder}>Konfirmasi</button>
          <button onClick={handleConfirmationClose}>Cancel</button>
        </div>
      )}
      <button onClick={handleOrderSubmit}>Pesan</button>
    </div>
  );
}

export default Pemesanan;
