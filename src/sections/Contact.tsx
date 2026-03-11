import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Twitter, Linkedin, Github, Globe, Check } from 'lucide-react';
import { saveMessage } from '@/lib/firebase';

gsap.registerPlugin(ScrollTrigger);

const sendMail = async (email: string, name: string) => {
  const mailApiUrl = "https://email-sender-api-five.vercel.app/api/sendMailFromVishalServer";

  const postData = {
    email: email,
    name: name
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  };

  try {
    const response = await fetch(mailApiUrl, options);
    const data = await response.json();
    if (data.message == "Email successfully send" && data.success == true) {
      console.log("mail send");
    } else if (data.message == "Server error" && data.success == false) {
      console.log("internal server error on email send");
    }
  } catch (error) {
    console.error("Error sending mail:", error);
  }
};

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading word split reveal
      gsap.fromTo(
        '.contact-heading span',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Contact info staggered slide
      gsap.fromTo(
        '.contact-info-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Social icons pop in
      gsap.fromTo(
        '.social-icon',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Form fade in from right
      gsap.fromTo(
        '.contact-form',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Input fields staggered reveal
      gsap.fromTo(
        '.form-field',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await saveMessage(formData);
      await sendMail(formData.email, formData.name);
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error saving message:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/vishal-kumar-j17/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/vishalkumar1007', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/Vishal_kumar_17', label: 'Twitter' },
    { icon: Globe, href: 'https://vishalkumar1007.github.io/', label: 'Portfolio' },
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'vishalkumarnke93@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 6205594943' },
    { icon: MapPin, label: 'Location', value: 'Bengaluru, Karnataka, India' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Decorative shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-red-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-red-600/10 rounded-full blur-2xl" />

      <div className="relative w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Info */}
          <div className="space-y-10">
            {/* Heading */}
            <div>
              <h2 className="contact-heading text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat'] leading-tight">
                {'LET\'S WORK'.split(' ').map((word, i) => (
                  <span key={i} className="inline-block mr-4">{word}</span>
                ))}
                <br />
                <span className="text-red-500">TOGETHER</span>
              </h2>
              <p className="mt-4 text-white/60 max-w-md">
                Have a project in mind? Let's create something amazing together.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="contact-info-item flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-600/20 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-white/50 mb-4">Follow me on</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-icon w-12 h-12 flex items-center justify-center rounded-xl border border-white/20 text-white/70 hover:bg-red-600 hover:border-red-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-form">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="form-field relative">
                  <label 
                    className={`absolute left-0 transition-all duration-300 ${
                      focusedField === 'name' || formData.name
                        ? '-top-6 text-sm text-red-500'
                        : 'top-3 text-white/50'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-b-2 border-white/20 py-3 text-white focus:outline-none focus:border-red-500 transition-colors duration-300"
                  />
                  <div 
                    className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                      focusedField === 'name' ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>

                {/* Email Field */}
                <div className="form-field relative">
                  <label 
                    className={`absolute left-0 transition-all duration-300 ${
                      focusedField === 'email' || formData.email
                        ? '-top-6 text-sm text-red-500'
                        : 'top-3 text-white/50'
                    }`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-b-2 border-white/20 py-3 text-white focus:outline-none focus:border-red-500 transition-colors duration-300"
                  />
                  <div 
                    className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                      focusedField === 'email' ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>

                {/* Message Field */}
                <div className="form-field relative">
                  <label 
                    className={`absolute left-0 transition-all duration-300 ${
                      focusedField === 'message' || formData.message
                        ? '-top-6 text-sm text-red-500'
                        : 'top-3 text-white/50'
                    }`}
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-white/20 py-3 text-white focus:outline-none focus:border-red-500 transition-colors duration-300 resize-none"
                  />
                  <div 
                    className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                      focusedField === 'message' ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed glow-red"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Success Message */
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-600">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-['Montserrat'] mb-2">
                  Message Sent!
                </h3>
                <p className="text-white/60">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
