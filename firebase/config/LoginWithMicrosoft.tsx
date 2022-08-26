import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "./index";
import { useRouter } from "next/router";
import React from "react";
import Routes from "../../utils/Routes";
import { setUsers } from "../data/users";

const provider = new OAuthProvider("microsoft.com");

const LoginWithMicrosoft = () => {
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(authentication, provider);
      await OAuthProvider.credentialFromResult(result);
      const userLogged = result.user;
      const userDataToSend = {
        name: userLogged.displayName,
        email: userLogged.email,
        photoURL: userLogged.photoURL,
        emailVerified: userLogged.emailVerified,
      };
      await setUsers(userLogged.uid, userDataToSend);
      await router.push(Routes.INDEX);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <>
      <button onClick={handleLogin}> Microsoft </button>
    </>
  );
};
export default LoginWithMicrosoft;
