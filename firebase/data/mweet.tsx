import { db } from "../config";
import { collection, addDoc } from "firebase/firestore";
import { Mweets } from "../../types/Mweets";

export const setMweet = async (data: Mweets) => {
  return addDoc(collection(db, `mweets`), { ...data });
};
