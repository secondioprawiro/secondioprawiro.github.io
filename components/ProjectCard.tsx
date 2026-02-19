import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLink, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  
  const images = project.imageUrls && project.imageUrls.length > 0 
    ? project.imageUrls 
    : [project.imageUrl];
  
  const hasMultipleImages = images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-700 flex flex-col h-full group">
      <div className="relative overflow-hidden h-64 bg-slate-900/50 flex items-center justify-center group/slider">
        {/* Blurred background layer */}
        <img
          src={images[currentImageIndex]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110 transition-all duration-500"
        />

        {/* Main image */}
        <img
          src={images[currentImageIndex]}
          alt={project.title}
          className="relative h-full w-auto object-contain z-10 transition-all duration-500 group-hover:scale-105"
        />

        {/* Slider Controls */}
        {hasMultipleImages && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-1.5 rounded-full bg-slate-900/60 text-white border border-white/10 opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-slate-950"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-1.5 rounded-full bg-slate-900/60 text-white border border-white/10 opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-slate-950"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 px-2 py-1 rounded-full bg-slate-950/40 backdrop-blur-sm">
              {images.map((_, index) => (
                <div 
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-accent w-3' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase text-accent border border-white/10 z-20">
          {project.category}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        <div className="relative mb-4 flex-1">
          <p className={`text-slate-400 text-sm leading-relaxed transition-all duration-300 ${isDescExpanded ? '' : 'line-clamp-3'}`}>
            {project.description}
          </p>
          {project.description.length > 120 && (
            <button 
              onClick={() => setIsDescExpanded(!isDescExpanded)}
              className="text-accent text-xs font-semibold mt-1 hover:underline focus:outline-none"
            >
              {isDescExpanded ? 'Less' : 'More...'}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6 py-1">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className="flex items-center text-[10px] sm:text-[11px] font-medium bg-slate-700/30 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700 hover:border-accent/40 hover:bg-slate-700/60 hover:text-white transition-all duration-300 cursor-default group/tag"
            >
              <Tag size={10} className="mr-1.5 text-slate-500 group-hover/tag:text-accent transition-colors" />
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