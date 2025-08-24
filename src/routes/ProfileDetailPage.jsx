import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';
import { useAppContext } from '../state/AppContext';
import useFavorites from '../hooks/useFavorites';

const ProfileDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const profile = location.state?.profile;
  const { state } = useAppContext();
  const { toggleFavorite, isFavorite } = useFavorites();

  // 프로필이 없으면 홈으로 리다이렉트
  if (!profile) {
    navigate('/home');
    return null;
  }

  const handleGoBack = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={handleGoBack}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            홈으로 돌아가기
          </button>

          {/* 프로필 헤더 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 relative">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
            
            {/* 즐겨찾기 버튼 */}
            {state.user && (
              <button
                onClick={() => toggleFavorite(profile.id)}
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 z-10"
              >
                <svg 
                  className={`w-6 h-6 transition-colors ${
                    isFavorite(profile.id) 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-white/80 hover:text-yellow-400'
                  }`} 
                  fill={isFavorite(profile.id) ? "currentColor" : "none"}
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>
            )}

            <div className="relative px-8 pb-8">
              <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-12">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 md:mb-0 md:mr-8">
                  {profile.profileImage ? (
                    <img 
                      src={profile.profileImage} 
                      alt={profile.nickname || profile.userId} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {profile.nickname?.charAt(0) || profile.userId?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 md:mb-0">
                      {profile.nickname || profile.userId}
                    </h1>
                    <div className="flex flex-col md:flex-row items-center gap-3">
                      {profile.isJobSeeking && (
                        <span className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          구직 중
                        </span>
                      )}
                      {isFavorite(profile.id) && (
                        <div className="inline-flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                          <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                          </svg>
                          즐겨찾기
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 mb-4">
                    {profile.email || "이메일 정보 없음"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 메인 정보 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 소개 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  소개
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {profile.description || "소개글이 없습니다."}
                </p>
              </div>

              {/* 경험 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                  경험
                </h2>
                {profile.experiences && profile.experiences.length > 0 ? (
                  <div className="space-y-3">
                    {profile.experiences.filter(exp => exp.trim()).map((experience, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-gray-700">{experience}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">등록된 경험이 없습니다.</p>
                )}
              </div>
            </div>

            {/* 사이드바 */}
            <div className="space-y-6">
              {/* 연락처 정보 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  연락처
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <span className="text-gray-700">{profile.email || "이메일 없음"}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700">{profile.phone || "전화번호 없음"}</span>
                  </div>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  기술 스택
                </h2>
                {profile.techStacks && profile.techStacks.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.techStacks.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">등록된 기술 스택이 없습니다.</p>
                )}
              </div>

              {/* 추가 정보 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  추가 정보
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">가입일:</span>
                    <span className="text-gray-700">
                      {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('ko-KR') : '정보 없음'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">최근 수정:</span>
                    <span className="text-gray-700">
                      {profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString('ko-KR') : '정보 없음'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">구직 상태:</span>
                    <span className={`font-medium ${profile.isJobSeeking ? 'text-green-600' : 'text-gray-600'}`}>
                      {profile.isJobSeeking ? '구직 중' : '구직하지 않음'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailPage;