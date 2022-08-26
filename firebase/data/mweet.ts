import { onValue, ref, push, update } from "firebase/database";
import { db } from "../config";
import moment from "moment";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getMweets = async (id: any) => {
  const users: any = ref(db, `/mweets/` + id);
  let data: any;
  onValue(users, (snapshot) => {
    data = snapshot.val();
  });
  return data;
};

export const getAllMweets = async () => {
  const dbRef: any = doc(db, "mweets");
  const docSnap = await getDoc(dbRef);
  const data: any = [];
  docSnap.forEach((mweet) => {
    data.push({
      key: mweet.key,
      createdAt: moment(mweet.val().createdAt).format("MMM DD, YYYY"),
      message: mweet.val().message,
      user: mweet.val().user,
    });
  });
  return data;
};

export const setMweet = async (data: any) => {
  const dbRef: any = doc(db, "mweets");
  return setDoc(dbRef, data);
};
