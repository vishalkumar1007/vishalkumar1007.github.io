import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar, MapPin, ChevronRight, Shield, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      id: 1,
      role: 'Associate Software Developer',
      company: 'InstaSafe Technologies',
      location: 'Bangalore, India',
      period: 'March 2025 - Present',
      type: 'Full-time',
      description: 'Working on InstaSafe\'s ZTNA platform and SafeHats bug bounty system, improving secure access and vulnerability reporting features. Managing GitLab CI/CD pipelines and developing backend REST APIs.',
      achievements: [
        'Managed GitLab CI/CD pipelines & deployment monitoring',
        'Enhanced UI across portals using Angular & Svelte',
        'Enhanced MZTNA Android agent with SSO support',
        'Developed backend REST APIs in Go for secure authentication',
      ],
      skills: ['Angular', 'Svelte', 'Go', 'GitLab CI/CD', 'Java (Android)'],
      icon: Shield,
      color: 'red',
    },
    {
      id: 2,
      role: 'Full Stack Developer Intern',
      company: 'Appenius Private Limited',
      location: 'Remote',
      period: 'July 2023 - Sep 2023',
      type: 'Internship',
      description: 'Developed backend server with API routes to perform CRUD operations using MongoDB. Implemented secure user authentication with OTP-based account recovery and token-based session handling.',
      achievements: [
        'Built backend server with API routes for CRUD operations',
        'Implemented OTP-based account recovery system',
        'Developed token-based session handling',
        'Created secure user authentication system',
      ],
      skills: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JWT'],
      icon: Code2,
      color: 'orange',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.experience-heading',
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

      // Timeline line animation
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Experience cards stagger
      gsap.fromTo(
        '.experience-card',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Timeline dots pop
      gsap.fromTo(
        '.timeline-dot',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          stagger: 0.2,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
      red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', glow: 'bg-red-500' },
      orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', glow: 'bg-orange-500' },
      blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'bg-blue-500' },
      green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', glow: 'bg-green-500' },
    };
    return colors[color] || colors.red;
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/5 via-black to-[#0a0a0a]" />
      
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

      <div className="relative w-full px-6 lg:px-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 experience-heading">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-red-500" />
            <span className="text-sm font-medium text-red-400 tracking-wider uppercase">Career</span>
            <div className="h-px w-12 bg-red-500" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat'] mb-4">
            PROFESSIONAL <span className="text-gradient">EXPERIENCE</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A journey through full-stack development, from learning the fundamentals 
            to building scalable enterprise applications and secure systems.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical Line */}
          <div className="timeline-line absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500 via-red-500/50 to-transparent origin-top" style={{ transform: 'translateX(-50%)' }} />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const colors = getColorClasses(exp.color);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`experience-card relative flex flex-col md:flex-row gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline Dot */}
                  <div className="timeline-dot absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-red-500 border-4 border-black z-10" style={{ transform: 'translateX(-50%)' }}>
                    <div className={`absolute inset-0 rounded-full ${colors.glow} animate-ping opacity-50`} />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ml-8 md:ml-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`group p-6 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-2xl hover:border-red-500/30 transition-all duration-500 ${isEven ? '' : ''}`}>
                      {/* Header */}
                      <div className={`flex items-start gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-7 h-7 ${colors.text}`} />
                        </div>
                        <div className={`flex-1 ${isEven ? 'md:text-right' : ''}`}>
                          <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                            {exp.role}
                          </h3>
                          <div className={`flex items-center gap-2 mt-1 text-sm ${isEven ? 'md:justify-end' : ''}`}>
                            <Building2 className="w-4 h-4 text-red-500" />
                            <span className="text-white/70">{exp.company}</span>
                          </div>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className={`flex flex-wrap gap-4 text-sm text-white/50 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${colors.bg} ${colors.text} ${colors.border} border`}>
                          {exp.type}
                        </span>
                      </div>

                      {/* Description */}
                      <p className={`text-white/60 text-sm leading-relaxed mb-4 ${isEven ? 'md:text-right' : ''}`}>
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className={`text-xs text-white/40 uppercase tracking-wider mb-2 ${isEven ? 'md:text-right' : ''}`}>
                          Key Achievements
                        </h4>
                        <ul className={`space-y-1 ${isEven ? 'md:items-end' : ''}`}>
                          {exp.achievements.slice(0, 3).map((achievement, i) => (
                            <li key={i} className={`flex items-center gap-2 text-sm text-white/70 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                              <ChevronRight className="w-3 h-3 text-red-500 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-white/60"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

