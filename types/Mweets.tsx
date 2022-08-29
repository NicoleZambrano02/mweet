export type Mweets = {
  message: string;
  createdAt: any;
  user: {
    uid: string;
    firstName: string;
    lastName: string;
    username: string | null;
    photoURL: string | null;
  };
};
