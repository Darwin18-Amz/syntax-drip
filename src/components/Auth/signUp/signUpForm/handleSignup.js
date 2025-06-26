import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../../utils/firebase"; // ✅ update path based on your folder structure

export const handleSignup = async (username, email, password) => {
  try {
    // Step 1: Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 2: Save the username and email in Firestore under the user’s UID
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      createdAt: serverTimestamp(),
    });

    return user;
  } catch (error) {
    throw error;
  }
};
