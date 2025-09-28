import { useState } from "react";
import { Mail, Phone, MapPin, Send, Star, Award, Users, Calendar, Globe, FileText, Heart, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRipple } from "@/hooks/useAdvancedAnimations";
import ParticleSystem from "@/components/ParticleSystem";
import backgroundImage from "@/assets/background.jpg";

const Connect = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    website: "",
    message: "",
    timeline: "",
    budget: "",
    type: "",
    experience: "",
    age: "",
    school: "",
    interest: "",
    availability: "",
    artStyle: "",
    medium: "",
    outlet: "",
    articleType: "",
    deadline: "",
    targetAudience: "",
    inquiryType: ""
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();


  const ctaButtons = [
    { id: "sponsor", label: "Sponsor", icon: <Star className="w-5 h-5" />, color: "magenta" },
    { id: "partner", label: "Partner", icon: <Award className="w-5 h-5" />, color: "teal" },
    { id: "artist", label: "Artist", icon: <Users className="w-5 h-5" />, color: "accent" },
    { id: "youth", label: "Youth", icon: <Heart className="w-5 h-5" />, color: "cta" },
    { id: "press", label: "Press", icon: <FileText className="w-5 h-5" />, color: "teal" },
    { id: "inquiry", label: "Inquiry", icon: <Mail className="w-5 h-5" />, color: "magenta" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for your interest. We'll get back to you within 24 hours.",
    });

    // Reset form
    resetForm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type === 'application/pdf' || 
                         file.type === 'image/png' || 
                         file.type === 'image/jpeg' || 
                         file.type === 'image/jpg';
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });
    
    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid Files",
        description: "Some files were rejected. Only PDF, PNG, and JPEG files under 10MB are allowed.",
        variant: "destructive"
      });
    }
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      organization: "",
      email: "",
      phone: "",
      website: "",
      message: "",
      timeline: "",
      budget: "",
      type: "",
      experience: "",
      age: "",
      school: "",
      interest: "",
      availability: "",
      artStyle: "",
      medium: "",
      outlet: "",
      articleType: "",
      deadline: "",
      targetAudience: "",
      inquiryType: ""
    });
    setUploadedFiles([]);
    setActiveForm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative">
      {/* Particle System Background */}
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
            Connect
          </h1>
        </div>
      </section>

      {/* Description Section - Below Image */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Join our mission to <span className="text-magenta font-semibold">connect cultures</span>, <span className="text-teal font-semibold">empower youth</span>, and create lasting impact across <span className="text-magenta font-semibold">70+ countries</span>.
            </p>
          </div>
        </div>
      </section>


      {/* Dynamic Forms Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark text-center mb-12">How Would You Like to Connect?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {ctaButtons.map((button) => {
                const rippleRef = useRipple();
                return (
                  <button
                    key={button.id}
                    ref={rippleRef}
                    onClick={() => setActiveForm(activeForm === button.id ? null : button.id)}
                    className={`group liquid-button ripple bg-white border-2 border-gray-200 text-gray-700 p-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center gap-2 hover:border-${button.color} hover:text-${button.color} ${
                      activeForm === button.id ? `border-${button.color} text-${button.color} bg-${button.color}/5` : ''
                    }`}
                    style={{
                      background: activeForm === button.id 
                        ? `linear-gradient(135deg, rgba(233, 30, 99, 0.05) 0%, rgba(0, 188, 212, 0.05) 100%)`
                        : 'white'
                    }}
                  >
                    <div className={`group-hover:scale-110 transition-transform duration-300 group-hover:text-glow`}>
                      {button.icon}
                    </div>
                    <span className="text-sm md:text-base text-morphing">{button.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Contact Form */}
            {activeForm && (
              <div className="bg-white rounded-2xl shadow-elegant p-8 animate-scale-in">
                <h3 className="text-2xl font-semibold text-dark mb-6 capitalize">
                  {activeForm} Collaboration Form
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-magenta focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-dark mb-2">
                        Organization
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-magenta focus:border-transparent transition-all"
                        placeholder="Your organization"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-magenta focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-dark mb-2">
                      Expected Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-magenta focus:border-transparent transition-all"
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Immediate (1-2 weeks)</option>
                      <option value="short">Short term (1-3 months)</option>
                      <option value="medium">Medium term (3-6 months)</option>
                      <option value="long">Long term (6+ months)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-magenta focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your project, goals, and how you'd like to collaborate..."
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="neu-button text-dark px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 pulse-glow"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveForm(null)}
                      className="neu-button text-gray-700 px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Work Opportunities Section */}
      <section className="py-20 bg-gradient-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-dark mb-6">Work with us</h2>
            <p className="text-xl text-gray-600 mb-12">
              Currently, we don't have any open positions, but we're always looking for passionate individuals who share our vision of cultural excellence and social impact.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">No Open Positions</h3>
                <p className="text-gray-600 mb-6">
                  We're not currently hiring, but we'd love to hear from talented individuals who are passionate about cultural diplomacy and youth empowerment.
                </p>
                <button 
                  onClick={() => window.open('mailto:careers@mapsinternational.net', '_blank')}
                  className="bg-gradient-primary text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Send Us Your CV
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-dark text-center mb-12">Our Location</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="group cursor-pointer bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-magenta group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-dark group-hover:text-gray-700 transition-colors duration-300">
                        Doha
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
                        Katara Cultural Village, Building 12
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                    Doha, Qatar
                  </p>
                </div>
                
                <div className="group cursor-pointer bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-teal group-hover:scale-110 transition-transform duration-300">
                      <Globe className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-dark group-hover:text-gray-700 transition-colors duration-300">
                        Everywhere
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
                        We create cultural magic globally
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                    info@mapsinternational.net
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-light rounded-2xl p-8 text-center">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-4">Global Reach</h3>
                <p className="text-gray-600 leading-relaxed">
                  From our base in Doha, we connect cultures across 70+ countries, 
                  creating meaningful partnerships and cultural exchanges worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Footer */}
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
        
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6)'
            }}>
              Ready to Connect?
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Join us in creating extraordinary cultural experiences that inspire, engage, and empower communities worldwide.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Get in Touch</h3>
                <p className="text-white/80 text-sm">info@mapsinternational.net</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
                <p className="text-white/80 text-sm">+974 5560 3845</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
                <p className="text-white/80 text-sm">Katara Cultural Village</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => window.open('mailto:info@mapsinternational.net', '_blank')}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30"
              >
                Send Email
              </button>
              <button 
                onClick={() => window.open('tel:+97455603845', '_blank')}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30"
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Connect;
