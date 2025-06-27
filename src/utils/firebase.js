// src/utils/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider
} from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'fake-api-key',
  authDomain: 'localhost',
  projectId: 'syntax-drip-9a166', // Emulator match
};

const app = initializeApp(firebaseConfig);

// ✅ Exporting 'app' as well to fix the import error
export { app };

export const auth     = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db       = getFirestore(app);

if (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9000');
  connectFirestoreEmulator(db, '127.0.0.1', 9001);
}
