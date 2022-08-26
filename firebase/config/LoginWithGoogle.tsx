import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "./index";
import { useRouter } from "next/router";
import React from "react";
import Routes from "../../utils/Routes";
import { setUsers } from "../data/users";
const provider = new GoogleAuthProvider();

const LoginWithGoogleUser = () => {
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(authentication, provider);
      await GoogleAuthProvider.credentialFromResult(result);
      const userLogged = result.user;
      const fullName = userLogged.displayName?.split(" ");
      const userDataToSend = {
        firstName: fullName![0],
        lastName: fullName![1],
        email: userLogged.email,
        photoURL: userLogged?.photoURL,
        emailVerified: userLogged?.emailVerified,
      };
      await setUsers(userLogged.uid, userDataToSend);
      console.log("user", userLogged);
      await router.push(Routes.INDEX);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <>
      <button onClick={handleLogin}> Google </button>
    </>
  );
};
export default LoginWithGoogleUser;
