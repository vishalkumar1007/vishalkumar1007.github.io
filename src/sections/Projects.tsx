import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, TrendingUp, Share2, Layers, Code2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();

  const projects: Project[] = [
    {
      id: 1,
      title: 'EquiGroww - Stock Trading Platform',
      category: 'Full Stack MERN',
      description: 'Built a MERN-based trading app with user authentication, Razorpay payment integration, and stock buy/sell features. Implemented secure login with JWT and email-based OTP.',
      image: '/project-1.jpg',
      tech: ['React.js', 'Redux Toolkit', 'Node.js', 'MongoDB', 'Razorpay'],
      icon: TrendingUp,
      stats: { features: '10+', stack: 'MERN' },
      link: 'https://vishalkumar1007.github.io/Groww',
      github: 'https://github.com/vishalkumar1007',
      isCollection: false,
    },
    {
      id: 2,
      title: 'Share Multiverse',
      category: 'Content Sharing Platform',
      description: 'A real-world platform to share text and images via unique codes or QR. Features login-based history tracking, user signup, auto-login, and secure token-based authentication.',
      image: '/project-2.jpg',
      tech: ['React.js', 'Vite', 'Node.js', 'SQL', 'QR Code'],
      icon: Share2,
      stats: { auth: 'JWT', sharing: 'QR/Code' },
      link: 'https://vishalkumar1007.github.io/share',
      github: 'https://github.com/vishalkumar1007',
      isCollection: false,
    },
    {
      id: 3,
      title: 'Portfolio Website',
      category: 'Web Development',
      description: 'Modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS featuring GSAP animations and a sleek dark theme.',
      image: '/project-3.jpg',
      tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
      icon: Code2,
      stats: { responsive: 'Yes', animations: 'GSAP' },
      link: 'https://vishalkumar07.me',
      github: 'https://github.com/vishalkumar1007',
      isCollection: false,
    },
    {
      id: 4,
      title: 'Full Stack Projects',
      category: 'Various Applications',
      description: 'Collection of projects including Groww Clone, URL Shortener, News App, Github User finder, and API preview tools showcasing MERN stack expertise.',
      image: '/project-4.jpg',
      tech: ['JavaScript', 'React.js', 'Node.js', 'MongoDB', 'Express.js'],
      icon: Layers,
      stats: { projects: '10+', skills: 'MERN' },
      link: '/projects',
      github: 'https://github.com/vishalkumar1007',
      isCollection: true,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Project cards stagger animation
      gsap.fromTo(
        '.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/5 via-black to-black" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto relative">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-red-500" />
            <span className="text-sm font-medium text-red-400 tracking-wider uppercase">Portfolio</span>
            <div className="h-px w-12 bg-red-500" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat'] mb-4">
            MY <span className="text-gradient">PROJECTS</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A showcase of full-stack applications, web platforms, 
            and tools built to solve real-world problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onNavigate={() => navigate(project.link)} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectStats {
  [key: string]: string | number;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  icon: React.ElementType;
  stats: ProjectStats;
  link: string;
  github: string;
  isCollection: boolean;
}

const ProjectCard = ({ project, onNavigate }: { project: Project; onNavigate: () => void }) => {
  const Icon = project.icon;
  
  const handleClick = (e: React.MouseEvent) => {
    if (project.isCollection) {
      e.preventDefault();
      onNavigate();
    }
  };
  
  return (
    <div className="project-card group relative bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all duration-500">
      {/* Top Section with Icon */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          {/* Icon & Category */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
              <Icon className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <span className="text-xs text-red-400 font-medium uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-lg font-bold font-['Montserrat'] text-white group-hover:text-red-400 transition-colors">
                {project.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Stats */}
        <div className="flex gap-4 mb-4">
          {Object.entries(project.stats).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="text-lg font-bold text-red-400">{value}</span>
              <span className="text-xs text-white/40 uppercase">{key}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-white/70"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons - Always Visible */}
        <div className="flex gap-3">
          {project.isCollection ? (
            <button
              onClick={handleClick}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-500 transition-all duration-300 hover:scale-[1.02]"
              style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' }}
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-500 transition-all duration-300 hover:scale-[1.02]"
                style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/20 text-white rounded-xl hover:border-white/40 hover:bg-white/10 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </a>
            </>
          )}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      
      {/* Corner Glow on Hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default Projects;
