import { onValue, ref, set, update } from "firebase/database";

import { db } from "../config";

export const getCurrentUser = async (id: any) => {
  const users: any = ref(db, `/users/` + id);
  let data: any;
  onValue(users, (snapshot) => {
    data = snapshot.val();
  });
  return data;
};

export const setUsers = (id: any, data: object) => {
  return set(ref(db, `/users/` + id), { ...data });
};

export const updateCurrentUser = async (id: any, data: any) => {
  return update(ref(db, `/users/` + id), { ...data });
};
