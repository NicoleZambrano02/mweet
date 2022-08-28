import React, { useEffect, useState } from "react";
import { getFollowedUsers, updateCurrentUser } from "../firebase/data/users";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const Following = () => {
  const router = useRouter();
  const defaultValues = router.query;

  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getFollowedUsers(defaultValues.uid);
      setUsersData(data);
    };
    getUsers().catch(console.error);
  }, [defaultValues.uid, usersData]);

  const removeItemOnce = (arr: any, value: any) => {
    let index = arr.indexOf(value);
    if (index > -1) {
      if (typeof arr !== "string") {
        arr.splice(index, 1);
      }
    }
    return arr;
  };

  const unfollow = async (id: any, followedBy: any) => {
    setLoading(true);
    try {
      const usersFollowed = defaultValues.following;
      const removedUserFollowed = await removeItemOnce(usersFollowed, id);
      const followingToSend = {
        following: removedUserFollowed,
      };
      await updateCurrentUser(defaultValues.uid, followingToSend);
      const removedFollowedBy = await removeItemOnce(
        followedBy,
        defaultValues.uid
      );
      const followedByToSend = { followedBy: removedFollowedBy };
      await updateCurrentUser(id, followedByToSend);
      toast.success("User unfollowed!");
    } catch (e) {
      toast.error("An error has occured. Try again");
      console.log("ada", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-40 w-40 ml-25">
      <p className="font-bold text-24 text-blue">People you follow</p>
      <div className="flex flex-row">
        {usersData.length > 0 ? (
          usersData.map((users: any) => (
            <div key={users.key} className="w-50">
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
                <div className="text-14 flex flex-col w-65">
                  <p className="font-semibold">
                    {users.firstName + " " + users.lastName}
                  </p>
                  <p className="text-gray2">{users.username}</p>
                </div>
                <button
                  onClick={() => unfollow(users.key, users.followedBy)}
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
                  Unfollow
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-14 text-gray2 my-4">No followed users</p>
        )}
      </div>
      <Toaster />
    </div>
  );
};

Following.mustHaveAuth = true;

export default Following;
