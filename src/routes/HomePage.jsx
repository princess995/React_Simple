import React from "react";
import { useAppContext } from "../state/AppContext";

const HomePage = () => {
  const { state, dispatch } = useAppContext();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome, {state.user?.username}!</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 mt-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
