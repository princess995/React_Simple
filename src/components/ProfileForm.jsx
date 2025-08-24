import React, { useState } from 'react';
import TechStackTag from './TechStackTag';

const ProfileForm = ({ onSave, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    nickname: initialData?.nickname || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    techStacks: initialData?.techStacks || [],
    experiences: initialData?.experiences || [''],
    description: initialData?.description || '',
    isJobSeeking: initialData?.isJobSeeking || false,
    profileImage: initialData?.profileImage || null
  });

  const [newTechStack, setNewTechStack] = useState('');
  const [imagePreview, setImagePreview] = useState(initialData?.profileImage || null);

  const commonTechStacks = [
    'React', 'JavaScript', 'TypeScript', 'Python', 'Java', 'Node.js',
    'Docker', 'Kubernetes', 'AWS', 'Oracle', 'MySQL', 'MongoDB',
    'Vue.js', 'Angular', 'Spring', 'Django', 'Flask', 'Git', 'GitHub', 'Linux'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (index, value) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index] = value;
    setFormData(prev => ({ ...prev, experiences: newExperiences }));
  };

  const addExperience = () => {
    setFormData(prev => ({ 
      ...prev, 
      experiences: [...prev.experiences, ''] 
    }));
  };

  const removeExperience = (index) => {
    if (formData.experiences.length > 1) {
      const newExperiences = formData.experiences.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, experiences: newExperiences }));
    }
  };

  const addTechStack = (tech) => {
    if (tech && !formData.techStacks.includes(tech)) {
      setFormData(prev => ({ 
        ...prev, 
        techStacks: [...prev.techStacks, tech] 
      }));
      setNewTechStack('');
    }
  };

  const removeTechStack = (tech) => {
    setFormData(prev => ({ 
      ...prev, 
      techStacks: prev.techStacks.filter(t => t !== tech) 
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 크기는 5MB 이하여야 합니다.');
        return;
      }

      // 이미지 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagePreview(imageUrl);
        setFormData(prev => ({ ...prev, profileImage: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, profileImage: null }));
    // input 파일 초기화
    const fileInput = document.getElementById('profileImageInput');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    const filteredExperiences = formData.experiences.filter(exp => exp.trim() !== '');
    
    const profileData = {
      ...formData,
      experiences: filteredExperiences,
      description: formData.description.slice(0, 300)
    };

    onSave(profileData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {initialData ? '프로필 수정' : '프로필 생성'}
            </h2>
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* 프로필 이미지 업로드 섹션 */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="프로필 이미지" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                
                {/* 이미지 업로드 버튼 */}
                <label className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {/* 이미지 삭제 버튼 */}
                {imagePreview && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-0 right-0 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors shadow-lg"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  닉네임 *
                </label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="닉네임을 입력하세요"
                  required
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2 mt-6">
                  <input
                    type="checkbox"
                    checked={formData.isJobSeeking}
                    onChange={(e) => handleInputChange('isJobSeeking', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">구인중</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  전화번호
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="010-1234-5678"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                기술 스택
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.techStacks.map((tech, index) => (
                  <TechStackTag 
                    key={index} 
                    tech={tech} 
                    onRemove={removeTechStack}
                    isRemovable={true}
                  />
                ))}
              </div>
              
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTechStack}
                  onChange={(e) => setNewTechStack(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack(newTechStack))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="기술 스택을 입력하세요"
                />
                <button
                  type="button"
                  onClick={() => addTechStack(newTechStack)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  추가
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {commonTechStacks.filter(tech => !formData.techStacks.includes(tech)).map(tech => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => addTechStack(tech)}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    + {tech}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                경력 사항
              </label>
              {formData.experiences.map((experience, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => handleExperienceChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={`경력 ${index + 1}`}
                  />
                  {formData.experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addExperience}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                경력 추가
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                자기소개 (300자 이내)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                maxLength={300}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="자신을 소개해주세요 (최대 300자)"
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.description.length}/300
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {initialData ? '수정' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;