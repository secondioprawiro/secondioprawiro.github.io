import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  isDescExpanded: boolean;
  onToggleDesc: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isDescExpanded, onToggleDesc }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = project.imageUrls && project.imageUrls.length > 0
    ? project.imageUrls
    : [project.imageUrl];

  const hasMultipleImages = images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="glass-card flex flex-col h-full overflow-hidden group">

      {/* ── Image ── */}
      <div className="relative overflow-hidden flex items-center justify-center group/slider" style={{ height: 220, background: 'rgba(0,0,0,0.35)' }}>
        {/* Blurred background */}
        <img
          src={images[currentImageIndex]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-125"
          style={{ filter: 'blur(18px)', opacity: 0.18 }}
        />

        {/* Main image */}
        <img
          src={images[currentImageIndex]}
          alt={project.title}
          className="relative h-full w-auto object-contain z-10 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category badge */}
        <div className="absolute top-3 right-3 z-20 category-badge">
          {project.category}
        </div>

        {/* Slider controls */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-1.5 rounded-lg transition-all duration-200 opacity-0 group-hover/slider:opacity-100"
              style={{
                background: 'rgba(7,9,15,0.7)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                color: '#dde4f0',
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-1.5 rounded-lg transition-all duration-200 opacity-0 group-hover/slider:opacity-100"
              style={{
                background: 'rgba(7,9,15,0.7)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                color: '#dde4f0',
              }}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 px-2.5 py-1.5 rounded-full" style={{ background: 'rgba(7,9,15,0.5)', backdropFilter: 'blur(8px)' }}>
              {images.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentImageIndex ? 14 : 6,
                    height: 6,
                    background: i === currentImageIndex ? '#3dffa2' : 'rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Bottom image fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(13,17,34,0.6), transparent)' }}
        />
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-display font-bold text-lg leading-snug mb-2.5 transition-colors duration-200 group-hover:text-accent"
          style={{ color: '#dde4f0' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <div className="flex-1 mb-4">
          <p
            className={`text-sm leading-relaxed ${isDescExpanded ? '' : 'line-clamp-3'}`}
            style={{ color: 'rgba(221,228,240,0.4)' }}
          >
            {project.description}
          </p>
          {project.description.length > 120 && (
            <button
              onClick={onToggleDesc}
              className="mt-1 text-xs font-semibold transition-colors duration-200"
              style={{ color: 'rgba(61,255,162,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#3dffa2')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(61,255,162,0.6)')}
            >
              {isDescExpanded ? 'Show less' : 'Read more...'}
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag, i) => (
            <span key={i} className="skill-tag">{tag}</span>
          ))}
        </div>

        {/* CTA */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 group/btn"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: 'rgba(221,228,240,0.65)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.background = 'linear-gradient(180deg, #3dffa2 0%, #1de882 100%)';
              el.style.border = 'none';
              el.style.color = '#07090f';
              el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 16px rgba(61,255,162,0.3)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.background = 'rgba(255,255,255,0.06)';
              el.style.border = '1px solid rgba(255,255,255,0.09)';
              el.style.color = 'rgba(221,228,240,0.65)';
              el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.08)';
            }}
          >
            View on GitHub <ExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
