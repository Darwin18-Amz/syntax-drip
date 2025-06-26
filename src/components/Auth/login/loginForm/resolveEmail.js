// src/components/Auth/login/loginForm/resolveEmail.js
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';

export const resolveEmail = async (input) => {
  if (input.includes('@')) return input;

  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', input));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    return snapshot.docs[0].data().email;
  } else {
    throw new Error('Username not found');
  }
};