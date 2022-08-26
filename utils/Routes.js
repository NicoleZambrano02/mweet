const publicRoutes = {
  LOGIN: "/login",
};

const privateRoutes = {
  INDEX: "/",
  PROFILE: "/profile",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
