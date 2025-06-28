//import React from 'react';
//import { useNavigate } from 'react-router-dom';
//import AuthLayout from '../AuthLayout';
//import LoginForm from './loginForm/LoginForm';
//import { handleLogin } from './loginForm/handleLogin';
//import { handleGoogleSignIn } from './loginForm/handleGoogleSignIn';
//
//export default function Login() {
//  const navigate = useNavigate();
//
//  return (
//    <AuthLayout>
//      <LoginForm
//        handleLogin={(formData) => handleLogin(formData, navigate)}
//        handleGoogleSignIn={() => handleGoogleSignIn(navigate)}
//      />
//    </AuthLayout>
//  );
//}
//

import React, { useState } from 'react';
import LoginInputs from './loginForm/LoginInputs';
import LoginPasswordField from './loginForm/LoginPasswordField';
import LoginButtons from './loginForm/LoginButtons';

const LoginForm = ({ handleLogin, handleGoogleSignIn }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData, setError); // pass setError to show message
  };

  return (
    <form onSubmit={handleSubmit}>
      <LoginInputs value={formData.username} onChange={handleChange} />
      <LoginPasswordField value={formData.password} onChange={handleChange} />

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem', fontWeight: 500 }}>
          {error}
        </div>
      )}

      <LoginButtons />
    </form>
  );
};

export default LoginForm;

