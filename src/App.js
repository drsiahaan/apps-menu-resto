import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Login from './components/Login';
import Pemesanan from './components/Pemesanan';
import './App.css';
import OrderListPage from './components/OrderListPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/pemesanan" element={<Pemesanan />} />
          <Route path="/order-list" element={<OrderListPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
