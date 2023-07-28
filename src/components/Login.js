import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(false);
  const [showInvalidOTPModal, setShowInvalidOTPModal] = useState(false);

  const handleSendOTP = async () => {
    setVerificationId(true);
    console.log('Sending OTP to:', phoneNumber);
  };

  const handleVerifyOTP = async () => {
    if (phoneNumber == '08123456789'){
      if (verificationCode == '1234'){
        navigate('/order-list');
      } else {
        setShowInvalidOTPModal(true);
      }
    } else {
      if (verificationCode == '1111'){
        navigate('/pemesanan');
      } else {
        setShowInvalidOTPModal(true);
      }
    } 
  };

  const handleCloseVerifivationOTP = () => {
    setVerificationCode('')
    setShowInvalidOTPModal(false)

  }

  return (
    <div>
      <h2>Halaman Login</h2>
      <div>
        <label htmlFor="phone">Nomor Telepon:</label>
        <input
          type="tel"
          id="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div id="recaptcha-container"></div>
        <button onClick={handleSendOTP}>Kirim OTP</button>
      </div>
      {verificationId && (
        <div>
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={handleVerifyOTP}>Verifikasi</button>
        </div>
      )}
      {showInvalidOTPModal && (
          <div className="modal">
            <div className="modal-content">
              <p>OTP salah</p>
              <button onClick={handleCloseVerifivationOTP}>Tutup</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default Login;
