import React from "react";

const users = [
  {
    username: "admin",
    password: "123456",
    role: "admin",
  },
  {
    username: "user",
    password: "123456",
    role: "user",
  },
  {
    username: "Marke",
    password: "123456",
    role: "user",
  },
];

export default function fakeApi({ username, password }) {
  /* suppose we have fake DB get from server
      will use promise to simulate network delay
      will return token and role  if the user is valid
      will return error message if the user is not valid
  */
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        resolve({
          token: "fake-jwt-token-admin",
          role: user.role,
        });
      } else {
        reject("Invalid username or password");
      }
    }, 1000);
  });
}

export const fakeRegister = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const founded = users.find(
        (user) => user.username === username && user.password === password
      );
      if (founded) {
        reject("user already exist");
      } else {
        const newuser = {
          username: username,
          password: password,
          role: "user",
        };
        resolve({
          token: "fake-jwt-token-${newuser.username}",
          role: newuser.role,
        });
      }
    }, 1000);
  });
};
