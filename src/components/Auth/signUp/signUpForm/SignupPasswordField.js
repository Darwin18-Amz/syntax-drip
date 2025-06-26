import React, { useState } from 'react';
import '../../style/password.css';

const SignupPasswordField = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? '🙈' : '👁️'}
      </span>
    </div>
  );
};

export default SignupPasswordField;
