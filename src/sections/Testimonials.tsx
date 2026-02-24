import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Calendar, MapPin, Award, Users, Zap, Target, Flag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Activities = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const hackathons = [
    {
      id: 1,
      title: 'DEF CON CTF',
      position: '3rd Place',
      year: '2024',
      location: 'Las Vegas, USA',
      description: 'Competed in one of the world\'s most prestigious hacking competitions, solving advanced exploitation challenges.',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      teamSize: 8,
    },
    {
      id: 2,
      title: 'Pwn2Own',
      position: 'Winner',
      year: '2023',
      location: 'Vancouver, Canada',
      description: 'Successfully exploited zero-day vulnerability in enterprise software, earning $50,000 bounty.',
      icon: Award,
      color: 'from-red-500 to-pink-500',
      teamSize: 3,
    },
    {
      id: 3,
      title: 'Google CTF',
      position: 'Top 10',
      year: '2023',
      location: 'Online',
      description: 'Ranked in top 10 globally among 5000+ teams in binary exploitation and web security challenges.',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      teamSize: 5,
    },
  ];

  const activities = [
    {
      title: 'Bug Bounty Hunter',
      description: 'Active researcher on HackerOne & Bugcrowd',
      stat: '150+ Reports',
      icon: Bug,
    },
    {
      title: 'Security Trainer',
      description: 'Conducted workshops at universities',
      stat: '500+ Students',
      icon: Users,
    },
    {
      title: 'Open Source',
      description: 'Maintainer of security tools on GitHub',
      stat: '2K+ Stars',
      icon: Zap,
    },
    {
      title: 'CTF Team Lead',
      description: 'Leading "CyberPhantoms" CTF team',
      stat: 'Top 50 Global',
      icon: Flag,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.activities-heading',
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

      // Hackathon cards animation
      gsap.fromTo(
        '.hackathon-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.hackathons-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Activity cards animation
      gsap.fromTo(
        '.activity-card',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.activities-grid',
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
          <div className="activities-heading">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-red-500" />
              <span className="text-sm font-medium text-red-400 tracking-wider uppercase">Achievements</span>
              <div className="h-px w-12 bg-red-500" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat'] mb-4">
              HACKATHONS & <span className="text-gradient">ACTIVITIES</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Competing in CTF competitions, contributing to the security community, 
              and continuously pushing the boundaries of offensive security.
            </p>
          </div>
        </div>

        {/* Hackathons Grid */}
        <div className="hackathons-grid grid md:grid-cols-3 gap-6 mb-16">
          {hackathons.map((hackathon) => {
            const Icon = hackathon.icon;
            return (
              <div
                key={hackathon.id}
                className="hackathon-card group relative bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-500 overflow-hidden"
              >
                {/* Gradient Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${hackathon.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                
                {/* Icon & Position */}
                <div className="flex items-start justify-between mb-4 relative">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${hackathon.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${hackathon.color} text-white`}>
                    {hackathon.position}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-['Montserrat'] text-white mb-2 group-hover:text-red-400 transition-colors">
                  {hackathon.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-white/50 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {hackathon.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {hackathon.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {hackathon.description}
                </p>

                {/* Team Size */}
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-red-400" />
                  <span className="text-white/50">Team of {hackathon.teamSize}</span>
                </div>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            );
          })}
        </div>

        {/* Activities Grid */}
        <div className="activities-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className="activity-card group relative p-5 bg-white/[0.02] border border-white/10 rounded-xl hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-white text-sm mb-1">{activity.title}</h4>
                <p className="text-white/40 text-xs mb-2 leading-relaxed">{activity.description}</p>
                <span className="text-red-400 text-sm font-bold">{activity.stat}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Bug icon component (not from lucide)
const Bug = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2l1.88 1.88M14.12 3.88L16 2M9 7.13v-1a3 3 0 1 1 6 0v1M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M6 17H3M21 5c0 2.1-1.6 3.8-3.53 4M18 13h4M18 17h3" />
  </svg>
);

export default Activities;
