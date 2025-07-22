import React from "react";

const initalUsers = [
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

// check if users is empty then set it to local storage
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(initalUsers));
}

export default function fakeApi({ username, password }) {
  /* suppose we have fake DB get from server
      will use promise to simulate network delay
      will return token and role  if the user is valid
      will return error message if the user is not valid
  */
  return new Promise((resolve, reject) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
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
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const founded = users.find((user) => user.username === username);
      if (founded) {
        reject("This username is already taken please choose another one");
      } else {
        const newuser = {
          username: username,
          password: password,
          role: "user",
        };
        users.push(newuser);
        localStorage.setItem("users", JSON.stringify(users));
        resolve({
          token: "fake-jwt-token-${newuser.username}",
          role: newuser.role,
        });
      }
    }, 1000);
  });
};
