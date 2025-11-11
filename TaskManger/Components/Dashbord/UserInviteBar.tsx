// UserInviteBar.tsx

import React from "react";
import { HiMiniUserGroup } from "react-icons/hi2";

interface UserInviteBarProps {
  users?: string[];
  totalCount?: number;
}

const UserInviteBar: React.FC<UserInviteBarProps> = ({ users, totalCount }) => {
  const defaultUsers = [
    "https://via.placeholder.com/150/f00/fff?text=U1",
    "https://via.placeholder.com/150/0f0/fff?text=U2",
    "https://via.placeholder.com/150/00f/fff?text=U3",
    "https://via.placeholder.com/150/ff0/fff?text=U4",
  ];

  const userImages = users && users.length > 0 ? users : defaultUsers;
  const count = totalCount ?? 4;

  return (
    <div className="flex items-center space-x-3">
      <div className="flex -space-x-2 overflow-hidden">
        {userImages.slice(0, 4).map((src, index) => (
          <img
            key={index}
            className="inline-block h-10 w-10 rounded-xl ring-2 ring-white object-cover shadow-md transition duration-300 hover:z-10 hover:scale-105"
            src={src}
            alt={`User ${index + 1}`}
          />
        ))}

        <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-gray-200 text-sm font-semibold text-gray-700 ring-2 ring-white shadow-md">
          +{count}
        </div>
      </div>

      <button className="px-6 py-2 text-lg font-semibold text-red-500 bg-white border-2 border-red-300 rounded-xl shadow-md transition duration-300 hover:bg-red-50 hover:border-red-500 flex items-center">
        <HiMiniUserGroup className="h-6 w-6 text-red-500 mr-2" />
        Invite
      </button>
    </div>
  );
};

export default UserInviteBar;
