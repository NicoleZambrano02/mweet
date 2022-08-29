import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "./index";
import { useRouter } from "next/router";
import Routes from "../../utils/Routes";
import Image from "next/image";
import { getUserById, setUsers } from "../data/users";
const provider = new GoogleAuthProvider();

const LoginWithGoogleUser = () => {
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(authentication, provider);
      await GoogleAuthProvider.credentialFromResult(result);
      const userLogged = result.user;
      const userRegistered = await getUserById(userLogged.uid);
      if (!userRegistered) {
        const fullName = userLogged.displayName?.split(" ");
        const userDataToSend = {
          firstName: fullName![0],
          lastName: fullName![1],
          email: userLogged.email,
          photoURL: userLogged?.photoURL ? userLogged?.photoURL : null,
        };
        await setUsers(userLogged.uid, userDataToSend);
      }
      await router.push(Routes.INDEX);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      className="border-1 border-gray4 rounded-6 text-center items-center py-buttonPY text-gray3 text-14 flex flex-row gap-2"
      onClick={handleLogin}
    >
      <Image src="/logos/google.png" width={20} height={20} />
      Sign In with Google
    </button>
  );
};
export default LoginWithGoogleUser;
