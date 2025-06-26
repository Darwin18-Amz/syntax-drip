// src/components/Auth/login/loginForm/handleResetPassword.js
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../utils/firebase';
import { resolveEmail } from './resolveEmail';

const handleResetPassword = async (email) => {
  try {
    const resolvedEmail = await resolveEmail(email);
    await sendPasswordResetEmail(auth, resolvedEmail);
    alert('Password reset link sent to your email');
  } catch (error) {
    alert(error.message);
  }
};

export default handleResetPassword;