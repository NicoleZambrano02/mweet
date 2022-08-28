import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllMweets } from "../firebase/data/mweet";

type MweetsListProps = {
  userData: any;
};

const MweetsList = ({ userData }: MweetsListProps) => {
  let [mweets, setMweets] = useState([]);

  useEffect(() => {
    const getMweets = async () => {
      const data = await getAllMweets(userData);
      setMweets(data);
    };
    getMweets();
  }, [mweets]);

  return (
    <div className="py-40 w-full">
      {mweets.map((mweetData: any) => (
        <div key={mweetData.key} className="py-20 flex flex-row gap-2 pt-8">
          <div className="w-mweets">
            <Image
              src={mweetData.user.photoURL}
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
