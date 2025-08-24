import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../state/AppContext";
import TopNavbar from "../components/TopNavbar";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const foundUser = state.users.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    dispatch({ type: "LOGIN", payload: foundUser });
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <TopNavbar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="w-full max-w-md">
          {/* 메인 카드 */}
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-10 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">환영합니다!</h1>
              <p className="text-blue-100">계정에 로그인하여 계속하세요</p>
            </div>

            {/* 폼 */}
            <div className="px-8 py-8">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* 에러 메시지 */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}

                {/* 사용자명 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    사용자명
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="사용자명을 입력하세요"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* 비밀번호 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    비밀번호
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* 로그인 버튼 */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  로그인
                </button>
              </form>

              {/* 구분선 */}
              <div className="mt-8 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">또는</span>
                </div>
              </div>

              {/* 회원가입 */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  아직 계정이 없으신가요?
                </p>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 transition-all duration-200 border border-gray-200"
                >
                  회원가입하기
                </button>
              </div>

              {/* 홈으로 돌아가기 */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate("/home")}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center justify-center mx-auto"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  홈으로 돌아가기
                </button>
              </div>
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              로그인에 문제가 있으신가요? 
              <span className="text-blue-600 hover:text-blue-800 cursor-pointer ml-1">
                도움말
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
