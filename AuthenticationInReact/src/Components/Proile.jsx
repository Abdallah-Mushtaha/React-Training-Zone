import React, { useEffect, useState } from "react";
import api from "../api";
export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api
      .get("/auth/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {profile ? (
        <div className="flex flex-col bg-black/80 p-5 mt-5 rounded-md">
          <p className="text-lg text-white">Name: {profile.name}</p>
          <p className="text-lg  text-white">Email: {profile.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
