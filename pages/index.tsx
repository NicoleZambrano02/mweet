import React, { useEffect, useState } from "react";
import useFirebaseAuth from "../firebase/config/UseAuth";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { setMweet } from "../firebase/data/mweet";
import MweetsList from "../components/MweetsList";
import { getCurrentUser } from "../firebase/data/users";
import UsersToFollow from "../components/UsersToFollow";

const Index = () => {
  const { user } = useFirebaseAuth();
  const uid = user?.uid;
  const photo = user ? user.photoURL! : "/vercel.svg";

  const [userData, setUserData] = useState({
    uid: uid,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    photoURL: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      const data: any = await getCurrentUser(uid);
      setUserData({
        uid: uid,
        ...data,
      });
    };
    getUserData();
  }, [userData]);

  const [loading, setLoading] = useState(false);

  let mweetValues: any = {
    message: "",
  };

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: mweetValues,
  });

  const onSendMtweet = async (values: any) => {
    setLoading(true);
    const dataToSend = {
      message: values.message,
      user: { ...userData },
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
    <div className="py-40 w-full flex flex-row gap-40">
      <div className="w-50">
        <form onSubmit={handleSubmit(onSendMtweet)}>
          <p className="font-bold text-24">Your Feed</p>
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
              className="block text-14 p-4 w-full text-black rounded-lg border-2 border-gray"
              {...register("message")}
            />
          </div>
          <div className="justify-self-end text-right pt-18">
            <button
              className="bg-button rounded-6 text-center text-white py-buttonPY w-button text-14 flex flex-row justify-center items-center"
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
              Update info
            </button>
          </div>
        </form>
        <MweetsList />
      </div>
      <UsersToFollow />
      <Toaster />
    </div>
  );
};

Index.mustHaveAuth = true;

export default Index;
