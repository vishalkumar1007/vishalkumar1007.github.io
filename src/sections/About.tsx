import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Shield, Server, Target, Award, CheckCircle, Code2, Database, Globe, GitBranch } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Modern circular skill card component
const SkillCard = ({ 
  skill, 
  percentage, 
  delay, 
  icon: Icon 
}: { 
  skill: string; 
  percentage: number; 
  delay: number;
  icon: React.ElementType;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  // Circle properties
  const size = 80;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (isVisible ? (percentage / 100) * circumference : circumference);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  // Animate counter
  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = percentage;
      const duration = 1500;
      const stepTime = duration / end;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isVisible, percentage]);

  return (
    <div 
      ref={cardRef}
      className="skill-card group relative p-5 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-2xl hover:border-red-500/50 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-600/0 group-hover:from-red-500/10 group-hover:to-red-600/5 transition-all duration-500 rounded-2xl" />
      
      {/* Animated corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex items-center gap-4">
        {/* Circular Progress */}
        <div className="relative flex-shrink-0">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#skillGradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out"
              style={{
                filter: isVisible ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))' : 'none'
              }}
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        {/* Skill info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-sm lg:text-base truncate group-hover:text-red-400 transition-colors">
            {skill}
          </h4>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl lg:text-3xl font-bold text-white">{count}</span>
            <span className="text-red-400 text-sm font-medium">%</span>
          </div>
          
          {/* Mini progress bar */}
          <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: isVisible ? `${percentage}%` : '0%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal with 3D effect
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50, rotateY: -10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Red accent block animation
      gsap.fromTo(
        '.red-accent-block',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Heading animation
      gsap.fromTo(
        '.about-heading',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Paragraphs reveal
      gsap.fromTo(
        '.about-paragraph',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        '.stat-item',
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Certifications reveal
      gsap.fromTo(
        '.cert-badge',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.certs-container',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Services list animation
      gsap.fromTo(
        '.service-item',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-list',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Skill cards animation
      gsap.fromTo(
        '.skill-card',
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Code2, value: '100+', label: 'DSA Problems Solved' },
    { icon: Server, value: '10+', label: 'Projects Built' },
    { icon: Target, value: '8.2', label: 'CGPA' },
    { icon: Shield, value: '1+', label: 'Years Experience' },
  ];

  const skills = [
    { name: 'React.js & Frontend', percentage: 90, icon: Globe },
    { name: 'Node.js & Backend', percentage: 88, icon: Server },
    { name: 'MongoDB & Databases', percentage: 85, icon: Database },
    { name: 'Git & CI/CD', percentage: 82, icon: GitBranch },
  ];

  const certifications = ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Redux'];

  const services = [
    'Full Stack Development',
    'API Development',
    'Database Design',
    'CI/CD Automation',
    'UI/UX Implementation',
  ];

  const DownloadMyCv = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1Qkv4cXghbpxTOmBcjl8Sn72WYWPas_sw/view?usp=sharing';
    link.download = 'Vishal_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-black overflow-hidden"
      
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/10" />
      
      {/* Subtle Grid */}
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

      {/* Diagonal Line Decoration */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="1080"
          x2="1920"
          y2="0"
          stroke="rgba(239, 68, 68, 0.3)"
          strokeWidth="1"
        />
      </svg>

      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <div
            ref={imageRef}
            className="relative order-2 lg:order-1"
            style={{ perspective: '1000px' }}
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/vishal-image-5.jpeg"
                  alt="Vishal Kumar"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              {/* Red Accent Block */}
              <div className="red-accent-block absolute -bottom-6 -right-6 w-32 h-32 lg:w-48 lg:h-48 bg-red-600 rounded-xl -z-10" />
              
              {/* Experience Badge */}
              <div className="absolute bottom-6 left-6 px-5 py-4 bg-black/90 backdrop-blur-sm border border-white/10 rounded-xl">
                <p className="text-3xl lg:text-4xl font-bold text-red-500">1+</p>
                <p className="text-sm text-white/60">Years of Excellence</p>
              </div>

              {/* Floating Certifications */}
              <div className="certs-container absolute -top-4 -right-4 lg:-right-8 flex flex-col gap-2">
                {['B.Tech', 'MERN'].map((cert) => (
                  <span
                    key={cert}
                    className="cert-badge px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg shadow-lg"
                    style={{ boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)' }}
                  >
                    <Award className="w-3 h-3 inline mr-1" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="space-y-8 order-1 lg:order-2">
            {/* Section Label */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-red-500" />
              <span className="text-sm font-medium text-red-400 tracking-wider uppercase">About Me</span>
            </div>

            <h2 className="about-heading text-3xl md:text-4xl lg:text-5xl font-bold font-['Montserrat'] text-white">
              Building Scalable Apps,
              <br />
              <span className="text-gradient">One Feature at a Time</span>
            </h2>

            <div className="space-y-4">
              <p className="about-paragraph text-base lg:text-lg text-white/70 leading-relaxed">
                Results-driven Full Stack Developer with <span className="text-red-400 font-semibold">1+ years</span> of experience 
                building scalable MERN applications and secure enterprise products. Currently working as an 
                Associate Software Developer at InstaSafe Technologies, contributing to ZTNA platform and cybersecurity solutions.
              </p>
              
              <p className="about-paragraph text-base lg:text-lg text-white/70 leading-relaxed">
                Skilled in React.js, Node.js, and MongoDB, with additional expertise in GitLab CI/CD automation, 
                Go, and cybersecurity concepts. Focused on delivering secure, efficient, and user-centric solutions 
                that solve real-world problems.
              </p>
            </div>

            {/* Services List */}
            <div className="services-list grid grid-cols-2 gap-3 pt-2">
              {services.map((service, index) => (
                <div key={index} className="service-item flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-white/70">{service}</span>
                </div>
              ))}
            </div>

            {/* Skills - Modern Cards */}
            <div className="skills-section space-y-4 pt-4">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Core Skills</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill.name}
                    percentage={skill.percentage}
                    delay={index * 150}
                    icon={skill.icon}
                  />
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="certs-container pt-2">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span
                    key={cert}
                    className="cert-badge px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/80 hover:border-red-500/50 hover:bg-red-500/10 transition-colors"
                  >
                    <Award className="w-3 h-3 inline mr-2 text-red-500" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="group inline-flex items-center gap-3 px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-500 transition-all duration-300 hover:scale-105"
                style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' }}
                onClick={DownloadMyCv}
              >
                <Download className="w-4 h-4" />
                Download CV
              </button>
              
              <button className="group inline-flex items-center gap-3 px-6 py-3 border border-white/20 text-white rounded-full hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300" onClick={() => scrollToSection("#achievements")}>
                <Shield className="w-4 h-4 text-red-500"/>
                View Certifications
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mt-16 lg:mt-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item relative group p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-red-500/50 transition-all duration-300 text-center"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-600/0 group-hover:from-red-500/10 group-hover:to-red-600/10 rounded-2xl transition-all duration-300" />
              
              <div className="relative">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/50 mt-2">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
