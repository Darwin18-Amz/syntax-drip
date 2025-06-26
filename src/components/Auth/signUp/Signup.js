import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../AuthLayout';
import SignupForm from './signUpForm/SignupForm';

export default function Signup() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="login-card">
        <h2>Signup</h2>
        <SignupForm navigate={navigate} />
        <p className="signup-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </AuthLayout>
  );
}