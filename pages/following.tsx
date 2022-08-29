import React, { useEffect, useState } from "react";
import { unfollowUser } from "../firebase/data/users";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/config";

type Users = {
  key: string;
  firstName: string;
  lastName: string;
  username: string | null;
  photoURL: string | null;
};

type UserData = {
  id: string;
  data: any;
};

const Following = () => {
  const router = useRouter();
  const defaultValues = router.query;
  const uid = defaultValues.uid!.toString();

  const [usersData, setUsersData] = useState<Users[]>([]);
  const [loading, setLoading]: Array<any> = useState([]);

  useEffect(() => {
    const document = query(collection(db, "users"));
    let data: Users[];
    const unsubscribe = onSnapshot(document, (querySnapshot) => {
      data = [];
      querySnapshot.forEach((user: UserData) => {
        if (defaultValues.uid !== user.id) {
          const followedBy = user.data().followedBy
            ? user.data().followedBy
            : null;
          if (followedBy && followedBy.indexOf(defaultValues.uid) > -1) {
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
    return () => unsubscribe();
  }, [defaultValues.uid]);

  const unfollow = async (id: string) => {
    loading[id] = true;
    try {
      await unfollowUser(uid, "following", id);
      await unfollowUser(id, "followedBy", uid);
      toast.success("User unfollowed!");
    } catch (e) {
      toast.error("An error has occured. Try again");
    } finally {
      setLoading([]);
    }
  };

  return (
    <div className="py-40 w-40 ml-20">
      <p className="font-bold text-24 text-blue">People you follow</p>
      <div className="grid grid-cols-2 gap-8 mt-4">
        {usersData.length > 0 ? (
          usersData.map((users: Users) => (
            <div key={users.key}>
              <hr className="text-gray5 mb-4" />
              <div className=" flex flex-row items-center gap-2">
                <div className="pr-2 w-20">
                  <Image
                    src={users.photoURL!}
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
                  onClick={() => unfollow(users.key)}
                  className="w-auto border-1 border-gray4 text-blue2 text-14 px-8 rounded-full flex flex-row font-semibold"
                >
                  {loading[users.key] && (
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
