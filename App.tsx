import React, { useState } from 'react';
import { Menu, X, Phone, MapPin, Clock, Trophy, Dumbbell, Users, Target, CheckCircle } from 'lucide-react';
import { VoiceChatWidget } from './components/VoiceChatWidget';
import { BUSINESS_INFO, FEATURES, PRICING, SERVICES, TESTIMONIALS } from './constants';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-100 bg-iron-dark">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-black border-b-2 border-iron-red shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Dumbbell className="text-iron-red h-8 w-8" />
            <span className="text-2xl font-bold text-iron-red tracking-tight uppercase">IronCore</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['About', 'Services', 'Membership', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-white hover:text-iron-red font-medium transition-colors uppercase tracking-wider text-sm"
              >
                {item}
              </button>
            ))}
            <div className="text-iron-red font-bold flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {BUSINESS_INFO.phone}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-iron-gray absolute w-full border-b border-iron-red">
            <div className="flex flex-col p-4 space-y-4">
              {['About', 'Services', 'Membership', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-white hover:text-iron-red font-medium py-2 uppercase"
                >
                  {item}
                </button>
              ))}
              <div className="text-iron-red font-bold pt-2 border-t border-gray-700">
                {BUSINESS_INFO.phone}
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center bg-black overflow-hidden">
           {/* Background Overlay */}
           <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://picsum.photos/1920/1080?grayscale&blur=2')] bg-cover bg-center"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-iron-dark z-0"></div>

           <div className="container mx-auto px-4 z-10 text-center">
             <div className="inline-block bg-iron-red text-white px-6 py-2 rounded-full font-bold mb-6 text-sm uppercase tracking-wider animate-fade-in-up">
               🏆 Rated #1 Best Local Gym 2026
             </div>
             <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tight leading-tight">
               Serious Training <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-iron-red to-red-500">Real Results</span>
             </h1>
             <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
               {BUSINESS_INFO.tagline}. Located in Downtown District.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button 
                 onClick={() => scrollToSection('contact')}
                 className="bg-iron-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-transform hover:-translate-y-1 uppercase tracking-wide"
               >
                 Book Free Session
               </button>
               <button 
                //  onClick={() => document.querySelector('[aria-label="voice-chat"]')?.click()}
                 className="bg-transparent border-2 border-iron-red text-iron-red hover:bg-iron-red hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all uppercase tracking-wide flex items-center justify-center gap-2"
               >
                 <Dumbbell className="h-5 w-5" />
                 View Programs
               </button>
             </div>
           </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-iron-dark">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-4xl font-bold text-iron-red mb-2 uppercase">About IronCore</h2>
                <div className="w-20 h-1 bg-white mb-6"></div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Founded in {BUSINESS_INFO.founded}, IronCore Gym has been Downtown District's trusted fitness destination for over a decade. We're not just another gym – we're a community of serious athletes and fitness enthusiasts who believe in earning real results through dedicated training.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Whether you're just starting your fitness journey or you're an experienced athlete, IronCore Gym provides the environment and support you need to reach your goals.
                </p>
                <div className="p-4 bg-iron-gray border-l-4 border-iron-red rounded-r-lg">
                  <p className="font-bold text-white">Now accepting new members for 2026. Join the gym that puts results first.</p>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-gray-800">
                  <img 
                    src="https://picsum.photos/800/600" 
                    alt="Gym Interior" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <p className="text-white font-bold">State-of-the-art Facility</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-iron-red mb-4 uppercase">Training Programs</h2>
              <div className="w-20 h-1 bg-white mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service, index) => (
                <div key={index} className="bg-iron-gray p-8 rounded-xl border border-gray-800 hover:border-iron-red transition-all hover:-translate-y-2 group">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-iron-red transition-colors">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features/Why Choose */}
        <section className="py-20 bg-iron-dark">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-iron-red mb-16 uppercase">Why Choose Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {FEATURES.map((feature, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-iron-red rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-900/20">
                    {/* Icon Mapping based on string name */}
                    {feature.icon === 'Dumbbell' && <Dumbbell className="w-8 h-8 text-white" />}
                    {feature.icon === 'Target' && <Target className="w-8 h-8 text-white" />}
                    {feature.icon === 'Users' && <Users className="w-8 h-8 text-white" />}
                    {feature.icon === 'Clock' && <Clock className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="membership" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-iron-red mb-4 uppercase">Membership Options</h2>
              <p className="text-gray-400">Simple pricing. No hidden fees.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {PRICING.map((plan, index) => (
                <div 
                  key={index} 
                  className={`bg-iron-gray rounded-xl p-8 border-2 flex flex-col items-center text-center transition-all ${
                    index === 1 ? 'border-iron-red scale-105 shadow-xl shadow-red-900/20 relative' : 'border-gray-800 hover:border-gray-600'
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute -top-4 bg-iron-red text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-iron-red my-6">{plan.price}</div>
                  <p className="text-gray-300 mb-8">{plan.description}</p>
                  <button className={`mt-auto px-8 py-3 rounded-lg font-bold uppercase tracking-wide transition-colors ${
                    index === 1 ? 'bg-iron-red text-white hover:bg-red-700' : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black'
                  }`}>
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-iron-dark">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-iron-red mb-16 uppercase">Member Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, index) => (
                <div key={index} className="bg-black p-8 rounded-xl border-l-4 border-iron-red relative">
                  <div className="absolute top-4 left-4 text-gray-800 text-6xl font-serif">"</div>
                  <p className="text-gray-300 italic mb-6 relative z-10">{t.text}</p>
                  <div className="font-bold text-iron-red">{t.author}</div>
                  <div className="text-sm text-gray-500">Member since {t.memberSince}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 bg-black border-t border-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold text-iron-red mb-8 uppercase">Visit Us</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-8 h-8 text-iron-red mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Location</h3>
                      <p className="text-gray-400">{BUSINESS_INFO.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-8 h-8 text-iron-red mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Phone</h3>
                      <p className="text-gray-400">{BUSINESS_INFO.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-8 h-8 text-iron-red mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Hours</h3>
                      <p className="text-gray-400">{BUSINESS_INFO.hours.weekday}</p>
                      <p className="text-gray-400">{BUSINESS_INFO.hours.weekend}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-iron-gray p-8 rounded-xl">
                 <h3 className="text-2xl font-bold text-white mb-6">Start Your Journey</h3>
                 <p className="text-gray-300 mb-8">Ready to get serious about your results? Book your free introductory session today.</p>
                 <div className="space-y-4">
                    <a 
                      href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`} 
                      className="block w-full bg-iron-red hover:bg-red-700 text-white text-center font-bold py-4 rounded-lg uppercase tracking-wide transition-colors"
                    >
                      Call {BUSINESS_INFO.phone}
                    </a>
                    <button 
                      onClick={() => {
                        const btn = document.querySelector('button[aria-label="voice-chat"]'); // Simulated click or logic
                        // In a real app we'd use context to open the chat
                        alert("Please use the AI Assistant in the bottom right corner to ask questions!");
                      }}
                      className="block w-full bg-transparent border-2 border-iron-red text-iron-red hover:bg-iron-red hover:text-white text-center font-bold py-4 rounded-lg uppercase tracking-wide transition-colors"
                    >
                      Ask AI Assistant
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-iron-red py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved. | {BUSINESS_INFO.address}
          </p>
        </div>
      </footer>

      <VoiceChatWidget />
    </div>
  );
};

export default App;
