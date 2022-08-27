import { signOut } from "firebase/auth";
import { authentication } from "../firebase/config";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useFirebaseAuth from "../firebase/config/UseAuth";
import { useRouter } from "next/router";
import Routes from "../utils/Routes";
import { getCurrentUser } from "../firebase/data/users";
import { User } from "../types/User";

const SideNav = () => {
  const { user } = useFirebaseAuth();
  const uid = user?.uid;
  const router = useRouter();
  const photo: any = user?.photoURL ? user?.photoURL : "/noPhoto.png";

  const [defaultValues, setDefaultValues] = useState<User>({
    uid: uid,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    photoURL: "",
    following: [],
  });

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getCurrentUser(uid);
      setDefaultValues({
        uid: uid,
        firstName: userData?.firstName ? userData.firstName : "",
        lastName: userData?.lastName ? userData.lastName : "",
        email: userData?.email,
        username: userData?.username ? userData.username : null,
        photoURL: userData?.photoURL ? userData.photoURL : null,
        following: userData?.following ? userData.following : null,
      });
    };
    getUserData();
  }, [defaultValues]);

  const switchOption = async (value: string) => {
    switch (value) {
      case "FOLLOWING":
        await router.push({
          pathname: Routes.FOLLOWING,
          query: {
            ...defaultValues,
          },
        });
        break;

      case "PROFILE":
        await router.push({
          pathname: Routes.PROFILE,
          query: {
            ...defaultValues,
          },
        });
        break;

      default:
        await router.push(Routes.INDEX);
        break;
    }
  };

  const handleLogout = async () => {
    await signOut(authentication);
  };

  return (
    <div className="w-20 h-full shadow-md bg-gray absolute">
      <ul className="relative px-1">
        <li className="relative">
          <button
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
            onClick={() => switchOption("HOME")}
          >
            <span>Home</span>
          </button>
        </li>
        <li className="relative" id="sidenavSecEx2">
          <button
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => switchOption("FOLLOWING")}
          >
            <span>Following</span>
          </button>
        </li>
        <li className="relative" id="sidenavSecEx2">
          <button
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => switchOption("PROFILE")}
          >
            <span>Profile</span>
          </button>
        </li>
        <li className="relative" id="sidenavSecEx2">
          <button
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
            onClick={handleLogout}
          >
            <span>Log out</span>
          </button>
        </li>
      </ul>
      <hr className="m-4" />
      <div className="pt-4 pb-2 px-6">
        <a>
          <div className="flex items-center">
            <div className="shrink-0">
              <Image
                src={photo}
                width={50}
                height={50}
                className="rounded-full w-10"
              />
            </div>
            <div className="grow ml-3">
              <p className="text-sm font-semibold text-blue-600">
                {defaultValues.firstName + " " + defaultValues.lastName}
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default SideNav;
