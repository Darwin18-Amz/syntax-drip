import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from './handleLogin';

import '../../style/background.css';
import '../../style/card.css';
import '../../style/input.css';
import '../../style/buttons.css';
import '../../style/links.css';
import '../../style/password.css';
import '../../style/reset.css';

const LoginForm = () => {
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ✅ React Router hook

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await handleLogin(input, password);
      alert('Login successful');
      navigate('/dashboard'); // ✅ Redirect to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container modern-bg">
      <form className="auth-card modern-glass" onSubmit={onSubmit}>
        <h2 className="modern-title">Welcome Back</h2>

        <input
          type="text"
          placeholder="Username or Email"
          className="auth-input modern-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="auth-password-input modern-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

        <button type="submit" className="glow-btn modern-btn">Login</button>

        <p className="switch-text">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
