import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  TrendingUp, 
  Link2, 
  Newspaper, 
  Search, 
  Code2, 
  Globe, 
  Sparkles,
  ChevronRight,
  Star
} from 'lucide-react';

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  tech: string[];
  liveLink: string;
  githubLink: string;
  color: string;
  featured?: boolean;
}

const FullStackProjects = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: ProjectItem[] = [
    {
      id: 1,
      title: 'Groww Clone',
      description: 'A feature-rich stock trading platform clone with real-time data, portfolio management, and payment integration.',
      icon: TrendingUp,
      tech: ['React.js', 'Redux', 'Node.js', 'MongoDB'],
      liveLink: 'https://vishalkumar1007.github.io/Groww',
      githubLink: 'https://github.com/vishalkumar1007/Groww',
      color: 'from-green-500 to-emerald-600',
      featured: true,
    },
    {
      id: 2,
      title: 'URL Shortener',
      description: 'A powerful URL shortening service with analytics, custom aliases, and QR code generation.',
      icon: Link2,
      tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
      liveLink: 'https://vishalkumar1007.github.io/',
      githubLink: 'https://github.com/vishalkumar1007',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      id: 3,
      title: 'News App',
      description: 'Real-time news aggregator with category filtering, search functionality, and responsive design.',
      icon: Newspaper,
      tech: ['React.js', 'News API', 'Tailwind CSS'],
      liveLink: 'https://vishalkumar1007.github.io/',
      githubLink: 'https://github.com/vishalkumar1007',
      color: 'from-purple-500 to-pink-600',
    },
    {
      id: 4,
      title: 'GitHub User Finder',
      description: 'Search and explore GitHub profiles with detailed stats, repositories, and contribution graphs.',
      icon: Search,
      tech: ['React.js', 'GitHub API', 'CSS3'],
      liveLink: 'https://vishalkumar1007.github.io/',
      githubLink: 'https://github.com/vishalkumar1007',
      color: 'from-gray-600 to-gray-800',
    },
    {
      id: 5,
      title: 'API Preview Tools',
      description: 'Interactive API testing and documentation tool for developers to explore and test endpoints.',
      icon: Code2,
      tech: ['JavaScript', 'REST APIs', 'Fetch API'],
      liveLink: 'https://vishalkumar1007.github.io/',
      githubLink: 'https://github.com/vishalkumar1007',
      color: 'from-orange-500 to-red-600',
    },
    {
      id: 6,
      title: 'Portfolio V1',
      description: 'First version of personal portfolio showcasing projects and skills with vanilla technologies.',
      icon: Globe,
      tech: ['HTML', 'CSS', 'JavaScript'],
      liveLink: 'https://vishalkumar1007.github.io/',
      githubLink: 'https://github.com/vishalkumar1007',
      color: 'from-indigo-500 to-violet-600',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page entrance animation
      gsap.fromTo(
        '.page-header',
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Stats bar animation
      gsap.fromTo(
        '.stats-bar',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: 'power3.out' }
      );

      // Project cards staggered entrance
      gsap.fromTo(
        '.project-item',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.5,
          ease: 'back.out(1.5)',
        }
      );

      // Floating particles animation
      gsap.to('.floating-particle', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-black to-red-950/20 pointer-events-none" />
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute w-2 h-2 rounded-full bg-red-500/20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative">
        {/* Header */}
        <header className="page-header sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
            <div className="flex items-center justify-between">
              {/* Back Button */}
              <button
                onClick={() => navigate('/')}
                className="group flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 text-red-400 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm text-white/70 group-hover:text-white">Back to Portfolio</span>
              </button>

              {/* Title */}
              <div className="hidden md:flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-red-500" />
                <span className="text-lg font-bold font-['Montserrat']">
                  VISHAL<span className="text-red-500">.</span>DEV
                </span>
              </div>

              {/* GitHub Link */}
              <a
                href="https://github.com/vishalkumar1007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm font-medium">View GitHub</span>
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-red-500" />
                <span className="text-sm font-medium text-red-400 tracking-wider uppercase">Project Collection</span>
                <div className="h-px w-12 bg-red-500" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat'] mb-4">
                FULL STACK <span className="text-gradient">PROJECTS</span>
              </h1>
              <p className="text-white/60 max-w-2xl mx-auto text-lg">
                A curated collection of web applications showcasing expertise in MERN stack, 
                API integration, and modern frontend development.
              </p>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar flex flex-wrap justify-center gap-6 lg:gap-12 mb-16">
              {[
                { label: 'Projects', value: '10+' },
                { label: 'Technologies', value: '15+' },
                { label: 'GitHub Repos', value: '44+' },
                { label: 'Experience', value: '2+ Years' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl lg:text-4xl font-bold text-red-400">{stat.value}</p>
                  <p className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="relative pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const Icon = project.icon;
                const isHovered = hoveredProject === project.id;
                
                return (
                  <div
                    key={project.id}
                    className="project-item group relative"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className={`relative h-full bg-gradient-to-br from-white/[0.05] to-transparent border rounded-2xl overflow-hidden transition-all duration-500 ${
                      isHovered ? 'border-red-500/50 scale-[1.02]' : 'border-white/10'
                    }`}>
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-red-600 rounded-full z-10">
                          <Star className="w-3 h-3 text-white fill-white" />
                          <span className="text-xs font-bold text-white">Featured</span>
                        </div>
                      )}

                      {/* Gradient Header */}
                      <div className={`h-32 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="w-16 h-16 text-white/80" />
                        </div>
                        {/* Animated circles on hover */}
                        <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white/10 transition-transform duration-500 ${
                          isHovered ? 'scale-150' : 'scale-100'
                        }`} />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold font-['Montserrat'] text-white mb-2 group-hover:text-red-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-white/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-500 transition-all duration-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </a>
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/20 text-white text-sm rounded-xl hover:border-white/40 hover:bg-white/10 transition-all duration-300"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      {/* Bottom accent line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} transform origin-left transition-transform duration-500 ${
                        isHovered ? 'scale-x-100' : 'scale-x-0'
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View More on GitHub */}
            <div className="text-center mt-16">
              <a
                href="https://github.com/vishalkumar1007?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/20 rounded-full hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
              >
                <span className="text-white font-medium">View All Repositories on GitHub</span>
                <ChevronRight className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Vishal Kumar. Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </footer>
      </div>

      {/* Custom Styles */}
      <style>{`
        .text-gradient {
          background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default FullStackProjects;

