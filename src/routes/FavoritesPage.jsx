import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';
import { useAppContext } from '../state/AppContext';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { getFavoriteProfiles, removeFromFavorites } = useFavorites();
  
  const favoriteProfiles = getFavoriteProfiles();

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h2>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            로그인하러 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">즐겨찾기</h1>
          <p className="text-gray-600 mt-2">저장한 프로필들을 확인하세요</p>
        </div>

        {favoriteProfiles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">⭐</div>
            <h2 className="text-2xl font-bold text-gray-500 mb-2">저장된 즐겨찾기가 없습니다</h2>
            <p className="text-gray-400 mb-6">관심있는 프로필을 즐겨찾기에 추가해보세요</p>
            <button
              onClick={() => navigate('/talents')}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              인재 둘러보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProfiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    {/* 프로필 이미지 */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {(profile.nickname || profile.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">
                            {profile.nickname || profile.name || '이름 없음'}
                          </h3>
                          {(profile.role || profile.position) && (
                            <p className="text-gray-600 mb-2">{profile.role || profile.position}</p>
                          )}
                          {profile.location && (
                            <p className="text-sm text-gray-500 mb-2">📍 {profile.location}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromFavorites(profile.id)}
                          className="text-red-500 hover:text-red-700 transition-colors ml-2 flex-shrink-0"
                          title="즐겨찾기에서 제거"
                        >
                          ❤️
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 기술 스택 표시 */}
                  {((profile.techStacks && profile.techStacks.length > 0) || (profile.skills && profile.skills.length > 0)) && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">기술 스택</h4>
                      <div className="flex flex-wrap gap-1">
                        {(profile.techStacks || profile.skills || []).slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {typeof tech === 'object' ? (tech.name || tech.skill) : tech}
                          </span>
                        ))}
                        {(profile.techStacks || profile.skills || []).length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{(profile.techStacks || profile.skills || []).length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 소개글 */}
                  {(profile.description || profile.bio) && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {profile.description || profile.bio}
                    </p>
                  )}

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/profile/${profile.id}`)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      프로필 보기
                    </button>
                    <span className="text-xs text-gray-400">
                      ID: {profile.id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;