import { useEffect, useRef, useState } from "react";
import { Globe, Users, Award, Zap, Heart, Star, Trophy, Calendar, MapPin, Mail, Camera, Image } from "lucide-react";
import FounderSection from "@/components/FounderSection";
import PartnershipsShowcase from "@/components/PartnershipsShowcase";
import backgroundImage from "@/assets/background.jpg";
import culturalExcellenceImage from "@/assets/values/culturalexcellence.jpg";
import youthEmpowermentImage from "@/assets/values/Youthempowerment.jpg";
import globalCollabImage from "@/assets/values/globalcollab.jpg";
import innovationImage from "@/assets/values/innovation.jpg";

const About = () => {
  const leadRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // What We Do - Services
  const services = [
    "Cultural Diplomacy",
    "Youth Programs", 
    "Art Festivals",
    "Space Science",
    "Community Building"
  ];

  // Our Values with photos
  const values = [
    {
      title: "Cultural Excellence",
      text: "We believe in the transformative power of culture to bridge divides and create meaningful connections. Every project we undertake is driven by our commitment to cultural excellence and authentic representation.",
      image: culturalExcellenceImage,
      icon: <Award className="w-8 h-8" />
    },
    {
      title: "Youth Empowerment",
      text: "The next generation is our greatest asset. We create platforms and opportunities for young people to lead, innovate, and shape the future of cultural exchange and community development.",
      image: youthEmpowermentImage,
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Global Collaboration",
      text: "From Qatar to 70+ countries worldwide, we believe in the power of international collaboration. Our partnerships span continents, bringing together diverse perspectives to create something truly extraordinary.",
      image: globalCollabImage,
      icon: <Globe className="w-8 h-8" />
    },
    {
      title: "Innovation & Creativity",
      text: "We constantly push boundaries, exploring new ways to connect cultures and communities. Our approach combines traditional wisdom with cutting-edge innovation to create lasting impact.",
      image: innovationImage,
      icon: <Zap className="w-8 h-8" />
    }
  ];

  // Team Members
  const team = [
    { name: "Rashmi Agarwal", role: "Founder & CEO" },
    { name: "Cultural Ambassadors", role: "70+ Countries" },
    { name: "Youth Leaders", role: "500+ Engaged" },
    { name: "Artists & Creatives", role: "400+ Collaborators" },
    { name: "Community Partners", role: "Global Network" },
    { name: "Space Science Team", role: "Educational Leaders" }
  ];

  // Scroll tracking for responsive sizing
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add reveal class to the section
            entry.target.classList.add('reveal');
            
            // For services section, animate individual items
            if (entry.target === servicesRef.current) {
              const serviceItems = entry.target.querySelectorAll('.service-item');
              serviceItems.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('reveal');
                }, index * 100);
              });
            }
            
            // For values section, animate individual cards
            if (entry.target === valuesRef.current) {
              const valueCards = entry.target.querySelectorAll('.value-card');
              valueCards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add('reveal');
                }, index * 150);
              });
            }
            
            // For team section, animate individual items
            if (entry.target === teamRef.current) {
              const teamItems = entry.target.querySelectorAll('.team-item');
              teamItems.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('reveal');
                }, index * 100);
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    [leadRef, servicesRef, valuesRef, teamRef].forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Fallback: Show all elements after 2 seconds if they haven't been revealed
    const fallbackTimeout = setTimeout(() => {
      const allServiceItems = document.querySelectorAll('.service-item');
      const allValueCards = document.querySelectorAll('.value-card');
      const allTeamItems = document.querySelectorAll('.team-item');
      
      allServiceItems.forEach(item => item.classList.add('reveal'));
      allValueCards.forEach(card => card.classList.add('reveal'));
      allTeamItems.forEach(item => item.classList.add('reveal'));
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section - Clean Title on Image */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div
          className="h-52 md:h-64"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white" style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6)'
          }}>
            About MAPS
          </h1>
        </div>
      </section>

      {/* Description Section - Below Image */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              We are a <span className="text-magenta font-semibold">cultural & creative enterprise</span> specializing in <span className="text-teal font-semibold">transformative experiences</span>. From moments to movements, our work breaks through cultural barriers connecting communities across <span className="text-magenta font-semibold">70+ countries</span>. We conjure <span className="text-teal font-semibold">cultural magic</span> for the world's most meaningful initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 relative z-10" ref={servicesRef}>
        <div className="container mx-auto px-4 max-w-8xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-black">What We Do</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {services.map((service, index) => (
              <div
                key={service}
                className="service-item bg-gradient-to-r from-pink-200/40 to-pink-300/40 backdrop-blur-md border border-pink-300/50 px-8 py-4 rounded-full text-black font-bold text-lg hover:bg-gradient-to-r hover:from-pink-200/60 hover:to-pink-300/60 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-300/25"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section with Rashmi's Photos */}
      <section className="py-12 relative z-10" ref={valuesRef}>
        <div className="container mx-auto px-4 max-w-8xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-black">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="value-card group bg-pink-100/20 backdrop-blur-lg border border-pink-200/30 rounded-3xl overflow-hidden hover:bg-pink-100/30 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-pink-300/30 hover:border-pink-300/50"
                style={{
                  animationDelay: `${index * 150}ms`,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={value.image}
                    alt={`${value.title} - MAPS International`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                  />
                  {/* Placeholder when image fails to load */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-magenta/20 to-teal/20 flex items-center justify-center"
                    style={{ display: 'none' }}
                  >
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-white/60 mx-auto mb-2" />
                      <p className="text-white/80 text-sm font-medium">{value.title}</p>
                      <p className="text-white/60 text-xs">Photo Coming Soon</p>
                    </div>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Icon */}
                  <div className="absolute top-4 right-4 text-white/90 group-hover:text-white transition-colors">
                    {value.icon}
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-magenta group-hover:text-magenta transition-colors">
                    {value.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <FounderSection />

      {/* Partnerships Showcase */}
      <PartnershipsShowcase />

      {/* Team Section */}
      <section className="py-12 relative z-10" ref={teamRef}>
        <div className="container mx-auto px-4 max-w-8xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">This is MAPS International WLL</h2>
          <p className="text-lg text-gray-700 text-center mb-8 max-w-5xl mx-auto">
            MAPS International WLL is proudly led by visionary cultural leaders. Our diverse and versatile team is made up of cultural ambassadors, youth advocates, creative strategists, and community builders who love creating cultural magic. Meet our community:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="team-item bg-pink-100/20 backdrop-blur-md border border-pink-200/30 p-6 rounded-xl text-center hover:bg-pink-100/30 transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <h4 className="font-bold text-black mb-2">{member.name}</h4>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

          {/* Contact CTA */}
          <section className="py-12 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6 text-shimmer">
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Whether you're an artist, youth leader, or cultural enthusiast, there's a place for you in the MAPS International WLL community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-gray-700/25 transition-all duration-300 hover:scale-105">
                Partner With Us
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;