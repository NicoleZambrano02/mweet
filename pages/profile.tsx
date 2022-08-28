import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateCurrentUser } from "../firebase/data/users";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

type FormData = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

const Profile = () => {
  const router = useRouter();
  const defaultValues = router.query;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    const dataToSend = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username ? values.username : null,
    };

    try {
      await updateCurrentUser(values.uid, dataToSend);
      toast.success("User updated!");
    } catch (e) {
      toast.error("An error has ocurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-40 w-full ml-25">
      <div className="w-40">
        <p className="font-bold text-24 text-blue">Your Profile</p>
        <form className="pt-30" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col">
              <label className="text-14 text-blue2 font-semibold">
                First name
              </label>
              <input
                type="text"
                className="text-14 text-gray2 border-1 border-gray4 rounded-6 py-9 px-13"
                required
                {...register("firstName")}
              />
              {errors.firstName && <span>This field is required</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-14 text-blue2 font-semibold">
                Last name
              </label>
              <input
                type="text"
                className="text-14 text-gray2 border-1 border-gray4 rounded-6 py-9 px-13"
                required
                {...register("lastName")}
              />
            </div>
          </div>
          <div className="flex flex-col pt-24">
            <label className="text-14 text-blue2 font-semibold">
              Your handle (username)
            </label>
            <input
              type="text"
              className="text-14 text-gray2 border-1 border-gray4 rounded-6 py-9 px-13"
              {...register("username")}
            />
          </div>
          <div className="flex flex-col pt-24">
            <label className="text-14 text-blue2 font-semibold">
              Email address
            </label>
            <input
              type="email"
              className="text-14 text-gray2 border-1 border-gray4 bg-gray6 rounded-6 py-9 px-13"
              required
              disabled
              {...register("email")}
            />
          </div>
          <div className="pt-30">
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
      </div>
      <Toaster />
    </div>
  );
};

Profile.mustHaveAuth = true;

export default Profile;
