import { onValue, ref, set, update, get } from "firebase/database";
import { db } from "../config";

export const getCurrentUser = async (id: any) => {
  const users: any = ref(db, `/users/` + id);
  let data: any;
  onValue(users, (snapshot) => {
    data = snapshot.val();
  });
  return data;
};

export const setUsers = async (id: any, data: object) => {
  const users: any = ref(db, `/users/` + id);
  const snapshot = await get(users);
  if (!snapshot.exists()) {
    return set(ref(db, `/users/` + id), { ...data });
  }
};

export const updateCurrentUser = async (id: any, data: any) => {
  return update(ref(db, `/users/` + id), { ...data });
};

export const getUsersToFollow = async (id: any) => {
  const users: any = ref(db, `/users/`);
  let data: any = [];
  onValue(users, (snapshot) => {
    data = [];
    snapshot.forEach((user) => {
      if (id !== user.key) {
        const followedBy = user.val().followedBy ? user.val().followedBy : null;
        if (followedBy) {
          if (followedBy.indexOf(id) === -1) {
            data.push({
              key: user.key,
              firstName: user.val().firstName,
              lastName: user.val().lastName,
              username: user.val().username ? user.val().username : null,
              photoURL: user.val().photoURL
                ? user.val().photoURL
                : "/noPhoto.png",
              followedBy: user.val().followedBy ? user.val().followedBy : null,
            });
          }
        } else {
          data.push({
            key: user.key,
            firstName: user.val().firstName,
            lastName: user.val().lastName,
            username: user.val().username ? user.val().username : null,
            photoURL: user.val().photoURL
              ? user.val().photoURL
              : "/noPhoto.png",
          });
        }
      }
    });
  });
  return data;
};

export const getFollowedUsers = async (id: any) => {
  const users: any = ref(db, `/users/`);
  let data: any = [];
  onValue(users, (snapshot) => {
    data = [];
    snapshot.forEach((user) => {
      if (id !== user.key) {
        const followedBy = user.val().followedBy ? user.val().followedBy : null;
        if (followedBy) {
          if (followedBy.indexOf(id) > -1) {
            data.push({
              key: user.key,
              firstName: user.val().firstName,
              lastName: user.val().lastName,
              username: user.val().username ? user.val().username : null,
              photoURL: user.val().photoURL
                ? user.val().photoURL
                : "/noPhoto.png",
              followedBy: user.val().followedBy ? user.val().followedBy : null,
            });
          }
        }
      }
    });
  });
  return data;
};
