import React, { useState } from 'react';
import { auth, db } from '../../utils/firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './auth.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCred.user, { displayName: username });

      await setDoc(doc(db, 'users', userCred.user.uid), {
        username: username,
        email: email,
      });

      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="background-animation" />
      <div className="login-card">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div style={{ position: 'relative' }}>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: '40px' }}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#ccc'
              }}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="neon-button">Create Account</button>
        </form>
        <p className="signup-link">Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}