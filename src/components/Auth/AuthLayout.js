// src/components/Auth/AuthLayout.js
import React from 'react';
import './style/reset.css';
import './style/background.css';
import './style/card.css';
import './style/input.css';
import './style/buttons.css';
import './style/links.css';

export default function AuthLayout({ children }) {
  return (
    <div className="login-wrapper">
      <div className="background-animation" />
      {children}
    </div>
  );
}