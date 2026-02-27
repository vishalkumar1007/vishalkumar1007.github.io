import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, Medal, ExternalLink, GraduationCap, Code2, Briefcase, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const achievements = [
    {
      id: 1,
      title: 'Innovate Odisha Hackathon',
      position: 'Top 20 / 1,500',
      description: 'Our team was selected as one of the top 20 teams out of 1,500 at the state level hackathon.',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      link: 'https://drive.google.com/file/d/14BuwnWTf9q-6IynWRphPtJk1eT1ON7qq/view',
    },
    {
      id: 2,
      title: 'Microsoft Fundamentals',
      position: 'Certified',
      description: 'Successfully completed Microsoft Fundamentals certification, demonstrating core cloud and technology knowledge.',
      icon: Award,
      color: 'from-blue-500 to-cyan-500',
      link: 'https://drive.google.com/file/d/1Y3DWGcxkEoSLlk0VILVjUZrnvDPaks1z/view',
    },
    {
      id: 3,
      title: 'Hackathon - TAT',
      position: 'Participant',
      description: 'Participated in Hackathon at Trident Academy of Technology, building innovative solutions.',
      icon: Medal,
      color: 'from-purple-500 to-pink-500',
      link: 'https://drive.google.com/file/d/1V-0-0vyUKaqzYKM5ywqGItxxiQhIio6T/view',
    },
    {
      id: 4,
      title: 'Full Stack Intern',
      position: 'Certified',
      description: 'Completed Full Stack Developer Internship at Appenius Private Limited with hands-on MERN experience.',
      icon: Briefcase,
      color: 'from-green-500 to-emerald-500',
      link: 'https://drive.google.com/file/d/1qc9rhzhT_hIoyph0ra6fgYC4fcX6s7rw/view',
    },
  ];

  const highlights = [
    {
      title: '100+ DSA Problems',
      description: 'Solved on LeetCode, GeeksforGeeks & more',
      icon: Code2,
      stat: 'Problem Solver',
    },
    {
      title: 'B.Tech Graduate',
      description: 'Electronics & Telecom Engineering',
      icon: GraduationCap,
      stat: 'CGPA 8.2',
    },
    {
      title: 'Open Source',
      description: 'Contributing to GitHub projects',
      icon: Star,
      stat: '44+ Repos',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.achievements-heading',
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

      // Achievement cards animation
      gsap.fromTo(
        '.achievement-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.achievements-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Highlight cards animation
      gsap.fromTo(
        '.highlight-card',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.highlights-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-red-950/10" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="achievements-heading">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-red-500" />
              <span className="text-sm font-medium text-red-400 tracking-wider uppercase">Recognition</span>
              <div className="h-px w-12 bg-red-500" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat'] mb-4">
              ACHIEVEMENTS & <span className="text-gradient">CERTIFICATES</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Milestones achieved through dedication, continuous learning, 
              and passion for building innovative solutions.
            </p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="achievements-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <a
                key={achievement.id}
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="achievement-card group relative bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-2"
              >
                {/* Gradient Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${achievement.color} opacity-10 blur-2xl group-hover:opacity-30 transition-opacity`} />
                
                {/* Icon & Position */}
                <div className="flex items-start justify-between mb-4 relative">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-red-400 transition-colors" />
                </div>

                {/* Position Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${achievement.color} text-white mb-3`}>
                  {achievement.position}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold font-['Montserrat'] text-white mb-2 group-hover:text-red-400 transition-colors">
                  {achievement.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {achievement.description}
                </p>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </a>
            );
          })}
        </div>

        {/* Highlights Grid */}
        <div className="highlights-grid grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div
                key={index}
                className="highlight-card group relative p-6 bg-white/[0.02] border border-white/10 rounded-xl hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-base mb-0.5">{highlight.title}</h4>
                    <p className="text-white/40 text-xs leading-relaxed">{highlight.description}</p>
                  </div>
                  <span className="text-red-400 text-sm font-bold whitespace-nowrap">{highlight.stat}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;

