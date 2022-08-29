import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { authentication, db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import useFirebaseAuth from "../firebase/config/UseAuth";
import FillUsersData from "./FillUsersData";
import Routes from "../utils/Routes";
import { User } from "../types/User";
import {
  HomeIcon,
  HandThumbUpIcon,
  FaceSmileIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

type UserData = {
  id: string;
  data: any;
};

const SideNav = () => {
  const { user } = useFirebaseAuth();
  const uid = user?.uid;
  const router = useRouter();
  const photo: string = user?.photoURL ? user?.photoURL : "/noPhoto.png";

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
    const document = doc(db, "users", `${uid}`);
    const unsubscribe = onSnapshot(document, (data: UserData) => {
      const filledData = FillUsersData(data);
      setDefaultValues({ ...filledData });
    });
    return () => unsubscribe();
  }, [uid]);

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
    <div className="w-15 h-screen shadow-md bg-gray fixed ">
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
