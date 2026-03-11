
import React from 'react';
import { MapPin, Info, Globe, ShieldCheck, ExternalLink, Navigation, LocateFixed } from 'lucide-react';
import { getAssetPath } from '../constants';

const About: React.FC = () => {
  const mapLink = "https://www.google.com/maps/search/?api=1&query=Maihar+Garden+Resort,+Daburgram,+Jasidih+Road,+Deoghar,+Jharkhand+814142";

  // Google Maps Embed URL for Maihar Garden Resort
  const embedMapUrl = "https://maps.google.com/maps?q=Maihar+Garden+Resort,+Daburgram,+Jasidhi+Road,+Deoghar,+Jharkhand+814142&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* Hero Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center mb-20 md:mb-32">
        {/* Responsive Image Container */}
        <div className="relative h-[350px] sm:h-[450px] md:h-[650px] rounded-3xl overflow-hidden border border-[#1F2937] shadow-2xl animate-fade-in-up">
          <img
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover filter brightness-[0.7] grayscale group-hover:grayscale-0 transition-all duration-1000 animate-ken-burns"
            alt="Medical Excellence"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-transparent"></div>

          {/* Overlay card optimized for mobile */}
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:bottom-10 md:left-10 p-6 md:p-10 glass-card rounded-2xl md:rounded-3xl max-w-sm animate-fade-in-up delay-2 shadow-2xl border border-[#C9A24D]/20">
            <h4 className="text-2xl md:text-3xl font-bold serif text-[#C9A24D]">Excellence</h4>
            <p className="text-[11px] md:text-sm text-[#9AA4B2] mt-2 md:mt-3 leading-relaxed">Dedicated to the highest standards of maternal healthcare and clinical research.</p>
          </div>
        </div>

        <div className="space-y-6 md:space-y-10 animate-fade-in-up">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold serif text-[#C9A24D] mb-4 md:mb-8">About Jasicon 2026</h1>
            <div className="space-y-4 md:space-y-6 text-[#E6EAF0] text-sm md:text-lg leading-relaxed">
              <p className="text-xl md:text-2xl italic font-light serif text-[#9AA4B2] border-l-4 border-[#C9A24D] pl-4 md:pl-6">
                "Pioneering the Future of Surgical Excellence Through Innovation."
              </p>
              <p>
                It gives us immense pleasure to welcome you to JASICON 2026, to be held at Maihar Garden, Deoghar, from 20th to 22nd November 2026. This prestigious conference will bring together surgeons from across Jharkhand and the country, reflecting our shared commitment to excellence, innovation, and advancement in the field of surgery.
              </p>
              <p>
                More than an academic gathering, JASICON 2026 is envisioned as a dynamic platform to reflect on the evolving landscape of surgical care, explore cutting-edge techniques, and deliberate on challenges that impact daily clinical practice. The conference aims to foster collaboration among surgeons from diverse backgrounds and encourage meaningful discussions that contribute to improved patient outcomes across the state.
              </p>
              <p>
                A special focus of JASICON 2026 will be on postgraduate residents in surgery, offering them updated knowledge, practical insights, and exposure to emerging trends in surgical science. Through structured academic sessions, interactive discussions, and expert-led deliberations, the conference seeks to empower young surgeons and nurture future leaders in the field.
              </p>
              <p>
                Beyond academics, the conference will also feature thoughtfully curated social and cultural engagements, creating a perfect blend of learning, interaction, and camaraderie. JASICON 2026 aspires to be a memorable milestone in our surgical journey—a space for learning, inspiration, and shared experiences.
              </p>
              <p className="font-bold text-[#C9A24D]">
                Let’s learn, share, and grow together. Don’t miss it!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Interactive Large Map Section */}
      <section className="mb-20 md:mb-32 animate-fade-in-up delay-3">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold serif text-[#C9A24D] mb-4">Venue & Location</h2>
          <div className="w-16 md:w-24 h-1 bg-[#C9A24D]/30 mx-auto mb-4 md:mb-6 rounded-full"></div>
          <p className="text-xs md:text-sm text-[#9AA4B2] max-w-2xl mx-auto italic px-4">Explore the exact location of our prestigious gathering in the heart of Deoghar.</p>
        </div>

        <div className="relative group w-full h-[400px] md:h-[700px] rounded-3xl md:rounded-[40px] overflow-hidden border border-[#1F2937] hover:border-[#C9A24D]/40 shadow-2xl transition-all duration-700">
          <iframe
            src={embedMapUrl}
            className="w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue Location Map"
          ></iframe>

          <div className="absolute top-4 right-4 left-4 md:left-auto md:w-96 glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl z-20 animate-slide-right delay-5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#C9A24D] text-[#0B0F14] rounded-xl shadow-xl shrink-0">
                <LocateFixed size={20} />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">Maihar Garden Resort</h3>
                <p className="text-[10px] md:text-xs text-[#9AA4B2] leading-relaxed mb-4 italic">Daburgram, Jasidhi Road, Deoghar, Jharkhand 814142</p>

                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#C9A24D] text-[#0B0F14] py-3 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-white transition-all transform hover:scale-[1.02] shadow-xl group/btn"
                >
                  <Navigation size={12} className="group-hover/btn:animate-bounce" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Icons Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-12 md:py-20 border-t border-[#1F2937] animate-fade-in-up delay-4">
        {[
          { title: 'Vision', icon: <Globe />, text: 'Establishing global benchmarks in surgical excellence.' },
          { title: 'Knowledge', icon: <Info />, text: 'Curating evidence-based clinical insights.' },
          { title: 'Ethics', icon: <ShieldCheck />, text: 'Upholding patient-centric medical integrity.' },
          { title: 'Network', icon: <Navigation />, text: 'Connecting medical pioneers across borders.' }
        ].map((item, i) => (
          <div key={i} className="text-center group p-4 h-full flex flex-col items-center transition-all">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-[#121826] rounded-full border border-[#1F2937] flex items-center justify-center mx-auto mb-6 md:mb-8 text-[#C9A24D] group-hover:bg-[#C9A24D] group-hover:text-[#0B0F14] transition-all duration-700 shadow-xl">
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: 28 })}
            </div>
            <h4 className="text-xl md:text-2xl font-bold serif mb-2 md:mb-3 group-hover:text-[#C9A24D] transition-colors">
              {item.title}
            </h4>
            <p className="text-xs md:text-sm text-[#9AA4B2] leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Deoghar: Past and Present Section */}
      <section className="mt-20 md:mt-32 animate-fade-in-up">
        <div className="bg-[#121826] border border-[#1F2937] rounded-[40px] overflow-hidden shadow-2xl">
          <div className="bg-[#0B0F14]/30 border-b border-[#1F2937] py-16 md:py-24 px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
              Deoghar <span className="text-[#C9A24D]">Past & Present</span>
            </h2>
            <p className="text-[#C9A24D] font-bold serif italic text-lg md:text-2xl">"A thing of beauty is joy forever" — Keats</p>
          </div>

          <div className="p-8 md:p-16 space-y-8 md:space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-[#E6EAF0] text-sm md:text-lg leading-relaxed">
              <div className="space-y-6">
                <p>
                  This sublime beauty is fully manifested in the mythological shrines, rivulets and hills and sanctity of this holy city. The great saints and hermits made this holy city a seat of prolonged meditation and also the poets and novelists of Bengali and Hindi lite settled here and drew inspiration from its colourful landscape. The great Bengali novelist Sharat Chandra stayed here for many years.
                </p>
                <p>
                  Ishwar Chandra Vidyasagar was from this District, a place Karmatand now named 'Vidyasagar'. As we trace the history of Deoghar we find that Deoghar has magnetic effect since, time immemorial. Religious and intellectual leaders of their time like Ram Krishna Paramhans, Swami Vivekanand, Rabindranath Tagore, Maharshi Arvindo, Mahatma Gandhi, Subash Chandra Bose visited this place.
                </p>
                <p>
                  This city presents festive look during the month of Shrawani when Lakhs of 'Kanwaria' of all age groups after traversing a distance of 100 km from Sultangaj reach here to pour water of Ganges on Lord Shiva. The Dwadas Shivling lying in Baidyanath Temple known as 'Kamna Ling' fulfills the hopes and desires to those who brings 'kanwar from Sultanganj to Deoghar' particularly in 'Shrawan'.
                </p>
              </div>
              <div className="space-y-6">
                <div className="p-6 md:p-8 bg-[#0B0F14]/50 border border-[#C9A24D]/20 rounded-3xl">
                  <p className="italic text-[#9AA4B2] mb-4">
                    The climate is dry and congenial and Deoghar is still considered a health resort in spite of great congestion particularly due to the temple of Baidyanath.
                  </p>
                  <p className="text-sm">
                    The nearest railway station is Baidyanath. Jasidih junction is about 7 km from Baidyanathdham railway station, which is on the main line of Howrah-Delhi route of Indian railway. It is about 224 km from Patna and 322 km from Ranchi.
                  </p>
                </div>
                <p>
                  Round the years tourists come here from different states particularly Bengal, U.P. and M.P. There are so many religious and natural tourists spots in and around Deoghar.
                </p>
                <div className="pt-4 flex flex-col gap-6">
                  <div className="flex items-center gap-4 text-[#C9A24D]">
                    <MapPin size={24} />
                    <span className="font-bold uppercase tracking-widest text-xs md:text-sm">Explore Religious & Natural Tourist Spots</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 md:gap-4 animate-fade-in-up delay-2">
                    {[
                      { url: getAssetPath("/assets/a.png"), title: "Gateway" },
                      { url: getAssetPath("/assets/b.png"), title: "Mandir" },
                      { url: getAssetPath("/assets/c.jpg"), title: "Nature" }
                    ].map((img, i) => (
                      <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden border border-[#C9A24D]/30 hover:border-[#C9A24D] transition-all duration-500 shadow-lg">
                        <img
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.8] group-hover:brightness-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#1F2937] pt-12">
              <h3 className="text-2xl md:text-3xl font-bold serif text-[#C9A24D] mb-8">Temples & Tourist Spots</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
                {[
                  "Baidyanath Mandir (and 22 other mandirs in the campus)",
                  "Naulakha - Temple of Radha Krishna",
                  "Dev Sangh - Nav Durga Mandir",
                  "Kundeshwari - Kali Mandir",
                  "Balanand Brahmchari & Pagla Baba Ashram",
                  "Satsang Ashram - A holy place for devotees of Shri Shri Thakur Anukul Chandra",
                  "Nandan Pahar - Nandi Temple & Scenic Views",
                  "Tapovan - Famous for beautiful caves",
                  "Trikut Pahar - Sages Reputed Salvation & Ropeway",
                  "Basukinath - Attractive Shiva Temple",
                  "Rohini - Martyr's Memorial of freedom movement",
                  "Rikhia - Shivanand Math established by Swami Satyanand"
                ].map((spot, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <span className="text-[#C9A24D] font-bold opacity-50 transition-opacity group-hover:opacity-100">{index + 1}.</span>
                    <span className="text-[#9AA4B2] group-hover:text-white transition-colors">{spot}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#C9A24D]/5 p-8 rounded-3xl border border-[#C9A24D]/10">
              <p className="text-sm md:text-base text-[#E6EAF0] leading-relaxed">
                World famous Yogi Swami Satyanand Saraswati, founder of Bihar School of Yoga at Munger, has established Shivanand Math at Rikhia 9 km from Deoghar. His disciples from all over the world visit the place regularly and due to swami, Deoghar has come up on the international map.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
