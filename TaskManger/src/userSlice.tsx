import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface User {
  id: number;
  Fname: string;
  Secname: string;
  Email: string;
  Username: string;
  hashedPassword: string;
}
interface UserState {
  users: User[];
}
const intialValue: UserState = {
  users: JSON.parse(localStorage.getItem("user") || "[]"),
};

const UserSlice = createSlice({
  name: "user",
  initialState: intialValue,
  reducers: {
    addUser: (currentState, action: PayloadAction<User>) => {
      currentState.users.push(action.payload);
      localStorage.setItem("user", JSON.stringify(currentState.users));
    },
  },
});
export const { addUser } = UserSlice.actions;
export default UserSlice.reducer;
