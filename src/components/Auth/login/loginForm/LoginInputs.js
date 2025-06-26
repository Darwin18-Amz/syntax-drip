// src/components/Auth/login/loginForm/LoginInputs.js
import React from 'react';

const LoginInputs = ({ formData, setFormData }) => (
  <input
    type="text"
    placeholder="Email or Username"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    required
  />
);

export default LoginInputs;