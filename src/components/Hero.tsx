import { useState, useEffect, useRef } from "react";
import backgroundImage from "@/assets/background.jpg";
import mapsLogo from "@/assets/maps-logo.jpg";
import heroRashmi from "@/assets/hero-rashmi-diplomacy.jpg";
import heroQiaf from "@/assets/projects/qiaf-2025/qiaf-card.jpg";
import heroYouth from "@/assets/hero-youth-platform.jpg";
import heroSpace from "@/assets/projects/kssp/kssp-card.jpg";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    artists: 0,
    countries: 0,
    years: 0
  });
  const [isNumbersVisible, setIsNumbersVisible] = useState(false);
  const numbersRef = useRef<HTMLDivElement>(null);
  
  const heroImages = [
    { src: heroRashmi, alt: "Rashmi Agarwal engaging with international dignitaries at cultural diplomacy event" },
    { src: heroQiaf, alt: "Qatar International Art Festival showcasing 70+ countries cultural celebration" },
    { src: heroYouth, alt: "Young innovators from Qatar engaged in space science and cultural programs" },
    { src: heroSpace, alt: "Katara Space Science Program with students learning astronomy under desert sky" }
  ];

  // Scroll tracking for responsive sizing
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Number ticker animation
  useEffect(() => {
    if (!isNumbersVisible) return;

    const targets = { artists: 400, countries: 70, years: 11 };
    const duration = 2000; // 2 seconds
    const steps = 60; // 60fps
    const stepDuration = duration / steps;

    const animateNumber = (key: keyof typeof targets, target: number) => {
      let current = 0;
      const increment = target / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedNumbers(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepDuration);
    };

    // Stagger the animations
    setTimeout(() => animateNumber('artists', targets.artists), 0);
    setTimeout(() => animateNumber('countries', targets.countries), 200);
    setTimeout(() => animateNumber('years', targets.years), 400);
  }, [isNumbersVisible]);

  // Intersection Observer for numbers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsNumbersVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (numbersRef.current) {
      observer.observe(numbersRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToCardDeck = () => {
    const cardDeck = document.getElementById('card-deck');
    cardDeck?.scrollIntoView({ behavior: 'smooth' });
  };

  const openSponsorModal = () => {
    // This would open a modal in a real implementation
    window.open('mailto:info@mapsinternational.qa?subject=Cultural%20Partnership%20Inquiry', '_blank');
  };

  return (
    <>
      <style>
        {`
          @keyframes typewriter {
            from { width: 0; }
            to { width: 100%; }
          }
          
          @keyframes blink {
            0%, 50% { border-color: #FFD700; }
            51%, 100% { border-color: transparent; }
          }
          
          @keyframes neon-pulse {
            0%, 100% { 
              text-shadow: 0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px #FFD700;
            }
            50% { 
              text-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700;
            }
          }
          
          @keyframes electric-glow {
            0%, 100% { 
              text-shadow: 0 0 3px #00FFFF, 0 0 6px #00FFFF;
            }
            50% { 
              text-shadow: 0 0 5px #00FFFF, 0 0 10px #00FFFF;
            }
          }
          
          .typewriter-text {
            overflow: hidden;
            white-space: nowrap;
            margin: 0 auto;
            letter-spacing: 0.1em;
            border-right: 3px solid #FFD700;
            animation: typewriter 3s steps(20) 1s 1 normal both, blink 1s infinite 4s;
          }
        `}
      </style>
      <section className="relative min-h-screen hero-gradient overflow-hidden">
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
      

      {/* Particle Canvas Placeholder */}
      <canvas className="particle-canvas" id="hero-particles" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen text-center">
        {/* MAPS Logo - Large */}
        <div className="-mb-6 -mt-8 animate-fade-in">
          <div className="w-96 md:w-[500px] transition-all duration-300 hover:scale-105">
            <img
              src={mapsLogo}
              alt="MAPS International Logo"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Main Tagline - Typewriter Effect */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 typewriter-text" style={{ 
          animationDelay: '0.2s',
          color: '#FFD700',
          fontFamily: 'monospace'
        }}>
          Mapping Possibilities
        </h2>

        {/* Subtitle - Electric Glow */}
        <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 animate-slide-up" style={{ 
          animationDelay: '0.3s',
          color: '#00FFFF',
          animation: 'electric-glow 2s ease-in-out infinite alternate, slide-up 0.8s ease-out 0.3s both'
        }}>
          Building Impact
        </h3>

        {/* Description */}
        <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-4xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
          Cultural Diplomacy • Events • Youth • Innovation
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <button 
            onClick={() => document.getElementById('card-deck')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-300 hover:scale-105 border-2 border-yellow-400"
            style={{
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
              textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
            }}
          >
            Explore Our Work
          </button>
          <button 
            onClick={openSponsorModal}
            className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-white/50 transition-all duration-300 hover:scale-105 border border-gray-300"
          >
            Collaborate With Us
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex flex-col items-center justify-start pt-2">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;