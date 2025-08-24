import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../state/AppContext';
import useFavorites from '../hooks/useFavorites';

const TopNavbar = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { getFavoriteProfiles } = useFavorites();

  useEffect(() => {
    if (state.user) {
      // 사용자의 프로필 정보 가져오기
      const userId = state.user.username;
      const savedProfile = localStorage.getItem(`userProfile_${userId}`);
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
    } else {
      setUserProfile(null);
    }
  }, [state.user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/login');
  };

  const goToHome = () => {
    navigate('/home');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <nav className="bg-gradient-to-r from-white via-blue-50 to-purple-50 backdrop-blur-md shadow-xl border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* 로고 및 네비게이션 링크 */}
          <div className="flex items-center space-x-8">
            {/* 회사 로고 */}
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={goToHome}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
                LINK-U
              </div>
            </div>

            {/* 네비게이션 메뉴 */}
            <div className="hidden md:flex space-x-1">
              <button
                onClick={() => navigate('/talents')}
                className="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-white/50 group"
              >
                <span className="relative z-10 font-medium">인재찾기</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

          </div>

          {/* 로그인 상태에 따른 버튼 */}
          <div className="flex items-center space-x-4">
            {state.user ? (
              // 로그인된 상태 - 드롭다운 메뉴
              <div className="relative dropdown-container">
                <div 
                  className="hidden sm:flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/40 cursor-pointer hover:bg-white/70 transition-all duration-300"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border-2 border-white shadow-sm">
                    {userProfile?.profileImage ? (
                      <img 
                        src={userProfile.profileImage} 
                        alt={state.user.username} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {state.user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {state.user.username}
                  </span>
                  <span className="text-gray-500 ml-1 hidden md:inline">님</span>
                  <svg className="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* 드롭다운 메뉴 */}
                {showDropdown && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50"
                  >
                    {/* 프로필 관리 */}
                    <button
                      onClick={() => {
                        goToProfile();
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      프로필 관리
                    </button>

                    {/* 즐겨찾기 메뉴 */}
                    <button
                      onClick={() => {
                        // TODO: 즐겨찾기 페이지로 이동
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
                    >
                      <svg className="w-5 h-5 mr-3 text-yellow-500" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      즐겨찾기
                    </button>

                    {/* 로그아웃 */}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowDropdown(false);
                        }}
                        className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // 비로그인 상태
              <div className="flex items-center space-x-3">
                {/* 회원가입 버튼 (숨겨진 상태에서 보이기) */}
                <button
                  onClick={() => navigate('/register')}
                  className="hidden sm:block text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-white/50 transition-all duration-300 font-medium"
                >
                  회원가입
                </button>
                
                {/* 로그인 버튼 */}
                <button
                  onClick={() => navigate('/login')}
                  className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    로그인
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden flex items-center ml-2">
            <button className="p-2 rounded-lg hover:bg-white/50 transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 하단 그라데이션 라인 */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60"></div>
    </nav>
  );
};

export default TopNavbar;