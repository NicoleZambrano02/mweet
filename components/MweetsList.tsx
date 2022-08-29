import React, { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import { db } from "../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { User } from "../types/User";

type MweetsListProps = {
  userData: User;
};

type MweetsData = {
  key: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    username: string | null;
    photoURL: string | null;
  };
  message: string;
};

const MweetsList = ({ userData }: MweetsListProps) => {
  let [mweets, setMweets] = useState<MweetsData[]>([]);

  useEffect(() => {
    const document = query(
      collection(db, "mweets"),
      orderBy("createdAt", "desc")
    );
    let data: MweetsData[];
    const unsubscribe = onSnapshot(document, (querySnapshot) => {
      data = [];
      querySnapshot.forEach((mweet) => {
        const following = userData.following
          ? Array.from(userData.following)
          : null;
        if (
          mweet.data().user.uid === userData.uid ||
          (following && following.indexOf(mweet.data().user.uid) > -1)
        ) {
          data.push({
            key: mweet.id,
            createdAt: moment(mweet.data().createdAt).format("MMM DD, YYYY"),
            user: {
              firstName: mweet.data().user.firstName,
              lastName: mweet.data().user.lastName,
              username: mweet.data().user.username
                ? mweet.data().user.username
                : null,
              photoURL: mweet.data().user.photoURL
                ? mweet.data().user.photoURL
                : "/noPhoto.png",
            },
            message: mweet.data().message,
          });
        }
      });
      setMweets(data);
    });
    return () => unsubscribe();
  }, [userData.uid, userData.following]);

  return (
    <div className="py-40 w-full">
      {mweets.map((mweetData: MweetsData) => (
        <div key={mweetData.key} className="py-20 flex flex-row gap-2 pt-8">
          <div className="w-mweets">
            <Image
              src={mweetData.user.photoURL!}
              width={35}
              height={35}
              className="rounded-full"
            />
          </div>
          <div className="text-14 w-95">
            <div className="flex flex-row gap-2">
              <p className="text-blue3 font-semibold">
                {mweetData.user.firstName + " " + mweetData.user.lastName}
              </p>
              <p className="text-gray2">{mweetData.user.username}</p>
              <li className="text-gray2">{mweetData.createdAt}</li>
            </div>
            <p className="text-gray2">{mweetData.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MweetsList;
