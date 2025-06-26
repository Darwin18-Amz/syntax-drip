import React, { useState } from 'react';
import { handleSignup } from './handleSignup';
import '../../style/background.css';
import '../../style/card.css';
import '../../style/input.css';
import '../../style/buttons.css';
import '../../style/links.css';
import '../../style/password.css';
import '../../style/reset.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await handleSignup(username, email, password);
      alert("Signup successful");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container modern-bg">
      <form className="auth-card modern-glass" onSubmit={onSubmit}>
        <h2 className="modern-title">Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          className="auth-input modern-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="auth-input modern-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password field with eye icon */}
        <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            className="auth-password-input modern-input"
            placeholder="Password"
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

        <button type="submit" className="glow-btn modern-btn">Sign Up</button>

        <p className="switch-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
