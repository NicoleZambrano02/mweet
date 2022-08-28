import React, { useEffect, useState } from "react";
import { getUsersToFollow, updateCurrentUser } from "../firebase/data/users";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

type UsersToFollowProps = {
  userData: any;
};

const UsersToFollow = ({ userData }: UsersToFollowProps) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      let usersToFollow: any;
      usersToFollow = await getUsersToFollow(userData.uid);
      setUsersData(usersToFollow);
    };
    getUsers().catch(console.error);
  }, [userData.uid, usersData]);

  const follow = async (id: string, followedBy: any) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <p className="text-18 text-blue font-bold pb-12">Follow others</p>
      {usersData.length > 0 ? (
        usersData.map((users: any) => (
          <div key={users.key}>
            <hr className="text-gray5 my-4" />
            <div className=" flex flex-row items-center gap-2">
              <div className="pr-2 w-20">
                <Image
                  src={users.photoURL}
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              </div>
              <div className="text-14 flex flex-col w-50">
                <p className="font-semibold">
                  {users.firstName + " " + users.lastName}
                </p>
                <p className="text-gray2">{users.username}</p>
              </div>
              <button
                onClick={() => follow(users.key, users.followedBy)}
                className="w-auto border-1 border-gray4 text-blue2 text-14 px-8 rounded-full flex flex-row"
              >
                {loading && (
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
