import React from "react";

type UserData = {
  id: string;
  data: any;
};

const FillUsersData = (data: UserData) => {
  return (
    data.data() && {
      uid: data.id,
      firstName: data.data().firstName ? data.data().firstName : "",
      lastName: data.data().lastName ? data.data().lastName : "",
      email: data.data().email,
      username: data.data().username ? data.data().username : null,
      photoURL: data.data().photoURL ? data.data().photoURL : null,
      following: data.data().following ? data.data().following : null,
    }
  );
};

export default FillUsersData;
