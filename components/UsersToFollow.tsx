import React, { useEffect, useState } from "react";
import { getUsersToFollow } from "../firebase/data/users";
import useFirebaseAuth from "../firebase/config/UseAuth";
import Image from "next/image";

const UsersToFollow = () => {
  const { user } = useFirebaseAuth();
  const uid = user?.uid;
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getUsersToFollow(uid);
      setUsersData(data);
    };
    getUsers();
  }, [usersData]);
  return (
    <div className="flex flex-col">
      <p className="text-18 text-blue font-bold pb-12">Follow others</p>
      {usersData.map((users: any) => (
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
              <p>{users.firstName + " " + users.lastName}</p>
              <p className="text-gray2">{users.username}</p>
            </div>
            <button className="w-auto border-1 border-gray4 text-blue2 text-14 px-8 rounded-full">
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersToFollow;
