const publicRoutes = {
  LOGIN: "/login",
};

const privateRoutes = {
  INDEX: "/",
  PROFILE: "/profile",
  FOLLOWING: "/following",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
