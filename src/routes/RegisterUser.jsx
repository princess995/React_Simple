import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../state/AppContext";

const RegisterUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // 유저 중복 체크
    const userExists = state.users?.some((u) => u.username === username);
    if (userExists) {
      alert("이미 존재하는 사용자입니다.");
      return;
    }

    // 새 유저 등록
    const newUser = { id: Date.now(), username, password };
    dispatch({ type: "REGISTER_USER", payload: newUser });

    alert("회원가입 성공! 로그인 해주세요.");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form
        onSubmit={handleRegister}
        className="flex flex-col space-y-3 w-64"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
