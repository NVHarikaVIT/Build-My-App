// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8TEW_KOIvZyQ1vKm8oO_-lOSWgSgEsLw",
  authDomain: "react-project-fee7f.firebaseapp.com",
  projectId: "react-project-fee7f",
  storageBucket: "react-project-fee7f.appspot.com",
  messagingSenderId: "303143621015",
  appId: "1:303143621015:web:4b6edec3cd9f84d81c34d2",
  measurementId: "G-SH5SRK5QTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage();

// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// export const addSkill = async (userId, skill) => {
//   try {
//     const docRef = await addDoc(collection(db, `users/${userId}/skills`), {
//       ...skill,
//       createdAt: serverTimestamp(),
//     });
//     console.log("Skill added with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding skill: ", e);
//   }
// };
// export const getSkills = async (userId) => {
//   try {
//     const querySnapshot = await getDocs(collection(db, `users/${userId}/skills`));
//     const skills = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     return skills;
//   } catch (e) {
//     console.error("Error getting skills: ", e);
//   }
// };
// export const updateSkill = async (userId, skillId, updatedSkill) => {
//   try {
//     const skillRef = doc(db, `users/${userId}/skills`, skillId);
//     await updateDoc(skillRef, updatedSkill);
//     console.log("Skill updated");
//   } catch (e) {
//     console.error("Error updating skill: ", e);
//   }
// };
// export const deleteSkill = async (userId, skillId) => {
//   try {
//     await deleteDoc(doc(db, `users/${userId}/skills`, skillId));
//     console.log("Skill deleted");
//   } catch (e) {
//     console.error("Error deleting skill: ", e);
//   }
// };