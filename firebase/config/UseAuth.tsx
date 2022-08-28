import { useRouter } from "next/router";
import auth, { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { authentication } from "./index";
import Routes from "../../utils/Routes";

const useFirebaseAuth = () => {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<auth.User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await signOut(authentication);
    await router.push(Routes.LOGIN);
  };

  const authStateChangeHandler = async (authState: any) => {
    if (!authState) {
      await router.push("/login");
      setAuthUser(null);
      setLoading(false);
    } else {
      await router.push("/");
      setAuthUser(authState);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(
      authStateChangeHandler
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user: authUser,
    loading: loading,
    logout: handleLogout,
  };
};

export default useFirebaseAuth;
