import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../state/AppContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = state.users.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    dispatch({ type: "LOGIN", payload: foundUser });
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form
        onSubmit={handleLogin}
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
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      {/* 회원가입 버튼 */}
      <div className="mt-4">
        <p className="text-sm">
          아직 계정이 없으신가요?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            회원가입
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
