import React from "react";
import LoginWithGoogleUser from "../firebase/config/LoginWithGoogle";
import LoginWithMicrosoft from "../firebase/config/LoginWithMicrosoft";
import Image from "next/image";
const Login = () => {
  return (
    <div className="grid place-items-center h-screen w-full">
      <div className="text-center">
        <Image src="/logos/twitter.png" width={48} height={48} />
        <p className="font-bold text-24 pt-8">mweeter</p>
        <div className="flex flex-row gap-4 pt-25">
          <LoginWithGoogleUser />
          <LoginWithMicrosoft />
        </div>
      </div>
    </div>
  );
};

Login.mustHaveAuth = false;

export default Login;
