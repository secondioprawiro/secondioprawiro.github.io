import React, { useState, useEffect } from 'react';
import { LayoutGrid, Linkedin, Mail, Code, User, Briefcase, Cpu, ArrowRight, Home, Instagram, Github } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import { Project, Category } from './types';

// Mock initial data
const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive admin dashboard to monitor sales, inventory, and customer analytics with real-time data visualization.',
    category: Category.WEB,
    tags: ['React', 'TypeScript', 'Tailwind', 'ChartJS'],
    imageUrl: '',
    link: '#'
  },
  {
    id: '2',
    title: 'Finance Tracker App',
    description: 'A cross-platform mobile application for personal finance tracking with an automatic OCR-based receipt scanning feature.',
    category: Category.MOBILE,
    tags: ['Flutter', 'Dart', 'Firebase', 'OCR'],
    imageUrl: '',
    link: '#'
  },
  {
    id: '3',
    title: 'Modern Brand Identity',
    description: 'Complete visual identity design for a financial technology startup, including logo, color palette, and typography.',
    category: Category.DESIGN,
    tags: ['Figma', 'Illustrator', 'Branding'],
    imageUrl: ''
  }
];

const App: React.FC = () => {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<Category | string>(Category.ALL);
  const [activeSection, setActiveSection] = useState('home');

  const filteredProjects = selectedCategory === Category.ALL
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 64; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];

      // Special case for the bottom of the page to ensure 'contact' is highlighted
      const bottomOfPage = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2; // 2px buffer
      if (bottomOfPage) {
        setActiveSection('contact');
        return;
      }
      
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is somewhat in the middle of viewport or top
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavItem = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <button 
      onClick={() => scrollToSection(id)} 
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm
        ${activeSection === id 
          ? 'bg-slate-800 text-white shadow-lg border border-slate-700/50 scale-105' 
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-primary text-slate-200 font-sans selection:bg-accent selection:text-slate-900">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')} 
            className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
          >
            <div className="bg-gradient-to-tr from-indigo-500 to-accent p-1.5 rounded-lg">
              <LayoutGrid size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">MyPorto</span>
          </button>
          
          <div className="hidden md:flex gap-2 items-center p-1 bg-slate-950/50 rounded-xl border border-slate-800/50">
            <NavItem id="home" label="Home" icon={Home} />
            <NavItem id="about" label="About" icon={User} />
            <NavItem id="projects" label="Projects" icon={Briefcase} />
            <NavItem id="contact" label="Contact" icon={Mail} />
          </div>

          {/* Spacer for mobile layout balance if needed, or just empty */}
          <div className="w-[100px] hidden md:block"></div> 
        </div>
      </nav>

      <main className="flex flex-col gap-0">
        
        {/* Hero Section (Beranda) */}
        <section id="home" className="py-24 px-4 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] -z-10"></div>
          
          <div className="container mx-auto max-w-4xl z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm text-accent text-sm font-medium animate-fade-in-up shadow-lg shadow-accent/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Open to Work & Collaboration
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
              Hello There, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-indigo-500">
                Welcome to My Portofolio
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center w-full sm:w-auto">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all w-full sm:w-auto flex items-center justify-center gap-2 group shadow-lg shadow-white/10"
              >
                View My Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 rounded-full border border-slate-700 hover:bg-slate-800 text-white font-semibold transition-all w-full sm:w-auto"
              >
                Contact Me
              </button>
            </div>
          </div>
        </section>

        {/* About Section (Tentang) */}
        <section id="about" className="py-24 relative overflow-hidden bg-slate-900/30 border-y border-slate-800/50">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              {/* Left Column: Bio */}
              <div className="lg:w-5/12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium border border-indigo-500/20 mb-6">
                  <User size={16} /> About Me
                </div>

                <img 
                  src="/resources/user1.jpg"
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover mb-8 border-4 border-slate-700 shadow-lg"
                />
                
                <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                  Born to live <br />
                  <span className="text-indigo-400">Live to learn.</span>
                </h2>
                <div className="space-y-6 text-slate-400 text-lg leading-relaxed mb-8">
                  <p>
                    I'm Secondio Prawiro, a fresh graduate from Duta Wacana Christian University with a Bachelor's degree in Informatics. 
                    My focus is on creating engaging interactive experiences that merge solid code with compelling design. 
                    I enjoy the process of transforming abstract logic into playable, user-friendly realities
                  </p>
                  <p>
                    With a strong interest in game development and interactive applications, I am eager to apply my skills to build products that leave a lasting impact.                  
                  </p>
                </div>

                <button 
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-2 text-white font-semibold border-b-2 border-accent hover:border-white transition-colors pb-1 group"
                >
                  Let's Work Together 
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Right Column: Skills */}
              <div className="lg:w-7/12 w-full lg:mt-12">
                <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 relative">
                  <div className="absolute top-0 right-0 p-32 bg-accent/5 rounded-full blur-3xl -z-10"></div>
                  
                  <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                    <Cpu size={24} className="text-indigo-400" /> Technical Skills
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Skill Category 1 */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> Frontend & Web
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'Tailwind', 'Next.js', 'Vue.js', 'Bootstrap'].map((tech) => (
                          <span key={tech} className="px-3 py-1.5 bg-slate-950 text-slate-300 rounded-lg text-sm border border-slate-800 hover:border-blue-500/50 hover:text-white transition-colors cursor-default">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skill Category 2: GAME DEV (New) */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span> Game Development
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Unity 3D', 'C#','Blender'].map((tech) => (
                          <span key={tech} className="px-3 py-1.5 bg-slate-950 text-slate-300 rounded-lg text-sm border border-slate-800 hover:border-purple-500/50 hover:text-white transition-colors cursor-default">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skill Category 3 */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Backend & Cloud
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Node.js', 'Laravel', 'MySQL', 'SQLite' , 'Docker'].map((tech) => (
                          <span key={tech} className="px-3 py-1.5 bg-slate-950 text-slate-300 rounded-lg text-sm border border-slate-800 hover:border-green-500/50 hover:text-white transition-colors cursor-default">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skill Category 4 */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-pink-500"></span> Programming Language
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['C', 'C#', 'Java', 'Python', 'PHP', 'Javascript', 'Kotlin', 'Dart'].map((tech) => (
                          <span key={tech} className="px-3 py-1.5 bg-slate-950 text-slate-300 rounded-lg text-sm border border-slate-800 hover:border-pink-500/50 hover:text-white transition-colors cursor-default">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skill Category 5 */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Mobile Dev
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Kotlin', 'Flutter'].map((tech) => (
                          <span key={tech} className="px-3 py-1.5 bg-slate-950 text-slate-300 rounded-lg text-sm border border-slate-800 hover:border-green-500/50 hover:text-white transition-colors cursor-default">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 relative overflow-hidden bg-slate-900/30 border-y border-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20 mb-6">
                  <Briefcase size={16} /> My Work
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">
                  Featured Projects
                </h2>
                <p className="text-slate-400 text-lg">A collection of the best projects I have completed.</p>
              </div>
              
              {/* Filter Bar */}
              <div className="flex flex-wrap gap-2">
                {Object.values(Category).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === cat
                        ? 'bg-accent text-slate-900 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20 bg-slate-800/50 rounded-2xl border border-slate-700 border-dashed">
                <p className="text-lg text-slate-400">No projects in this category yet.</p>
                <button 
                  onClick={() => setSelectedCategory(Category.ALL)}
                  className="mt-4 text-accent hover:underline"
                >
                  View all projects
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section (New) */}
        <section id="contact" className="pt-48 pb-24 bg-gradient-to-b from-primary to-slate-950 border-t border-slate-800/50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20 mb-6">
              <Mail size={16} /> Contact Person
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              I'm looking for a job
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
              Feel free to contact me about any opportunity, or just to chat about game dev, coding or anything else.            
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Instagram */}
              <a 
                href="https://github.com/secondioprawiro" 
                target="_blank" 
                rel="noreferrer"
                className="flex flex-col items-center p-8 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-pink-500/50 transition-all hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center text-pink-500 mb-4 group-hover:scale-110 transition-transform">
                  <Github size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Github</h3>
                <span className="text-pink-400 text-sm font-medium group-hover:underline">@secondioprawiro</span>
              </a>

              {/* Email */}
              <a 
                href="mailto:hello@example.com" 
                className="flex flex-col items-center p-8 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-accent/50 transition-all hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                  <Mail size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                <span className="text-accent text-sm font-medium group-hover:underline">kristinarrang08@gmail.com</span>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/secondio-prawiro/" 
                target="_blank" 
                rel="noreferrer"
                className="flex flex-col items-center p-8 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                  <Linkedin size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">LinkedIn</h3>
                <span className="text-blue-400 text-sm font-medium group-hover:underline">Secondio Prawiro</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 bg-black text-slate-500 text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => scrollToSection('home')}>
            <LayoutGrid size={20} />
            <span className="font-bold text-lg text-slate-300">MyPorto</span>
          </div>
          
          <div className="flex gap-6">
            <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-white transition-colors">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button>
          </div>

          <p>All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;