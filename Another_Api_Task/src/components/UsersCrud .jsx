import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [savedUsers, setSavedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRandomUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://randomuser.me/api/?results=5");
      const data = await response.json();
      setUsers(data.results);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveUser = (user) => {
    if (!savedUsers.some((saved) => saved.login.uuid === user.login.uuid)) {
      setSavedUsers([...savedUsers, user]);
    }
  };

  const removeSavedUser = (uuid) => {
    setSavedUsers(savedUsers.filter((user) => user.login.uuid !== uuid));
  };

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 rounded-lg shadow-lg  ">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between  items-start sm:items-center gap-6 mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-green-500">
              Random Users
            </h1>
            <p className="text-gray-700 mt-2">
              Choose random users from the API and save them for later use.
            </p>
          </div>

          <motion.button
            onClick={fetchRandomUsers}
            disabled={loading}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 bg-gradient-to-r from-green-600 to-orange-500 text-white shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Fetch Users
              </>
            )}
          </motion.button>
        </motion.header>

        <section className="mb-16">
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-semibold mb-8 flex items-center gap-3 text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Random Users
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
          >
            {users.map((user) => (
              <motion.div
                key={user.login.uuid}
                variants={cardVariants}
                whileHover="hover"
                className="rounded-2xl overflow-hidden shadow-lg bg-white border border-orange-200"
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={user.picture.large}
                    alt={`${user.name.first} ${user.name.last}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white shadow-sm">
                    {user.location.country}
                  </div>
                </div>
                <div className="p-5 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800 truncate">{`${user.name.first} ${user.name.last}`}</h3>

                  <div className="flex items-center mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-600 truncate">
                      {user.email}
                    </p>
                  </div>

                  <motion.button
                    onClick={() => saveUser(user)}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-green-500 text-white font-semibold shadow-md hover:shadow-lg transition"
                  >
                    Save User
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3 text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Saved Users
          </h2>

          {savedUsers.length === 0 ? (
            <p className="text-gray-500">No saved users yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              <AnimatePresence>
                {savedUsers.map((user) => (
                  <motion.div
                    key={user.login.uuid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                    className="rounded-2xl overflow-hidden bg-white shadow-lg border border-green-200"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={user.picture.large}
                        alt={`${user.name.first} ${user.name.last}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white shadow-sm">
                        {user.location.country}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-800 truncate">{`${user.name.first} ${user.name.last}`}</h3>
                      <p className="text-sm mt-2 text-gray-600 truncate">
                        {user.email}
                      </p>
                      <button
                        onClick={() => removeSavedUser(user.login.uuid)}
                        className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Users;
