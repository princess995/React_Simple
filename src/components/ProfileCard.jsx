import React from 'react';
import TechStackTag from './TechStackTag';

const ProfileCard = ({ profile, onEdit, showEditButton = false }) => {
  if (!profile) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center hover:shadow-xl transition-all duration-300">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-500 mb-2">프로필을 생성해주세요</h3>
        <p className="text-sm text-gray-400">위 버튼을 클릭하여 프로필을 만드세요</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 relative">
      {profile.isJobSeeking && (
        <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
          구인중
        </div>
      )}
      
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {profile.nickname?.charAt(0) || 'U'}
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{profile.nickname}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {profile.email && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {profile.email}
              </span>
            )}
            {profile.phone && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {profile.phone}
              </span>
            )}
          </div>
        </div>
        
        {showEditButton && (
          <button
            onClick={() => onEdit && onEdit()}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
      </div>

      {profile.techStacks && profile.techStacks.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">기술 스택</h4>
          <div className="flex flex-wrap gap-2">
            {profile.techStacks.map((tech, index) => (
              <TechStackTag key={index} tech={tech} />
            ))}
          </div>
        </div>
      )}

      {profile.experiences && profile.experiences.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">경력</h4>
          <div className="space-y-1">
            {profile.experiences.map((exp, index) => (
              <p key={index} className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                {exp}
              </p>
            ))}
          </div>
        </div>
      )}

      {profile.description && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">소개</h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg leading-relaxed">
            {profile.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;