import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const LoginPasswordField = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        type={showPassword ? 'text' : 'password'}
        name="password"
        placeholder="Password"
        value={value}
        onChange={onChange}
        required
        style={{
          width: '100%',
          padding: '1rem',
          fontSize: '1.2rem', // increased font size
          borderRadius: '8px',
          border: '1px solid #ccc',
          marginBottom: '1.5rem',
          boxSizing: 'border-box'
        }}
      />
      <span
        onClick={() => setShowPassword((prev) => !prev)}
        style={{
          position: 'absolute',
          right: '1rem',
          top: '40%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          fontSize: '1.3rem'
        }}
      >
        {showPassword ? <FaEye/> : <FaEyeSlash/>}
      </span>
    </div>
  );
};

export default LoginPasswordField;
