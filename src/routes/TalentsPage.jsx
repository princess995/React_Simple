import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../state/AppContext';
import TopNavbar from '../components/TopNavbar';
import useFavorites from '../hooks/useFavorites';

const TalentsPage = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [displayProfiles, setDisplayProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    name: '',
    techStack: '',
    isJobSeeking: ''
  });
  const { toggleFavorite, isFavorite } = useFavorites();

  const PROFILES_PER_PAGE = 10; // 가로 5개 x 세로 2줄

  // 기술스택 추천 태그들
  const techStackSuggestions = [
    'React', 'JavaScript', 'TypeScript', 'Python', 'Java', 'Node.js',
    'Vue.js', 'Angular', 'Spring', 'Django', 'Docker', 'AWS'
  ];

  // 구인중 상태 태그들
  const jobSeekingOptions = [
    { label: '구직중', value: 'true' },
    { label: '구직하지 않음', value: 'false' }
  ];

  useEffect(() => {
    // 모든 프로필 가져오기
    const savedProfiles = localStorage.getItem('allProfiles');
    if (savedProfiles) {
      const allProfiles = JSON.parse(savedProfiles);
      // 최신순으로 정렬 (createdAt 또는 updatedAt 기준)
      const sortedProfiles = allProfiles.sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt || 0);
        const dateB = new Date(b.updatedAt || b.createdAt || 0);
        return dateB - dateA;
      });
      setProfiles(sortedProfiles);
      setFilteredProfiles(sortedProfiles);
    }
  }, []);

  useEffect(() => {
    // 필터링된 프로필을 페이지네이션으로 표시
    const startIndex = 0;
    const endIndex = currentPage * PROFILES_PER_PAGE;
    setDisplayProfiles(filteredProfiles.slice(startIndex, endIndex));
  }, [filteredProfiles, currentPage]);

  // 무한 스크롤 처리
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !== 
      document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }

    if (displayProfiles.length < filteredProfiles.length) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setLoading(false);
      }, 500);
    }
  }, [loading, displayProfiles.length, filteredProfiles.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 검색 필터 적용
  const applyFilters = () => {
    let filtered = [...profiles];

    // 이름으로 필터링
    if (searchFilters.name.trim()) {
      filtered = filtered.filter(profile =>
        (profile.nickname || profile.userId || '').toLowerCase()
          .includes(searchFilters.name.toLowerCase())
      );
    }

    // 기술스택으로 필터링
    if (searchFilters.techStack.trim()) {
      filtered = filtered.filter(profile =>
        profile.techStacks?.some(tech =>
          tech.toLowerCase().includes(searchFilters.techStack.toLowerCase())
        )
      );
    }

    // 구인중 상태로 필터링
    if (searchFilters.isJobSeeking !== '') {
      const isJobSeekingBool = searchFilters.isJobSeeking === 'true';
      filtered = filtered.filter(profile => profile.isJobSeeking === isJobSeekingBool);
    }

    setFilteredProfiles(filtered);
    setCurrentPage(1);
    setDisplayProfiles([]);
  };

  // 검색 필터 입력 처리
  const handleFilterChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 태그 클릭 처리
  const handleTagClick = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 프로필 클릭 처리
  const handleProfileClick = (profile) => {
    if (!state.user) {
      navigate('/login');
      return;
    }
    navigate(`/profile/${profile.id}`, { state: { profile } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">인재찾기</h1>
          <p className="text-lg text-gray-600">다양한 분야의 전문가들을 만나보세요</p>
        </div>

        {/* 검색 필터 */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* 검색 입력창들 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                <input
                  type="text"
                  value={searchFilters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                  placeholder="이름을 입력하세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">기술스택</label>
                <input
                  type="text"
                  value={searchFilters.techStack}
                  onChange={(e) => handleFilterChange('techStack', e.target.value)}
                  placeholder="기술스택을 입력하세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">구인중</label>
                <select
                  value={searchFilters.isJobSeeking}
                  onChange={(e) => handleFilterChange('isJobSeeking', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">전체</option>
                  <option value="true">구직중</option>
                  <option value="false">구직하지 않음</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={applyFilters}
                  className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  찾기
                </button>
              </div>
            </div>

            {/* 추천 태그들 */}
            <div className="space-y-4">
              {/* 기술스택 태그 */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">인기 기술스택</div>
                <div className="flex flex-wrap gap-2">
                  {techStackSuggestions.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => handleTagClick('techStack', tech)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              {/* 구인중 상태 태그 */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">구직 상태</div>
                <div className="flex flex-wrap gap-2">
                  {jobSeekingOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleTagClick('isJobSeeking', option.value)}
                      className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 결과 헤더 */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              전체 {filteredProfiles.length}명의 인재
            </h2>
            <div className="text-sm text-gray-500">
              {displayProfiles.length}/{filteredProfiles.length} 표시 중
            </div>
          </div>
        </div>

        {/* 프로필 그리드 */}
        <div className="max-w-7xl mx-auto">
          {displayProfiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {displayProfiles.map((profile) => (
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
                    {/* 프로필 이미지 */}
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      {profile.profileImage ? (
                        <img 
                          src={profile.profileImage} 
                          alt={profile.nickname || profile.userId} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {profile.nickname?.charAt(0) || profile.userId?.charAt(0) || 'U'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 이름과 구직중 상태 */}
                    <div className="text-center mb-3">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {profile.nickname || profile.userId}
                      </h3>
                      {profile.isJobSeeking && (
                        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          구직중
                        </span>
                      )}
                    </div>

                    {/* 설명 */}
                    <p className="text-gray-600 text-sm text-center mb-4 line-clamp-2 h-10">
                      {profile.description || "자기소개가 없습니다."}
                    </p>

                    {/* 기술스택 */}
                    <div className="flex flex-wrap justify-center gap-1">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5.902-6.092 2.38-.377.349-.892-.585-.52-.935A8.962 8.962 0 0112 13c2.27 0 4.352.84 5.936 2.236.328.29-.097 1.09-.476.818A7.96 7.96 0 0012 15z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                조건에 맞는 인재를 찾을 수 없습니다
              </h3>
              <p className="text-gray-500 mb-6">
                다른 검색 조건을 시도해보세요
              </p>
              <button
                onClick={() => {
                  setSearchFilters({ name: '', techStack: '', isJobSeeking: '' });
                  setFilteredProfiles(profiles);
                  setCurrentPage(1);
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                전체 보기
              </button>
            </div>
          )}
        </div>

        {/* 로딩 인디케이터 */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentsPage;