import React, { useState } from "react";
import { auth, provider, db } from "../../utils/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./auth.css";

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const resolveEmail = async (input) => {
    if (input.includes("@")) return input;

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", input));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return snapshot.docs[0].data().email;
    } else {
      throw new Error("Username not found");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resolvedEmail = await resolveEmail(emailOrUsername);
      await signInWithEmailAndPassword(auth, resolvedEmail, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      const resolvedEmail = await resolveEmail(emailOrUsername);
      await sendPasswordResetEmail(auth, resolvedEmail);
      alert("Password reset email sent.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="background-animation" />
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#ccc"
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="neon-button" type="submit">Login</button>
          <button className="neon-button" onClick={handleGoogleSignIn} type="button">
            Sign in with Google
          </button>
          <button className="text-link" type="button" onClick={handleResetPassword}>
            Forgot Password?
          </button>
        </form>
        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}