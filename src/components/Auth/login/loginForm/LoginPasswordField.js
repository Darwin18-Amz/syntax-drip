// src/components/Auth/login/loginForm/LoginPasswordField.js
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../style/input.css';
import '../../style/password.css';

const LoginPasswordField = ({ formData, setFormData }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="password-field">
      <input
        type={showPass ? 'text' : 'password'}
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
        {showPass ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
};

export default LoginPasswordField;