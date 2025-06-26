// src/components/Auth/login/loginForm/LoginButtons.js
import React from 'react';

const LoginButtons = ({ handleSubmit, handleGoogleSignIn }) => (
  <div>
    <button type="submit" className="neon-button">Login</button>
    <button type="button" onClick={handleGoogleSignIn} className="neon-button google-btn">
      Sign in with Google
    </button>
  </div>
);

export default LoginButtons;