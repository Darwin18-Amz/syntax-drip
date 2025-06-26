import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../../utils/firebase"; // ✅ update path based on your folder structure

export const handleLogin = async (input, password) => {
  try {
    const isEmail = input.includes("@");
    let emailToUse = input;

    if (!isEmail) {
      // Lookup email using username from Firestore
      const q = query(collection(db, "users"), where("username", "==", input));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        throw new Error("Username not found");
      }

      emailToUse = snapshot.docs[0].data().email;
    }

    // Proceed with login using email
    const userCredential = await signInWithEmailAndPassword(auth, emailToUse, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
};
