
import React from 'react';
import { Camera } from 'lucide-react';

const Gallery: React.FC = () => {
    const getAssetPath = (path: string) => `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;

    const images = [
        { id: 1, url: getAssetPath('/assets/Gallery/WhatsApp Image 2026-03-05 at 16.41.09.jpeg'), caption: 'Inauguration Ceremony - JASICON 2008' },
        { id: 2, url: getAssetPath('/assets/Gallery/WhatsApp Image 2026-03-05 at 16.42.32.jpeg'), caption: 'Scientific Session - Academic Excellence' },
        { id: 3, url: getAssetPath('/assets/Gallery/WhatsApp Image 2026-03-05 at 16.43.58.jpeg'), caption: 'Distinguished Delegates & Faculty' },
        { id: 4, url: getAssetPath('/assets/Gallery/WhatsApp Image 2026-03-05 at 16.45.36.jpeg'), caption: 'Core Committee Discussion' },
        { id: 5, url: getAssetPath('/assets/Gallery/WhatsApp Image 2026-03-05 at 16.47.30.jpeg'), caption: 'Panel Discussion Insights' },
        { id: 6, url: getAssetPath('/assets/Gallery/WhatsApp Image 2026-03-05 at 16.49.27.jpeg'), caption: 'Honoring Surgical Pioneers' },
        { id: 7, url: getAssetPath('/assets/Gallery/WhatsApp Image 2026-03-05 at 16.51.10.jpeg'), caption: 'Awards & Recognition Ceremony' },
        { id: 8, url: getAssetPath('/assets/Gallery/WhatsApp Image 2026-03-05 at 16.52.29.jpeg'), caption: 'Interactive Workshop Session' },
        { id: 9, url: getAssetPath('/assets/Gallery/WhatsApp Image 2026-03-05 at 16.53.26.jpeg'), caption: 'Scientific Poster Presentation' },
        { id: 10, url: getAssetPath('/assets/Gallery/WhatsApp Image 2026-03-05 at 17.03.30.jpeg'), caption: 'Closing Ceremony Highlights' },
        { id: 11, url: getAssetPath('/assets/Gallery/WhatsApp Image 2026-03-05 at 16.45.36 (1).jpeg'), caption: 'Moments of Professional Camaraderie' },
        { id: 12, url: getAssetPath('/assets/Gallery/WhatsApp Image 2026-03-05 at 16.47.30 (1).jpeg'), caption: 'Traditional Lamp Lighting Ceremony' },
        { id: 13, url: getAssetPath('/assets/Gallery_new_images/w1.png'), caption: 'JASICON Highlights' },
        { id: 14, url: getAssetPath('/assets/Gallery_new_images/w2.png'), caption: 'Conference Moments' },
        { id: 15, url: getAssetPath('/assets/Gallery_new_images/w3.jpeg'), caption: 'Surgical Excellence' },
        { id: 16, url: getAssetPath('/assets/Gallery_new_images/w4.png'), caption: 'Delegate Interaction' },
        { id: 17, url: getAssetPath('/assets/Gallery_new_images/w5.png'), caption: 'Academic Exchange' },
        { id: 18, url: getAssetPath('/assets/Gallery_new_images/w6.png'), caption: 'Workshop Insights' },
        { id: 19, url: getAssetPath('/assets/Gallery_new_images/w7.png'), caption: 'Technical Session' },
        { id: 20, url: getAssetPath('/assets/Gallery_new_images/w8.png'), caption: 'Global Perspectives' },
        { id: 21, url: getAssetPath('/assets/Gallery_new_images/w9.png'), caption: 'Surgical Innovation' },
        { id: 22, url: getAssetPath('/assets/Gallery_new_images/w10.png'), caption: 'Scientific Discourse' },
        { id: 23, url: getAssetPath('/assets/Gallery_new_images/w11.png'), caption: 'Collaboration Hub' },
        { id: 24, url: getAssetPath('/assets/Gallery_new_images/w12.png'), caption: 'Expert Panel' },
        { id: 25, url: getAssetPath('/assets/Gallery_new_images/w13.png'), caption: 'Future of Surgery' },
        { id: 26, url: getAssetPath('/assets/Gallery_new_images/w14.png'), caption: 'Professional Networking' },
        { id: 27, url: getAssetPath('/assets/Gallery_new_images/w15.png'), caption: 'Milestone Achievement' },
        { id: 28, url: getAssetPath('/assets/Gallery_new_images/w16.png'), caption: 'Conference Atmosphere' },
        { id: 29, url: getAssetPath('/assets/Gallery_new_images/w17.png'), caption: 'Learning & Growth' },
        { id: 30, url: getAssetPath('/assets/Gallery_new_images/w18.png'), caption: 'Closing Ceremony' }
    ];

    return (
        <div className="min-h-screen bg-[#0B0F14] pt-24 pb-16 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-fade-in">
                    <div className="inline-flex items-center justify-center p-3 bg-[#C9A24D]/10 rounded-2xl mb-6">
                        <Camera className="text-[#C9A24D]" size={32} />
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-4">
                        Event <span className="text-[#C9A24D]">Gallery</span>
                    </h1>
                    <p className="text-[#9AA4B2] text-lg max-w-2xl mx-auto">
                        Glimpses into the prestigious gatherings, insightful sessions, and memorable moments from our medical conferences.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            className="group relative overflow-hidden rounded-2xl bg-[#121826] border border-[#1F2937] aspect-[4/3] animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <img
                                src={image.url}
                                alt={image.caption}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6">
                                <h3 className="text-[#C9A24D] font-black text-3xl uppercase tracking-[0.3em] animate-blur-fade">JASICON</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
