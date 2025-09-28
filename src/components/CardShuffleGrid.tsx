import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { renderIcon } from "@/data/projects";

interface CardShuffleProps {
  id: string;
  title: string;
  description: string;
  category: string;
  iconType: 'globe' | 'users' | 'star' | 'trophy';
  heroImage: string;
  stats: Record<string, number>;
  featured?: boolean;
  index: number;
  isLegacy: boolean;
}

const CardShuffle: React.FC<CardShuffleProps> = ({
  id,
  title,
  description,
  category,
  iconType,
  heroImage,
  stats,
  featured = false,
  index,
  isLegacy
}) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shuffleOffset, setShuffleOffset] = useState(0);

  const handleClick = () => {
    // Disable navigation for Youth Platform (coming soon)
    if (id === "youth-platform") {
      return;
    }
    navigate(`/projects/${id}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.8;
      
      // Calculate scroll progress for shuffle effect
      const scrollY = window.scrollY;
      const cardOffset = cardRef.current.offsetTop;
      const scrollProgress = Math.max(0, Math.min(1, (scrollY - cardOffset + windowHeight) / (windowHeight * 2)));
      
      if (rect.top < triggerPoint) {
        setIsVisible(true);
        
        // Calculate shuffle displacement
        const baseDelay = isLegacy ? 0 : 1000; // Legacy cards appear first
        const cardDelay = (index * 200) + baseDelay;
        const scrollBasedDelay = scrollY - cardOffset;
        
        if (scrollBasedDelay > cardDelay) {
          // Shuffle effect - cards move up and slightly sideways
          const shuffleIntensity = Math.min(1, (scrollBasedDelay - cardDelay) / 500);
          const verticalShuffle = shuffleIntensity * -30; // Move up
          const horizontalShuffle = shuffleIntensity * (index % 2 === 0 ? 15 : -15); // Alternate sides
          setShuffleOffset(shuffleIntensity);
          
          if (cardRef.current) {
            cardRef.current.style.transform = `translateY(${verticalShuffle}px) translateX(${horizontalShuffle}px) rotateZ(${shuffleIntensity * 2}deg)`;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [index, isLegacy]);

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-3xl transition-all duration-700 flex flex-col transform ${
        id === "youth-platform" 
          ? 'cursor-not-allowed opacity-75' 
          : 'cursor-pointer hover:-translate-y-2'
      } ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        transitionDelay: `${isLegacy ? index * 200 : (index * 200) + 1000}ms`,
        transform: isVisible ? `translateY(0) translateX(0) rotateZ(0deg)` : `translateY(20px) translateX(0) rotateZ(0deg)`
      }}
    >
      {/* Image Section - Top */}
      <div className="relative flex-1 min-h-[200px] max-h-[400px]">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-700"
        />
        {/* Shuffle glow effect */}
        {shuffleOffset > 0 && (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-magenta/20 via-teal/20 to-cta/20 opacity-0 transition-opacity duration-500"
            style={{ opacity: shuffleOffset * 0.3 }}
          />
        )}
      </div>

      {/* Glassmorphism Content Section - Bottom */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="text-gray-700">{renderIcon(iconType, "w-4 h-4")}</div>
          <span className="text-gray-600 text-sm font-medium bg-gray-100 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200">
            {category}
          </span>
          {id === "youth-platform" && (
            <span className="text-white text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 backdrop-blur-sm px-3 py-1 rounded-full border border-orange-400 animate-pulse">
              Coming Soon
            </span>
          )}
          {featured && (
            <span className="text-white text-sm font-medium bg-gradient-to-r from-magenta/80 to-teal/80 backdrop-blur-sm px-3 py-1 rounded-full border border-magenta/50">
              Legacy
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-black text-lg md:text-xl font-bold mb-2 leading-tight group-hover:text-gray-700 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        <div className="flex gap-4 text-gray-700 mb-4">
          {Object.entries(stats).slice(0, 3).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-sm font-bold">{value}+</div>
              <div className="text-xs text-gray-500 capitalize">{key.replace('_', ' ')}</div>
            </div>
          ))}
        </div>

        {/* View Project Button */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm font-medium">View Project</span>
          <div className="w-8 h-8 bg-gray-100 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300 border border-gray-200">
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-magenta/20 via-teal/20 to-cta/20 blur-xl"></div>
      </div>

      {/* Shuffle trail effect */}
      {shuffleOffset > 0 && (
        <div 
          className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(236, 72, 153, ${shuffleOffset * 0.1}) 0%, rgba(0, 188, 212, ${shuffleOffset * 0.1}) 100%)`,
            filter: 'blur(20px)',
            opacity: shuffleOffset * 0.5
          }}
        />
      )}
    </div>
  );
};

interface CardShuffleGridProps {
  projects: CardShuffleProps[];
}

const CardShuffleGrid: React.FC<CardShuffleGridProps> = ({ projects }) => {
  // Separate legacy and regular projects
  const legacyProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);

  return (
    <div className="space-y-20">
      {/* Legacy Projects Section */}
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4 text-shimmer">Legacy Projects</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our flagship initiatives that have transformed Qatar's cultural landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {legacyProjects.map((project, index) => (
            <CardShuffle
              key={project.id}
              {...project}
              index={index}
              isLegacy={true}
            />
          ))}
        </div>
      </div>

      {/* Regular Projects Section */}
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4 text-shimmer">Our Projects</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover our complete portfolio of cultural initiatives and programs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {regularProjects.map((project, index) => (
            <CardShuffle
              key={project.id}
              {...project}
              index={index}
              isLegacy={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardShuffleGrid;
