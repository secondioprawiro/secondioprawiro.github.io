import React from 'react';
import { Project } from '../types';
import { ExternalLink, Calendar, Tag } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-700 flex flex-col h-full group">
      <div className="relative overflow-hidden h-48">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-accent border border-slate-600">
          {project.category}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        
        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, index) => (
            <span key={index} className="flex items-center text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded border border-slate-600">
              <Tag size={10} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {project.link && (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center w-full py-2 px-4 bg-slate-700 hover:bg-accent hover:text-slate-900 text-white rounded-lg transition-all duration-300 font-medium text-sm"
          >
            Lihat Project <ExternalLink size={16} className="ml-2" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;