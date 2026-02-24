import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin, BookOpen, Award, Code2, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.education-heading',
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

      // Card animation
      gsap.fromTo(
        '.education-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.education-card',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        '.edu-stat',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.edu-stats',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Highlights animation
      gsap.fromTo(
        '.edu-highlight',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.edu-highlights',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'CGPA', value: '7.8', icon: Award },
    { label: 'DSA Problems', value: '250+', icon: Code2 },
    { label: 'Projects', value: '10+', icon: BookOpen },
    { label: 'Hackathons', value: 'Top 20', icon: Trophy },
  ];

  const highlights = [
    'Specialized in Full Stack Web Development',
    'Strong foundation in Data Structures & Algorithms',
    'Top 20 teams in Innovate Odisha Hackathon',
    'Built multiple production-ready applications',
    'Active participation in coding competitions',
    'Self-taught React.js, Node.js, and MongoDB',
  ];

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-red-950/5" />
      
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
        <div className="text-center mb-16 education-heading">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-red-500" />
            <span className="text-sm font-medium text-red-400 tracking-wider uppercase">Academic Background</span>
            <div className="h-px w-12 bg-red-500" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat'] mb-4">
            MY <span className="text-gradient">EDUCATION</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Building a strong foundation in technology and engineering 
            while pursuing passion for software development.
          </p>
        </div>

        {/* Main Education Card */}
        <div className="education-card relative mb-12">
          <div className="relative bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 lg:p-10 hover:border-red-500/30 transition-all duration-500 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-500/10 to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent blur-3xl" />
            
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div>
                {/* Institution Header */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold font-['Montserrat'] text-white mb-2">
                      Trident Academy of Technology
                    </h3>
                    <p className="text-lg text-red-400 font-medium">
                      Bachelor of Technology (B.Tech)
                    </p>
                    <p className="text-white/60">
                      Electronics & Telecommunications Engineering
                    </p>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <Calendar className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-white/70">2021 - 2025</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-white/70">Bhubaneswar, Odisha</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
                    <Award className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-400 font-semibold">CGPA: 7.8</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="edu-highlights space-y-2">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="edu-highlight flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-white/70 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Content - Stats */}
              <div className="edu-stats grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="edu-stat group relative p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 text-center"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                        <Icon className="w-6 h-6 text-red-500" />
                      </div>
                      <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                      <p className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Learned Section */}
        <div className="text-center">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Key Skills Developed</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['JavaScript', 'React.js', 'Node.js', 'MongoDB', 'Express.js', 'HTML/CSS', 'Git', 'DSA', 'SQL', 'TypeScript', 'Tailwind CSS', 'Redux'].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

