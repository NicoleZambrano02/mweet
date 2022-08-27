export type User = {
  uid: any;
  email: string;
  firstName: string;
  lastName: string;
  username: string | null;
  photoURL: string | null;
  following: Array<any> | null;
};
