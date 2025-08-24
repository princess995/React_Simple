import React from 'react';

const TechStackTag = ({ tech, onRemove, isRemovable = false }) => {
  const getTagColor = (techName) => {
    const colors = {
      'React': 'bg-blue-100 text-blue-800 border-blue-200',
      'JavaScript': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Python': 'bg-green-100 text-green-800 border-green-200',
      'Docker': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Oracle': 'bg-red-100 text-red-800 border-red-200',
      'Node.js': 'bg-green-100 text-green-800 border-green-200',
      'TypeScript': 'bg-blue-100 text-blue-800 border-blue-200',
      'Java': 'bg-orange-100 text-orange-800 border-orange-200',
      'MySQL': 'bg-blue-100 text-blue-800 border-blue-200',
      'MongoDB': 'bg-green-100 text-green-800 border-green-200',
      'AWS': 'bg-orange-100 text-orange-800 border-orange-200',
      'Vue.js': 'bg-green-100 text-green-800 border-green-200',
      'Angular': 'bg-red-100 text-red-800 border-red-200',
      'Spring': 'bg-green-100 text-green-800 border-green-200',
      'Django': 'bg-green-100 text-green-800 border-green-200',
      'Flask': 'bg-gray-100 text-gray-800 border-gray-200',
      'Git': 'bg-gray-100 text-gray-800 border-gray-200',
      'GitHub': 'bg-gray-100 text-gray-800 border-gray-200',
      'Linux': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Kubernetes': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    
    return colors[techName] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 hover:shadow-sm ${getTagColor(tech)}`}
    >
      {tech}
      {isRemovable && onRemove && (
        <button
          onClick={() => onRemove(tech)}
          className="ml-2 hover:bg-red-200 rounded-full p-1 transition-colors duration-200"
          type="button"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  );
};

export default TechStackTag;