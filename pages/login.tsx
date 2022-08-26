import React from "react";
import LoginWithGoogleUser from "../firebase/config/LoginWithGoogle";
import LoginWithMicrosoft from "../firebase/config/LoginWithMicrosoft";

const Login = () => {
  return (
    <div className="text-center">
      <div>
        <LoginWithGoogleUser />
      </div>
      <div>
        <LoginWithMicrosoft />
      </div>
    </div>
  );
};

Login.mustHaveAuth = false;

export default Login;
