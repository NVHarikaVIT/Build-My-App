import { db } from "../config/firebase";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp
} from 'firebase/firestore';

export const addSkill = async (userId, skill) => {
    try {
      const docRef = await addDoc(collection(db, `users/${userId}/skills`), {
        ...skill,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log("Skill added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding skill: ", e);
    }
};
export const getSkills = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/skills`));
      const skills = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return skills;
    } catch (e) {
      console.error("Error getting skills: ", e);
    }
};
export const updateSkill = async (userId, skillId, updatedSkill) => {
    try {
      const skillRef = doc(db, `users/${userId}/skills`, skillId);
      await updateDoc(skillRef, updatedSkill);
      console.log("Skill updated");
    } catch (e) {
      console.error("Error updating skill: ", e);
    }
};
export const deleteSkill = async (userId, skillId) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/skills`, skillId));
      console.log("Skill deleted");
    } catch (e) {
      console.error("Error deleting skill: ", e);
    }
};

export const addExperience = async(userId, experience) => {
  try {
    const expDocRef = await addDoc(collection(db, `users/${userId}/experience`), {
      ...experience,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log("Experience added with ID: ", expDocRef.id);
  } catch (e) {
    console.error("Error adding data: ", e);
  }
};
export const getExperience = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/experience`));
      const experience = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return experience;
    } catch (e) {
      console.error("Error : ", e);
    }
};
export const updateExperience = async (userId, experienceId, updatedExperience) => {
    try {
      const experienceRef = doc(db, `users/${userId}/experience`, experienceId);
      await updateDoc(experienceRef, updatedExperience);
      console.log("experience updated");
    } catch (e) {
      console.error("Error: ", e);
    }
};
export const deleteExperience = async (userId, experienceId) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/experience`, experienceId));
      console.log("experience deleted");
    } catch (e) {
      console.error("Error: ", e);
    }
};

export const addEducation = async(userId, education) => {
  try {
    const eduDocRef = await addDoc(collection(db, `users/${userId}/education`), {
      ...education,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log("Education added with ID: ", eduDocRef.id);
  } catch (e) {
    console.error("Error adding data: ", e);
  }
};
export const getEducation = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/education`));
      const education = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return education;
    } catch (e) {
      console.error("Error: ", e);
    }
};
export const updateEducation = async (userId, educationId, updatedEducation) => {
    try {
      const eduRef = doc(db, `users/${userId}/education`, educationId);
      await updateDoc(eduRef, updatedEducation);
      console.log("Skill updated");
    } catch (e) {
      console.error("Error updating skill: ", e);
    }
};
export const deleteEducation = async (userId, educationId) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/education`, educationId));
      console.log("Education deleted");
    } catch (e) {
      console.error("Error: ", e);
    }
};

export const addProject = async(userId, project) => {
  try {
    const projDocRef = await addDoc(collection(db, `users/${userId}/project`), {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log("Project added with ID: ", projDocRef.id);
  } catch (e) {
    console.error("Error adding data: ", e);
  }
};
export const getProject = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/project`));
      const project = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return project;
    } catch (e) {
      console.error("Error getting skills: ", e);
    }
};
export const updateProject = async (userId, projectId, updatedProject) => {
    try {
      const projRef = doc(db, `users/${userId}/project`, projectId);
      await updateDoc(projRef, updatedProject);
      console.log("Skill updated");
    } catch (e) {
      console.error("Error updating skill: ", e);
    }
};
export const deleteProject = async (userId, projectId) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/project`, projectId));
      console.log("project deleted");
    } catch (e) {
      console.error("Error: ", e);
    }
};

export const addCourse = async(userId, course) => {
  try {
    const courseDocRef = await addDoc(collection(db, `users/${userId}/courses`), {
      ...course,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }); 
    console.log(courseDocRef.id+" is added to the user's profile");
  } catch (err) {
    console.error(err);
  }
};
export const getCourse = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/courses`));
      const courses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return courses;
    } catch (e) {
      console.error("Error: ", e);
    }
};
export const updateCourse = async (userId, courseId, updatedCourse) => {
    try {
      const courseRef = doc(db, `users/${userId}/courses`, courseId);
      await updateDoc(courseRef, updatedCourse);
      console.log("course updated");
    } catch (e) {
      console.error("Error: ", e);
    }
};
export const deleteCourse = async (userId, courseId) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/courses`, courseId));
      console.log("course deleted");
    } catch (e) {
      console.error("Error: ", e);
    }
};