import React, { useState } from 'react';
import useProfile from '../hooks/useProfile';
import ProfileCard from '../components/ProfileCard';
import ProfileForm from '../components/ProfileForm';
import TopNavbar from '../components/TopNavbar';

const ProfilePage = () => {
  const { profile, profiles, saveProfile, updateProfile } = useProfile();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateProfile = () => {
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSaveProfile = (profileData) => {
    if (isEditing) {
      updateProfile(profileData);
    } else {
      saveProfile(profileData);
    }
    setShowForm(false);
    setIsEditing(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <TopNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              프로필 관리
            </h1>
            <p className="text-lg text-gray-600">
              나만의 프로필을 만들고 관리하세요
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                내 프로필
              </h2>
              
              {!profile ? (
                <div 
                  onClick={handleCreateProfile}
                  className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
                >
                  <ProfileCard profile={null} />
                </div>
              ) : (
                <ProfileCard 
                  profile={profile} 
                  onEdit={handleEditProfile}
                  showEditButton={true}
                />
              )}
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                프로필 사용 가이드
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">프로필 생성</h4>
                    <p className="text-sm text-gray-600">
                      + 버튼을 클릭하여 새로운 나만의 프로필을 만들어보세요.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">정보 입력</h4>
                    <p className="text-sm text-gray-600">
                      개인정보와 기술 스택 등을 입력하여 나만의 프로필을 완성하세요.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">공유 및 관리</h4>
                    <p className="text-sm text-gray-600">
                      완성된 프로필을 공유하고 다른 사용자들과 소통하세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <ProfileForm
          onSave={handleSaveProfile}
          onCancel={handleCancelForm}
          initialData={isEditing ? profile : null}
        />
      )}
    </div>
  );
};

export default ProfilePage;