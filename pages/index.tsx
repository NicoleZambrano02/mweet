import React, { useEffect, useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import FillUsersData from "../components/FillUsersData";
import MweetsList from "../components/MweetsList";
import UsersToFollow from "../components/UsersToFollow";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { setMweet } from "../firebase/data/mweet";
import useFirebaseAuth from "../firebase/config/UseAuth";
import { User } from "../types/User";
import { Mweets } from "../types/Mweets";

type MweetValues = {
  message: string;
};

type UserData = {
  id: string;
  data: any;
};

const Index = () => {
  const { user } = useFirebaseAuth();
  const uid = user?.uid;
  const photo: string = user?.photoURL ? user?.photoURL : "/noPhoto.png";

  const [userData, setUserData] = useState<User>({
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
      setUserData({ ...filledData });
    });
    return () => unsubscribe();
  }, [uid]);

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<MweetValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSendMweet = async (values: MweetValues) => {
    setLoading(true);
    const dataToSend: Mweets = {
      message: values.message,
      user: {
        uid: userData.uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        photoURL: userData.photoURL,
      },
      createdAt: new Date().getTime(),
    };
    try {
      await setMweet(dataToSend);
      toast.success("Mweet published!");
      reset();
    } catch (e) {
      toast.error("An error has ocurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-40 w-full flex flex-row gap-40 ml-20">
      <div className="w-50">
        <p className="font-bold text-24 text-blue">Your Feed</p>
        <form onSubmit={handleSubmit(onSendMweet)}>
          <div className="py-2 flex flex-row pt-8">
            <div className="pr-2">
              <Image
                src={photo}
                width={35}
                height={35}
                className="rounded-full"
              />
            </div>
            <textarea
              placeholder="What´s on your mind..."
              maxLength={280}
              required
              className="block text-14 p-4 w-full text-black rounded-lg border-2 border-gray font-inter"
              {...register("message")}
            />
          </div>
          <div className="flex justify-end text-right pt-18 ">
            <button
              className=" bg-button rounded-6 text-center text-white py-buttonPY w-button text-14 flex flex-row justify-center items-center"
              type="submit"
            >
              {loading && (
                <svg
                  className="w-loading text-white animate-spin mr-2"
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
              Send mweet
            </button>
          </div>
        </form>
        <MweetsList userData={userData} />
      </div>
      <UsersToFollow userData={userData} />
      <Toaster />
    </div>
  );
};

Index.mustHaveAuth = true;

export default Index;
