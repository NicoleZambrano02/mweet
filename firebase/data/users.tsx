import { onValue, ref, set, update } from "firebase/database";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";

import { db } from "../config";

export const getCurrentUser = async (id: any) => {
  const dbRef: any = doc(db, "users", id);
  const docSnap = await getDoc(dbRef);

  return docSnap.data();
};

export const setUsers = (id: any, data: any) => {
  const dbRef: any = doc(db, "users", id);
  return setDoc(dbRef, data);
};

export const updateCurrentUser = async (id: any, data: any) => {
  // return update(ref(db, `/users/` + id), { ...data });
};
