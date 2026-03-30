import React, { useState, useEffect } from 'react';
import { Linkedin, Mail, User, Briefcase, Cpu, ArrowRight, Github, ChevronDown, ChevronUp } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import GitHubCalendar from './components/GitHubCalendar';
import { Project, Category } from './types';

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Virtual Classroom Multi-User & Multi-Platform',
    description: 'A application that designed to overcome the limitations of conventional distance learning (such as Zoom/Meet) by providing an immersive 3D environment.',
    category: Category.GAME,
    tags: ['C#', 'Unity', 'OOP', 'Fish-Net'],
    imageUrl: '/resources/project1/class1.jpg',
    link: 'https://github.com/secondioprawiro/TA'
  },
  {
    id: '2',
    title: 'To-Do-List with Calendar',
    description: 'A calendar that have to-do feature.',
    category: Category.WEB,
    tags: ['HTML', 'CSS', 'Javascript', 'PHP', 'MySQL', 'Native'],
    imageUrl: '/resources/project2/progweb.png',
    link: 'https://github.com/secondioprawiro/miniproject_progweb'
  },
  {
    id: '3',
    title: 'Simple 2D Game RPG',
    description: 'This project was create to implement Scriptable Object as static data and JSON as a dynamic data (save-load)',
    category: Category.GAME,
    tags: ['C#', 'Unity', 'OOP', 'Scriptable Object', 'JSON'],
    imageUrl: '/resources/project3/game.png',
    link: 'https://github.com/secondioprawiro/Simple-2D-Game'
  },
  {
    id: '4',
    title: 'Arbifans',
    description: 'This project looks like instagram but with paid content',
    category: Category.WEB,
    tags: ['React.js', 'TypeScript', 'Tailwind'],
    imageUrl: '/resources/project4/arbifans.png',
    link: 'https://github.com/secondioprawiro/frontend-arbifans'
  },
  {
    id: '5',
    title: 'Github Profile',
    description: 'This project use github API as a data source, and display following and followers from github user',
    category: Category.MOBILE,
    tags: ['Kotlin', 'MVVM', 'DAO'],
    imageUrl: '/resources/project5/github_app.png',
    link: 'https://github.com/secondioprawiro/3_androidfundamental_secondio'
  },
  {
    id: '6',
    title: 'AI-Wrapper',
    description: 'A content generator built with Next.js 14, Tailwind CSS, Google Gemini API, and PostgreSQL for database.',
    category: Category.WEB,
    tags: ['Next.js', 'Tailwind CSS', 'Google Gemini', 'PostgreSQL', 'TypeScript'],
    imageUrl: '/resources/project6/AI-Wrapper.png',
    link: 'https://github.com/secondioprawiro/AI-Wrapper'
  },
  {
    id: '7',
    title: 'Asset Tracker App',
    description: 'An asset/stock tracker app focused on the Indonesia stock market. Built with Python as data source from Yahoo Finance, .NET for the backend with SQLite, and Electron.js for the frontend desktop app.',
    category: Category.OTHER,
    tags: ['C#', '.NET', 'Electron.js', 'SQLite', 'Python', 'Desktop App'],
    imageUrl: '/resources/project7/project7-1.png',
    imageUrls: [
      '/resources/project7/project7-1.png',
      '/resources/project7/project7-2.png'
    ],
    link: 'https://github.com/secondioprawiro/AssetTrackerApp'
  },
  {
    id: '8',
    title: 'Tani Trust',
    description: 'A WEB3 hackathon app — a platform that helps farmers sell products directly by eliminating the middleman in agricultural supply chains. Built with Next.js, SUI blockchain, Google Gemini, and PostgreSQL.',
    category: Category.WEB,
    tags: ['TypeScript', 'Move', 'Next.js', 'Tailwind CSS', 'SUI', 'Google Gemini', 'PostgreSQL', 'Web3'],
    imageUrl: '/resources/project8/tanitrust1.png',
    imageUrls: [
      '/resources/project8/tanitrust1.png',
      '/resources/project8/tanitrust2.png',
      '/resources/project8/tanitrust3.png'
    ],
    link: 'https://github.com/secondioprawiro/TaniTrust'
  },
  {
    id: '9',
    title: 'Bidding Online Auction',
    description: 'A real-time auction platform built with the TALL stack (Tailwind, Alpine.js, Laravel, Livewire). Uses Laravel Reverb and WebSockets to broadcast bid updates instantly to all users without page refreshes.',
    category: Category.WEB,
    tags: ['PHP', 'Laravel', 'Laravel Reverb', 'Livewire', 'Alpine.js', 'Tailwind CSS', 'Pest PHP', 'Docker', 'WebSockets'],
    imageUrl: '/resources/project9/auction1.png',
    imageUrls: [
      '/resources/project9/auction1.png',
      '/resources/project9/auction2.png'
    ],
    link: 'https://github.com/secondioprawiro/laravel-auction'
  }
];

