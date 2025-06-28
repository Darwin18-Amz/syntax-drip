import React from 'react';

const LoginInputs = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="username"
      placeholder="Username"
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
  );
};

export default LoginInputs;
