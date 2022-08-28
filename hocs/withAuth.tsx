import { useRouter } from "next/router";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Routes from "../utils/Routes";
import useFirebaseAuth from "../firebase/config/UseAuth";

type WithAuthProps = {
  children: any;
  mustHaveAuth: any;
};

const WithAuth = ({ children, mustHaveAuth }: WithAuthProps) => {
  const { user, loading } = useFirebaseAuth();
  const hasAuth = !!user;
  const router = useRouter();
  const shouldShowPage = mustHaveAuth === hasAuth;

  useEffect(() => {
    if (loading) return;
    if (!shouldShowPage) {
      if (mustHaveAuth && !user) {
        router.replace(Routes.LOGIN);
      } else if (!mustHaveAuth && user) {
        router.replace(Routes.INDEX);
      }
    }
  }, [children, hasAuth, loading, router, mustHaveAuth, shouldShowPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!shouldShowPage) {
    return <div>Redirecting...</div>;
  }

  return children;
};

WithAuth.propTypes = {
  children: PropTypes.element,
  mustHaveAuth: PropTypes.bool,
};

export default WithAuth;
