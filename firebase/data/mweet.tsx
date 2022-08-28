import { onValue, push, ref } from "firebase/database";
import { db } from "../config";
import moment from "moment";

export const getAllMweets = async (userData: any) => {
  const mweets: any = ref(db, `/mweets/`);
  let data: any = [];
  onValue(mweets, (snapshot) => {
    data = [];
    const following = userData.following
      ? Array.from(userData.following)
      : null;
    snapshot.forEach((mweet) => {
      if (
        mweet.val().user.uid === userData.uid ||
        (following && following.indexOf(mweet.val().user.uid) > -1)
      ) {
        data.push({
          key: mweet.key,
          createdAt: moment(mweet.val().createdAt).format("MMM DD, YYYY"),
          user: {
            firstName: mweet.val().user.firstName,
            lastName: mweet.val().user.lastName,
            username: mweet.val().user.username
              ? mweet.val().user.username
              : null,
            photoURL: mweet.val().user.photoURL
              ? mweet.val().user.photoURL
              : "/noPhoto.png",
          },
          message: mweet.val().message,
        });
      }
    });
  });
  return data;
};

export const setMweet = async (data: any) => {
  return push(ref(db, `/mweets/`), { ...data });
};
