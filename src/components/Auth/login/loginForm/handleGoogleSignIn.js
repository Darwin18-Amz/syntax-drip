// src/components/Auth/login/loginForm/handleGoogleSignIn.js
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../../utils/firebase';

export const handleGoogleSignIn = async (navigate) => {
  await signInWithPopup(auth, provider);
  navigate('/dashboard');
};