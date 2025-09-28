import { useState, useEffect, useRef } from "react";
import { Play, Image, Video, Camera, X } from "lucide-react";

const QIAFMediaGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const mediaItems = [
    {
      id: 1,
      type: "video",
      title: "QIAF 2024 Highlights",
      description: "30-second festival highlights reel",
      duration: "0:30",
      thumbnail: "/placeholder-video-1.jpg",
      category: "Highlights"
    },
    {
      id: 2,
      type: "image",
      title: "Opening Ceremony",
      description: "VIP red carpet moments",
      thumbnail: "/placeholder-image-1.jpg",
      category: "Ceremony"
    },
    {
      id: 3,
      type: "video",
      title: "Artist Testimonials",
      description: "International artists share their QIAF experience",
      duration: "2:15",
      thumbnail: "/placeholder-video-2.jpg",
      category: "Testimonials"
    },
    {
      id: 4,
      type: "image",
      title: "Live Painting Sessions",
      description: "Artists creating in real-time",
      thumbnail: "/placeholder-image-2.jpg",
      category: "Live Art"
    },
    {
      id: 5,
      type: "video",
      title: "Cultural Performances",
      description: "Musical evenings and cultural shows",
      duration: "1:45",
      thumbnail: "/placeholder-video-3.jpg",
      category: "Performance"
    },
    {
      id: 6,
      type: "image",
      title: "Award Ceremony",
      description: "Recognition and celebration moments",
      thumbnail: "/placeholder-image-3.jpg",
      category: "Awards"
    },
    {
      id: 7,
      type: "video",
      title: "Behind the Scenes",
      description: "Exclusive QIAF preparation and setup",
      duration: "3:20",
      thumbnail: "/placeholder-video-4.jpg",
      category: "Behind Scenes"
    },
    {
      id: 8,
      type: "image",
      title: "Desert Safari",
      description: "Cultural experiences in Qatar desert",
      thumbnail: "/placeholder-image-4.jpg",
      category: "Experience"
    },
    {
      id: 9,
      type: "video",
      title: "Fashion Shows",
      description: "Sustainable fashion performances",
      duration: "1:30",
      thumbnail: "/placeholder-video-5.jpg",
      category: "Fashion"
    },
    {
      id: 10,
      type: "image",
      title: "Gallery Exhibitions",
      description: "International art on display",
      thumbnail: "/placeholder-image-5.jpg",
      category: "Exhibition"
    },
    {
      id: 11,
      type: "video",
      title: "Master Classes",
      description: "Educational workshops in action",
      duration: "2:00",
      thumbnail: "/placeholder-video-6.jpg",
      category: "Education"
    },
    {
      id: 12,
      type: "image",
      title: "Networking Events",
      description: "High-profile networking dinners",
      thumbnail: "/placeholder-image-6.jpg",
      category: "Networking"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getMediaIcon = (type: string) => {
    return type === "video" ? Play : Image;
  };

  return (
    <div className="w-full bg-white py-24" ref={galleryRef}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header - Apple Style */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light text-black mb-6 tracking-tight">
            Media Gallery
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            Experience QIAF through our curated collection of videos and images
          </p>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {mediaItems.map((item, index) => {
            const MediaIcon = getMediaIcon(item.type);
            return (
              <div
                key={item.id}
                className={`group cursor-pointer transition-all duration-700 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setSelectedMedia(item.id)}
              >
                <div className="bg-gray-50 rounded-2xl overflow-hidden hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <MediaIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-500 font-light">
                        {item.type === "video" ? "Video" : "Image"}
                      </div>
                    </div>
                    
                    {/* Play Button for Videos */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-black/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Duration for Videos */}
                    {item.type === "video" && item.duration && (
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {item.duration}
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {item.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-black mb-2 group-hover:text-gray-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Media Stats */}
        <div className="bg-gray-50 rounded-2xl p-12">
          <div className="text-center">
            <h3 className="text-2xl font-light text-black mb-8">
              Media Collection
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <Video className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <div className="text-4xl font-light text-black mb-2">6</div>
                <div className="text-gray-500 font-light">Videos</div>
              </div>
              <div className="text-center">
                <Image className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <div className="text-4xl font-light text-black mb-2">6</div>
                <div className="text-gray-500 font-light">Photo Sets</div>
              </div>
              <div className="text-center">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <div className="text-4xl font-light text-black mb-2">12</div>
                <div className="text-gray-500 font-light">Categories</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="text-4xl font-light text-black mb-2">50+</div>
                <div className="text-gray-500 font-light">Total Items</div>
              </div>
            </div>
          </div>
        </div>

        {/* Media Placeholder Instructions */}
        <div className="mt-16 bg-black text-white rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-light mb-4">Ready for Your Media</h3>
            <p className="text-gray-300 font-light mb-6 max-w-2xl mx-auto">
              Replace the placeholder images and videos with your actual QIAF content. 
              We recommend high-resolution images (1920x1080) and MP4 videos (1080p).
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
              <div>
                <h4 className="font-medium mb-2">Recommended Media:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• QIAF 2024 highlights video (30s)</li>
                  <li>• Artist testimonial videos (2-3 min)</li>
                  <li>• Opening ceremony photos (10-15 images)</li>
                  <li>• Live painting session photos</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">File Formats:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Images: JPG, PNG (1920x1080)</li>
                  <li>• Videos: MP4 (1080p, H.264)</li>
                  <li>• Thumbnails: JPG (400x300)</li>
                  <li>• Max file size: 50MB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="text-lg text-gray-500">Media Player</div>
                  <div className="text-sm text-gray-400 mt-2">
                    {mediaItems.find(item => item.id === selectedMedia)?.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QIAFMediaGallery;
