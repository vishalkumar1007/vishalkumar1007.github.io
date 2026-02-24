import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Database, 
  Server, 
  GitBranch, 
  Smartphone, 
  Globe 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Code2,
      title: 'Frontend Development',
      description: 'Building responsive, interactive web applications using React.js, Redux Toolkit, and modern CSS frameworks like Tailwind.',
      color: 'from-blue-500/20 to-blue-600/20',
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Developing robust REST APIs and server-side applications with Node.js, Express.js, and secure authentication systems.',
      color: 'from-purple-500/20 to-purple-600/20',
    },
    {
      icon: Database,
      title: 'Database Design',
      description: 'Designing and implementing efficient database schemas using MongoDB, SQL, and Firebase for scalable data management.',
      color: 'from-red-500/20 to-red-600/20',
    },
    {
      icon: GitBranch,
      title: 'CI/CD & DevOps',
      description: 'Setting up GitLab CI/CD pipelines, deployment automation, and environment management for seamless delivery.',
      color: 'from-green-500/20 to-green-600/20',
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Enhancing mobile app UI/UX using Java & XML for Android, including SSO support and authentication features.',
      color: 'from-yellow-500/20 to-yellow-600/20',
    },
    {
      icon: Globe,
      title: 'Full Stack Solutions',
      description: 'End-to-end MERN stack development with payment integration, email services, and QR code-based features.',
      color: 'from-pink-500/20 to-pink-600/20',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slide in
      gsap.fromTo(
        headingRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Red line draw
      gsap.fromTo(
        '.services-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Service cards 3D flip reveal
      gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { rotateX: -90, opacity: 0 },
          {
            rotateX: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        );
      });

      // Icon scale bounce
      gsap.utils.toArray<HTMLElement>('.service-icon').forEach((icon, i) => {
        gsap.fromTo(
          icon,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: icon.closest('.service-card'),
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1 + 0.3,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/5 to-black" />

      <div className="relative w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat']">
              WHAT I <span className="text-red-500">DO</span>
            </h2>
            <div className="services-line flex-1 h-px bg-gradient-to-r from-red-500 to-transparent origin-left" />
          </div>
          <p className="text-white/60 max-w-xl">
            Services tailored to bring your vision to life with precision and creativity.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-red-500/50 transition-all duration-500 hover:-translate-y-2"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="service-icon w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-red-600/20 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <service.icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-['Montserrat'] mb-3 group-hover:text-red-500 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
