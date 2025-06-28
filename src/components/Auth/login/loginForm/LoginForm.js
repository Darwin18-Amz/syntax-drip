import React, { useState } from 'react';
import LoginInputs from './LoginInputs';
import LoginPasswordField from './LoginPasswordField';
import LoginButtons from './LoginButtons';

const LoginForm = ({ handleLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData, setError);
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(#321938, #784331, #8C5522)',
  };

  const boxStyle = {
    background: '#ffffffdd',
    borderRadius: '30px',
    padding: '3rem 2.5rem',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
    width: '200%',
    maxWidth: '500px',
    textAlign: 'center',
    backdropFilter: 'blur(6px)',
  };

  const titleStyle = {
    marginBottom: '1.5rem',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '1rem',
    fontWeight: 500,
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 style={titleStyle}>SD Client Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <LoginInputs value={formData.username} onChange={handleChange} />
          <LoginPasswordField value={formData.password} onChange={handleChange} />
          {error && <div style={errorStyle}>{error}</div>}
          <LoginButtons />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