const MARQUEE_TECHS = [
  'React.js', '·', 'Laravel', '·', 'Unity 3D', '·', 'TypeScript', '·', 'Next.js', '·',
  'Python', '·', 'Flutter', '·', 'Node.js', '·', 'PostgreSQL', '·', 'Docker', '·',
  'C#', '·', 'Tailwind CSS', '·', 'SUI Blockchain', '·', 'Kotlin', '·', 'Blender',
];

const SKILLS = [
  { label: 'Frontend', color: '#5b9cf6', items: ['React.js', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Bootstrap'] },
  { label: 'Game Dev', color: '#a78bfa', items: ['Unity 3D/2D', 'Blender', 'Fish-Net', 'C#'] },
  { label: 'Backend', color: '#3dffa2', items: ['Laravel', 'Express.js', 'Next.js', 'Flask', 'MySQL', 'PostgreSQL', 'Docker', 'AWS'] },
  { label: 'Languages', color: '#f472b6', items: ['C', 'C#', 'Java', 'Python', 'PHP', 'JavaScript', 'Kotlin', 'Dart', 'Move'] },
  { label: 'Mobile', color: '#fbbf24', items: ['Android Studio', 'Flutter'] },
];

const App: React.FC = () => {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<Category | string>(Category.ALL);
  const [activeSection, setActiveSection] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());

  const toggleDescription = (projectId: string) => {
    setExpandedDescriptions(prev => {
      const next = new Set(prev);
      if (next.has(projectId)) next.delete(projectId);
      else next.add(projectId);
      return next;
    });
  };

  const filteredProjects = selectedCategory === Category.ALL
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'contributions', 'projects', 'contact'];
      const bottomOfPage = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2;
      if (bottomOfPage) { setActiveSection('contact'); return; }

      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ id, label }: { id: string; label: string }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`nav-link ${activeSection === id ? 'active' : 'text-white/40 hover:text-white/80'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen relative" style={{ background: '#07090f', color: '#dde4f0' }}>

      {/* ── Navbar ── */}
      <nav
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(7,9,15,0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.055)',
        }}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="font-display font-bold text-xl text-white tracking-tight hover:text-accent transition-colors duration-200"
          >
            S.P
          </button>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink id="home" label="Home" />
            <NavLink id="about" label="About" />
            <NavLink id="contributions" label="Activity" />
            <NavLink id="projects" label="Projects" />
            <NavLink id="contact" label="Contact" />
          </div>

          {/* GitHub CTA */}
          <a
            href="https://github.com/secondioprawiro"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white/90 transition-colors duration-200"
          >
            <Github size={15} />
            GitHub ↗
          </a>
        </div>
      </nav>

      <main className="relative z-10">

        {/* ── Hero ── */}
        <section id="home" className="min-h-[92vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
          {/* Ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 700, height: 700,
              background: 'radial-gradient(circle, rgba(61,255,162,0.05) 0%, transparent 65%)',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              top: '60%', left: '20%',
              width: 400, height: 400,
              background: 'radial-gradient(circle, rgba(91,156,246,0.04) 0%, transparent 65%)',
            }}
          />

          <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
            {/* Status badge */}
            <div className="hero-text-1 inline-flex items-center gap-2.5 mb-10 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: 'rgba(61,255,162,0.08)',
                border: '1px solid rgba(61,255,162,0.22)',
                color: '#3dffa2',
              }}>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#3dffa2', animation: 'pulse-dot 2s ease-in-out infinite' }}
              />
              Available for Opportunities · 2026
            </div>

            {/* Main heading */}
            <div className="hero-text-2">
              <h1 className="font-display font-bold leading-none tracking-tight mb-2" style={{ fontSize: 'clamp(52px, 10vw, 96px)', color: '#fff' }}>
                Hello, I'm
              </h1>
              <h1
                className="font-display font-bold leading-none tracking-tight mb-8"
                style={{
                  fontSize: 'clamp(52px, 10vw, 96px)',
                  background: 'linear-gradient(120deg, #ffffff 20%, #3dffa2 75%, #5b9cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Secondio Prawiro
              </h1>
            </div>

            {/* Subtitle */}
            <div className="hero-text-3">
              <p className="text-xl md:text-2xl font-light mb-3" style={{ color: 'rgba(221,228,240,0.5)' }}>
                Full Stack Developer · Game Developer
              </p>
              <p className="text-base max-w-lg mx-auto mb-12 leading-relaxed" style={{ color: 'rgba(221,228,240,0.3)' }}>
                Fresh graduate from Duta Wacana Christian University. Passionate about building immersive digital experiences — from web apps to interactive 3D worlds.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="hero-text-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => scrollToSection('projects')} className="btn-primary">
                View Projects <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn-secondary">
                Get in Touch
              </button>
            </div>
          </div>

          {/* Tech marquee */}
          <div className="absolute bottom-16 left-0 right-0 marquee-wrapper">
            <div className="marquee-track">
              {[...MARQUEE_TECHS, ...MARQUEE_TECHS].map((tech, i) => (
                <span
                  key={i}
                  className={tech === '·' ? 'marquee-dot' : 'marquee-item'}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section
          id="about"
          className="py-32 px-6 relative"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="container mx-auto max-w-6xl">
            {/* Section label */}
            <div className="section-label">
              <User size={12} /> About Me
            </div>

            <div className="flex flex-col lg:flex-row gap-14 items-start">
              {/* Left: Photo + Bio */}
              <div className="lg:w-5/12">
                {/* Photo */}
                <div className="inline-block mb-8 p-[3px] rounded-[26px]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(61,255,162,0.4) 0%, rgba(91,156,246,0.3) 50%, rgba(255,255,255,0.1) 100%)',
                  }}>
                  <div className="rounded-[23px] overflow-hidden" style={{ background: '#0d1122' }}>
                    <img
                      src="/resources/user1.jpg"
                      alt="Secondio Prawiro"
                      className="w-48 h-48 object-cover block"
                    />
                  </div>
                </div>

                <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-2 leading-tight">
                  Born to live,
                </h2>
                <h2 className="font-display font-bold text-4xl md:text-5xl mb-8 leading-tight" style={{ color: 'rgba(221,228,240,0.25)' }}>
                  live to learn.
                </h2>

                <div className="space-y-4 text-base leading-relaxed mb-10" style={{ color: 'rgba(221,228,240,0.45)' }}>
                  <p>
                    I'm Secondio Prawiro, a fresh graduate from Duta Wacana Christian University with a Bachelor's degree in Informatics.
                    My focus is on creating engaging interactive experiences that merge solid code with compelling design.
                  </p>
                  <p>
                    With a strong interest in game development and interactive applications, I am eager to apply my skills to build products that leave a lasting impact.
                  </p>
                </div>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
                  style={{ color: '#3dffa2' }}
                >
                  Let's Work Together <ArrowRight size={14} />
                </button>
              </div>

              {/* Right: Skills */}
              <div className="lg:w-7/12 w-full">
                <div className="glass-panel p-8">
                  <h3 className="font-display font-bold text-white text-xl mb-8 flex items-center gap-2">
                    <Cpu size={18} style={{ color: '#3dffa2' }} /> Technical Skills
                  </h3>

                  <div className="space-y-5">
                    {SKILLS.map(({ label, color, items }) => (
                      <div key={label} className="flex gap-5 items-start">
                        <div className="w-24 shrink-0 pt-0.5">
                          <span
                            className="text-xs font-semibold tracking-wide uppercase"
                            style={{ color }}
                          >
                            {label}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map(item => (
                            <span key={item} className="skill-tag">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GitHub Contributions ── */}
        <section
          id="contributions"
          className="py-32 px-6 relative"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          {/* Ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '50%', right: '5%', transform: 'translateY(-50%)',
              width: 500, height: 500,
              background: 'radial-gradient(circle, rgba(61,255,162,0.04) 0%, transparent 70%)',
            }}
          />

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-14">
              <div className="section-label justify-center">
                <Github size={12} /> Open Source Activity
              </div>
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
                My GitHub Contribution
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(221,228,240,0.35)' }}>
                A visual map of my coding activity and open source contributions.
              </p>
            </div>

            <div className="calendar-glass">
              <GitHubCalendar username="secondioprawiro" />
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://github.com/secondioprawiro"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
                style={{ color: 'rgba(221,228,240,0.25)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(221,228,240,0.65)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(221,228,240,0.25)')}
              >
                View full profile on GitHub <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section
          id="projects"
          className="py-32 px-6 relative"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
              <div>
                <div className="section-label">
                  <Briefcase size={12} /> My Work
                </div>
                <h2 className="font-display font-bold text-white text-4xl md:text-5xl">
                  Featured Projects
                </h2>
                <p className="mt-2 text-sm" style={{ color: 'rgba(221,228,240,0.35)' }}>
                  A selection of my best work.{' '}
                  <a
                    href="https://github.com/secondioprawiro"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#3dffa2' }}
                    className="hover:underline"
                  >
                    More on GitHub →
                  </a>
                </p>
              </div>

              {/* Filter bar */}
              <div className="flex flex-wrap gap-2">
                {Object.values(Category).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                    style={selectedCategory === cat ? {
                      background: 'linear-gradient(180deg, #3dffa2 0%, #1de882 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 0 20px rgba(61,255,162,0.25)',
                      color: '#07090f',
                      fontWeight: 700,
                    } : {
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(221,228,240,0.45)',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.slice(0, 3).map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isDescExpanded={expandedDescriptions.has(project.id)}
                    onToggleDesc={() => toggleDescription(project.id)}
                  />
                ))}
              </div>

              <div className={`expand-container ${isExpanded ? 'is-open' : ''}`}>
                <div className="expand-content">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-5">
                    {filteredProjects.slice(3).map((project, index) => (
                      <div
                        key={project.id}
                        className={isExpanded ? 'animate-reveal' : ''}
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        <ProjectCard
                          project={project}
                          isDescExpanded={expandedDescriptions.has(project.id)}
                          onToggleDesc={() => toggleDescription(project.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {filteredProjects.length > 3 && (
              <div className="mt-10 flex justify-center">
                <button onClick={() => setIsExpanded(!isExpanded)} className="btn-secondary">
                  {isExpanded
                    ? <><ChevronUp size={16} /> Show Less</>
                    : <><ChevronDown size={16} /> Show More</>}
                </button>
              </div>
            )}

            {filteredProjects.length === 0 && (
              <div className="text-center py-20 glass-panel">
                <p className="text-sm mb-3" style={{ color: 'rgba(221,228,240,0.3)' }}>
                  No projects in this category yet.
                </p>
                <button
                  onClick={() => setSelectedCategory(Category.ALL)}
                  className="text-sm font-medium hover:underline"
                  style={{ color: '#3dffa2' }}
                >
                  View all projects
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Contact ── */}
        <section
          id="contact"
          className="py-32 px-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="container mx-auto max-w-4xl text-center">
            <div className="section-label justify-center">
              <Mail size={12} /> Get in Touch
            </div>

            <h2 className="font-display font-bold text-white mb-2" style={{ fontSize: 'clamp(36px, 6vw, 60px)' }}>
              Let's Build
            </h2>
            <h2 className="font-display font-bold mb-8" style={{ fontSize: 'clamp(36px, 6vw, 60px)', color: 'rgba(221,228,240,0.2)' }}>
              Something Great
            </h2>

            <p className="text-base mb-16 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(221,228,240,0.4)' }}>
              Looking for full-time opportunities in web dev, game dev, or anything creative. Let's talk.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* GitHub */}
              <a
                href="https://github.com/secondioprawiro"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <div className="contact-icon" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#dde4f0' }}>
                  <Github size={22} />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-1">GitHub</h3>
                <span className="text-sm transition-colors" style={{ color: 'rgba(221,228,240,0.35)' }}>@secondioprawiro</span>
              </a>

              {/* Email */}
              <a
                href="mailto:kristinarrang08@gmail.com"
                className="contact-card"
              >
                <div className="contact-icon" style={{ background: 'rgba(61,255,162,0.1)', border: '1px solid rgba(61,255,162,0.2)', color: '#3dffa2' }}>
                  <Mail size={22} />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-1">Email</h3>
                <span className="text-sm transition-colors" style={{ color: 'rgba(221,228,240,0.35)' }}>kristinarrang08@gmail.com</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/secondio-prawiro/"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <div className="contact-icon" style={{ background: 'rgba(91,156,246,0.1)', border: '1px solid rgba(91,156,246,0.2)', color: '#5b9cf6' }}>
                  <Linkedin size={22} />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-1">LinkedIn</h3>
                <span className="text-sm transition-colors" style={{ color: 'rgba(221,228,240,0.35)' }}>Secondio Prawiro</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer
        className="py-8 px-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(7,9,15,0.6)' }}
      >
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <button
            onClick={() => scrollToSection('home')}
            className="font-display font-bold text-base transition-colors duration-200"
            style={{ color: 'rgba(221,228,240,0.35)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(221,228,240,0.35)')}
          >
            Secondio Prawiro
          </button>

          <div className="flex gap-7 text-sm" style={{ color: 'rgba(221,228,240,0.25)' }}>
            {(['home', 'about', 'projects', 'contact'] as const).map(id => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="capitalize transition-colors duration-200 hover:text-white/70"
              >
                {id}
              </button>
            ))}
          </div>

          <p className="text-sm" style={{ color: 'rgba(221,228,240,0.2)' }}>
            © 2026 · All rights reserved
          </p>
        </div>
      </footer>

    </div>
  );
};

export default App;
