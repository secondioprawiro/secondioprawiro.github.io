import React from 'react';
import { Project } from '../types';
import { ExternalLink, Calendar, Tag } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-700 flex flex-col h-full group">
      <div className="relative overflow-hidden h-64 bg-slate-900/50 flex items-center justify-center">
        {/* Blurred background layer */}
        <img
          src={project.imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110"
        />

        {/* Main image */}
        <img
          src={project.imageUrl}
          alt={project.title}
          className="relative h-full w-auto object-contain z-10 transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase text-accent border border-white/10 z-20">
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

        <div className="flex overflow-x-auto gap-2 mb-6 no-scrollbar py-1">
          {project.tags.map((tag, index) => (
            <span key={index} className="flex-none flex items-center text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded border border-slate-600 whitespace-nowrap">
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