import { useState } from "react";
import { Users, Handshake, Palette, Calendar, Mail, ArrowRight } from "lucide-react";

const CallToActionSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const ctaCards = [
    {
      id: 1,
      title: "Join QIAF 2025",
      description: "Be part of the world's most celebrated art festival. Connect with 400+ artists from 70+ countries.",
      icon: <Palette className="w-8 h-8" />,
      buttonText: "Apply as Artist",
      buttonLink: "/connect",
      color: "from-magenta to-pink-500",
      bgColor: "from-pink-50 to-pink-100",
      stats: ["400+ Artists", "70+ Countries", "6 Days"]
    },
    {
      id: 2,
      title: "Become a Partner",
      description: "Partner with us to create meaningful cultural impact and reach global audiences.",
      icon: <Handshake className="w-8 h-8" />,
      buttonText: "Partner With Us",
      buttonLink: "/connect",
      color: "from-teal to-cyan-500",
      bgColor: "from-teal-50 to-cyan-100",
      stats: ["Government", "NGOs", "Cultural"]
    },
    {
      id: 3,
      title: "Join Youth Programs",
      description: "Empower the next generation through space science, innovation, and cultural exchange.",
      icon: <Users className="w-8 h-8" />,
      buttonText: "Get Involved",
      buttonLink: "/connect",
      color: "from-cta to-orange-500",
      bgColor: "from-orange-50 to-yellow-100",
      stats: ["500+ Youth", "Innovation", "Leadership"]
    },
    {
      id: 4,
      title: "Attend Events",
      description: "Discover upcoming cultural events, workshops, and exhibitions in Qatar and beyond.",
      icon: <Calendar className="w-8 h-8" />,
      buttonText: "View Events",
      buttonLink: "/work",
      color: "from-purple-500 to-indigo-500",
      bgColor: "from-purple-50 to-indigo-100",
      stats: ["15+ Components", "Year Round", "Global"]
    }
  ];

  const handleCardClick = (link: string) => {
    if (link.startsWith('/')) {
      window.location.href = link;
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're an artist, partner, youth leader, or cultural enthusiast, there's a place for you in the MAPS International community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {ctaCards.map((card, index) => (
            <div
              key={card.id}
              className={`group relative overflow-hidden rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl cursor-pointer bg-gradient-to-br ${card.bgColor}`}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(card.buttonLink)}
              style={{
                animationDelay: `${index * 150}ms`,
                background: hoveredCard === card.id 
                  ? `linear-gradient(135deg, ${card.bgColor.split(' ')[1]} 0%, ${card.bgColor.split(' ')[3]} 100%)`
                  : `linear-gradient(135deg, ${card.bgColor.split(' ')[1]} 0%, ${card.bgColor.split(' ')[3]} 100%)`,
                boxShadow: hoveredCard === card.id 
                  ? '0 20px 40px rgba(0,0,0,0.15)' 
                  : '0 8px 32px rgba(0,0,0,0.1)'
              }}
            >
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className="relative z-10 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {card.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-dark mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-dark group-hover:to-gray-600 transition-all duration-300">
                  {card.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {card.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {card.stats.map((stat, statIndex) => (
                    <span
                      key={statIndex}
                      className="text-xs font-medium bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full text-gray-700 group-hover:bg-white/80 transition-all duration-300"
                    >
                      {stat}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <button
                  className={`w-full bg-gradient-to-r ${card.color} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 group-hover:shadow-xl`}
                  style={{
                    boxShadow: `0 4px 15px ${card.color.split(' ')[1].replace('from-', '').replace('-500', '')}40`
                  }}
                >
                  <span>{card.buttonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-3xl transition-all duration-300"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CallToActionSection;
