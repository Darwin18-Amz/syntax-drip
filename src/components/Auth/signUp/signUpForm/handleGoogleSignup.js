import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../../utils/firebase';

export const handleGoogleSignup = async (navigate) => {
  await signInWithPopup(auth, provider);
  navigate('/dashboard');
};