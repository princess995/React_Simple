import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../state/AppContext";
import TopNavbar from "../components/TopNavbar";
import useFavorites from "../hooks/useFavorites";

const HomePage = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [profiles, setProfiles] = useState([]);
  const { toggleFavorite, isFavorite } = useFavorites();

  // 슬라이드 배너 데이터
  const banners = [
    {
      title: "당신의 커리어를 새롭게 시작하세요",
      subtitle: "전문가들과 함께하는 성장의 여정",
      description: "최고의 인재들이 모이는 곳에서 당신만의 이야기를 시작해보세요.",
      gradient: "from-blue-600 to-purple-700"
    },
    {
      title: "혁신적인 기술 스택을 경험하세요",
      subtitle: "미래를 선도하는 기술 트렌드",
      description: "최신 기술과 함께 성장하며 업계 최고의 전문성을 확보하세요.",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      title: "글로벌 네트워킹의 기회",
      subtitle: "세계적인 전문가들과의 만남",
      description: "전 세계 전문가들과 네트워킹하며 무한한 가능성을 발견하세요.",
      gradient: "from-green-600 to-blue-600"
    }
  ];

  useEffect(() => {
    // 배너 자동 슬라이드
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    // 모든 프로필 가져오기
    const savedProfiles = localStorage.getItem('allProfiles');
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }

    return () => clearInterval(interval);
  }, []);

  const handleProfileClick = (profile) => {
    if (!state.user) {
      navigate('/login');
      return;
    }
    navigate(`/profile/${profile.id}`, { state: { profile } });
  };

  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      
      {/* Hero Section - 대기업 스타일 배너 */}
      <section className="relative h-screen overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${banners[currentSlide].gradient} transition-all duration-1000`}>
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
            <div className="max-w-4xl mx-auto px-4 animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-slide-up">
                {banners[currentSlide].title}
              </h1>
              <p className="text-2xl md:text-3xl mb-4 font-light animate-slide-up delay-200">
                {banners[currentSlide].subtitle}
              </p>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto animate-slide-up delay-300">
                {banners[currentSlide].description}
              </p>
              <div className="animate-slide-up delay-500">
                {state.user ? (
                  <button
                    onClick={() => navigate('/profile')}
                    className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    프로필 관리하기
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => navigate('/login')}
                      className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      지금 시작하기
                    </button>
                    <button
                      onClick={() => navigate('/register')}
                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                    >
                      회원가입
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 슬라이드 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 광고성 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              왜 우리를 선택해야 할까요?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              수많은 전문가들이 선택한 이유가 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">빠른 성장</h3>
              <p className="text-gray-600">
                체계적인 커리큘럼과 멘토링을 통해 단기간에 전문성을 확보하세요.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">글로벌 네트워크</h3>
              <p className="text-gray-600">
                전 세계 최고의 전문가들과 연결되어 무한한 기회를 창출하세요.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">검증된 결과</h3>
              <p className="text-gray-600">
                수천 명의 성공 사례가 입증하는 확실한 성과를 경험하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <p className="text-gray-600">활성 멤버</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <p className="text-gray-600">파트너 기업</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <p className="text-gray-600">만족도</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">24/7</div>
              <p className="text-gray-600">지원 서비스</p>
            </div>
          </div>
        </div>
      </section>

      {/* 프로필 리스트 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              우수한 멤버들을 만나보세요
            </h2>
            <p className="text-xl text-gray-600">
              다양한 분야의 전문가들이 함께하고 있습니다
            </p>
          </div>

          {profiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {profiles.slice(0, 8).map((profile) => (
                <div
                  key={profile.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group relative"
                >
                  {/* 즐겨찾기 버튼 */}
                  {state.user && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(profile.id);
                      }}
                      className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 group-hover:scale-110"
                    >
                      <svg 
                        className={`w-4 h-4 transition-colors ${
                          isFavorite(profile.id) 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-gray-400 hover:text-yellow-500'
                        }`} 
                        fill={isFavorite(profile.id) ? "currentColor" : "none"}
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  )}

                  <div 
                    className="p-6"
                    onClick={() => handleProfileClick(profile)}
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      {profile.profileImage ? (
                        <img 
                          src={profile.profileImage} 
                          alt={profile.nickname || profile.userId} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white text-xl font-bold">
                            {profile.nickname?.charAt(0) || profile.userId?.charAt(0) || 'U'}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                      {profile.nickname || profile.userId}
                    </h3>
                    <p className="text-gray-600 text-sm text-center mb-4 line-clamp-2">
                      {profile.description || "프로필 설명이 없습니다."}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {profile.techStacks?.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {profile.techStacks?.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{profile.techStacks.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                아직 등록된 프로필이 없습니다
              </h3>
              <p className="text-gray-500 mb-6">
                첫 번째 프로필을 등록하여 커뮤니티를 시작해보세요!
              </p>
              {state.user ? (
                <button
                  onClick={() => navigate('/profile')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  프로필 등록하기
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  로그인하고 시작하기
                </button>
              )}
            </div>
          )}

          {profiles.length > 8 && (
            <div className="text-center mt-12">
              <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                더 많은 프로필 보기
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
