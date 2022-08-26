import { onValue, push, ref, set } from "firebase/database";
import { db } from "../config";
import moment from "moment";

export const getMweets = async (id: any) => {
  const mweets: any = ref(db, `/mweets/` + id);
  let data: any;
  onValue(mweets, (snapshot) => {
    data = snapshot.val();
  });
  return data;
};

export const getAllMweets = async () => {
  const mweets: any = ref(db, `/mweets/`);
  let data: any = [];
  onValue(mweets, (snapshot) => {
    snapshot.forEach((mweet) => {
      data.push({
        key: mweet.key,
        createdAt: moment(mweet.val().createdAt).format("MMM DD, YYYY"),
        user: mweet.val().user,
        message: mweet.val().message,
      });
    });
  });
  return data;
};

export const setMweet = async (data: any) => {
  return push(ref(db, `/mweets/`), { ...data });
};
