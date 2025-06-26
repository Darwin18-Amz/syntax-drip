// src/components/Auth/login/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../AuthLayout';
import LoginForm from './loginForm/LoginForm';
import { handleLogin } from './loginForm/handleLogin';
import { handleGoogleSignIn } from './loginForm/handleGoogleSignIn';

export default function Login() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <LoginForm
        handleLogin={(formData) => handleLogin(formData, navigate)}
        handleGoogleSignIn={() => handleGoogleSignIn(navigate)}
      />
    </AuthLayout>
  );
}