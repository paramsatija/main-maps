import { useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import CardShuffleGrid from "@/components/CardShuffleGrid";
import Gallery3D from "@/components/Gallery3D";
import ParticleSystem from "@/components/ParticleSystem";
import backgroundImage from "@/assets/background.jpg";

const Work = () => {
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    // Disable navigation for Youth Platform (coming soon)
    if (projectId === "youth-platform") {
      return;
    }
    navigate(`/projects/${projectId}`);
  };

  // Prepare gallery data
  const galleryItems = projects.slice(0, 5).map(project => ({
    id: project.id,
    title: project.title,
    image: project.heroImage,
    description: project.description
  }));

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Enhanced Particle System Background */}
      <ParticleSystem 
        particleCount={30} 
        colors={['#e91e63', '#00bcd4', '#ff9800', '#4caf50']}
        mouseInteraction={true}
      />

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
            Our Work
          </h1>
        </div>
      </section>

      {/* Description Section - Below Image */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              From <span className="text-magenta font-semibold">cultural diplomacy</span> to <span className="text-teal font-semibold">youth empowerment</span> — discover the projects that have transformed Qatar's cultural landscape and connected communities across <span className="text-magenta font-semibold">70+ countries</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section with Card Shuffle Animation */}
      <section className="py-20 relative z-10 min-h-screen">
        <div className="container mx-auto px-6">
          <CardShuffleGrid projects={projects} />
        </div>
      </section>


      {/* 3D Gallery Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-black text-center mb-12 text-shimmer">
              Featured Projects Gallery
            </h2>
            <Gallery3D 
              items={galleryItems}
              onItemClick={(item) => handleProjectClick(item.id)}
            />
          </div>
        </div>
      </section>

      {/* Footer Section with Background */}
      <section className="py-20 relative overflow-hidden">
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
            <h2 className="text-4xl font-bold text-white mb-6" style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6)'
            }}>
              Ready to Create Impact Together?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our mission to create meaningful cultural impact across the globe. Let's build something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/connect')}
                className="bg-gradient-to-r from-magenta to-teal text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-magenta/25 transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </button>
              <button
                onClick={() => navigate('/about')}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
