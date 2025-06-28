import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../AuthLayout';
import LoginForm from './loginForm/LoginForm';
import { handleLogin } from './loginForm/handleLogin';

export default function Login() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <LoginForm handleLogin={(formData, setError) => handleLogin(formData, navigate, setError)} />
    </AuthLayout>
  );
}
