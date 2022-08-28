import { signOut } from "firebase/auth";
import { authentication } from "../firebase/config";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useFirebaseAuth from "../firebase/config/UseAuth";
import { useRouter } from "next/router";
import Routes from "../utils/Routes";
import { getCurrentUser } from "../firebase/data/users";
import { User } from "../types/User";
import {
  HomeIcon,
  HandThumbUpIcon,
  FaceSmileIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

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
    getUserData().catch(console.error);
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
    <div className="w-15 h-full shadow-md bg-gray absolute">
      <p className="pt-20 px-20 text-24 text-title font-semibold">mweeter</p>
      <ul>
        <li className="relative mx-5">
          <button
            className="flex flex-row gap-2 w-full items-center text-sm py-4 px-2 h-12 text-gray7 font-semibold rounded-6 focus:bg-gray8 hover:bg-gray8"
            onClick={() => switchOption("HOME")}
          >
            <HomeIcon className="h-5 w-5 text-icons" />
            Home
          </button>
        </li>
        <li className="relative mx-5">
          <button
            className="flex flex-row gap-2 w-full items-center text-sm py-4 px-2 h-12 text-gray7 font-semibold rounded-6 focus:bg-gray8 hover:bg-gray8"
            onClick={() => switchOption("FOLLOWING")}
          >
            <HandThumbUpIcon className="h-5 w-5 text-icons" />
            Following
          </button>
        </li>
        <li className="relative mx-5">
          <button
            className="flex flex-row gap-2 w-full items-center text-sm py-4 px-2 h-12 text-gray7 font-semibold rounded-6 focus:bg-gray8 hover:bg-gray8"
            onClick={() => switchOption("PROFILE")}
          >
            <FaceSmileIcon className="h-5 w-5 text-icons" />
            Profile
          </button>
        </li>
        <li className="relative mx-5">
          <button
            className="flex flex-row gap-2 w-full items-center text-sm py-4 px-2 h-12 text-gray7 font-semibold rounded-6 focus:bg-gray8 hover:bg-gray8"
            onClick={handleLogout}
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 text-icons" />
            Log out
          </button>
        </li>
      </ul>
      <hr className="mx-6 my-divider text-icons" />
      <div className="flex items-center px-20">
        <div className="shrink-0">
          <Image
            src={photo}
            width={30}
            height={30}
            className="rounded-full w-10"
          />
        </div>
        <div className="grow ml-3">
          <p className="text-14 font-semibold text-blue2">
            {defaultValues.firstName + " " + defaultValues.lastName}
          </p>
          <p className="text-12 text-gray2">{defaultValues.username}</p>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
