import React, { useEffect, useState } from "react";
import { updateCurrentUser } from "../firebase/data/users";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../firebase/config";
import { collection, onSnapshot, query } from "firebase/firestore";

type UsersToFollowProps = {
  userData: any;
};

const UsersToFollow = ({ userData }: UsersToFollowProps) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading]: any = useState([]);

  useEffect(() => {
    const document = query(collection(db, "users"));
    let data: any = [];
    onSnapshot(document, (querySnapshot) => {
      data = [];
      querySnapshot.forEach((user: any) => {
        if (userData.uid !== user.id) {
          const followedBy = user.data().followedBy
            ? user.data().followedBy
            : null;
          if (followedBy) {
            if (followedBy.indexOf(userData.uid) === -1) {
              data.push({
                key: user.id,
                firstName: user.data().firstName,
                lastName: user.data().lastName,
                username: user.data().username ? user.data().username : null,
                photoURL: user.data().photoURL
                  ? user.data().photoURL
                  : "/noPhoto.png",
                followedBy: user.data().followedBy
                  ? user.data().followedBy
                  : null,
              });
            }
          } else {
            data.push({
              key: user.id,
              firstName: user.data().firstName,
              lastName: user.data().lastName,
              username: user.data().username ? user.data().username : null,
              photoURL: user.data().photoURL
                ? user.data().photoURL
                : "/noPhoto.png",
            });
          }
        }
      });
      setUsersData(data);
    });
  }, [userData.uid]);

  const follow = async (id: string, followedBy: any) => {
    loading[id] = true;
    try {
      const following = {
        following: userData.following ? [...userData.following, id] : [id],
      };
      await updateCurrentUser(userData.uid, following);
      const followedByToSend = {
        followedBy: followedBy ? [...followedBy, userData.uid] : [userData.uid],
      };
      await updateCurrentUser(id, followedByToSend);
      toast.success("User followed!");
    } catch (e) {
      toast.error("An error has occured. Try again");
    } finally {
      setLoading([]);
    }
  };

  return (
    <div className="flex flex-col">
      <p className="text-18 text-blue font-bold pb-12">Follow others</p>
      {usersData.length > 0 ? (
        usersData.map((user: any) => (
          <div key={user.key}>
            <hr className="text-gray5 my-4" />
            <div className=" flex flex-row items-center gap-2">
              <div className="pr-2 w-20">
                <Image
                  src={user.photoURL}
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              </div>
              <div className="text-14 flex flex-col w-50">
                <p className="font-semibold">
                  {user.firstName + " " + user.lastName}
                </p>
                <p className="text-gray2">{user.username}</p>
              </div>
              <button
                onClick={() => follow(user.key, user.followedBy)}
                className="w-auto border-1 border-gray4 text-blue2 text-14 px-8 rounded-full flex flex-row font-semibold"
              >
                {loading[user.key] && (
                  <svg
                    className="w-loading text-blue2 animate-spin mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                Follow
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-14 text-gray2 my-4">No new users to follow</p>
      )}
      <Toaster />
    </div>
  );
};

export default UsersToFollow;
