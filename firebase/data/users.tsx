import { db } from "../config";
import {
  arrayRemove,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

type Data = {
  email: any;
  firstName: string;
  lastName: string;
  photoURL: string | null;
};

export const getUserById = async (id: string) => {
  const document = await getDoc(doc(db, "users", id));
  return !!document.exists();
};

export const setUsers = (id: string, data: Data) => {
  return setDoc(doc(db, "users", id), data);
};

export const updateCurrentUser = (id: string, data: any) => {
  return updateDoc(doc(db, `users`, id), { ...data });
};

export const unfollowUser = (id: string, field: string, removeId: string) => {
  return updateDoc(doc(db, `users`, id), { [field]: arrayRemove(removeId) });
};
