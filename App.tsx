import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Loader2, MapPin, CheckCircle2, ArrowRight, User, 
  Instagram, Star, Trophy, ShieldCheck, PlayCircle, BadgeCheck, Heart, MessageCircle, Grid, MoreHorizontal, Quote, CalendarDays, Ticket
} from 'lucide-react';
import HowItWorksSection from './src/components/HowItWorksSection';
import { translations } from './src/translations';

const App: React.FC = () => {
  // UI State
  const [scrolled, setScrolled] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [lang, setLang] = useState<'en' | 'es' | 'pt'>('en');
  
  // Form State
  const [consent, setConsent] = useState(false);
  const [location, setLocation] = useState<'Euharlee' | 'Gainesville'>('Euharlee');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [position, setPosition] = useState('');
  const [heardAbout, setHeardAbout] = useState('');
  const [currentTeam, setCurrentTeam] = useState('');
  const [highestLevel, setHighestLevel] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const t = translations[lang];

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-04-18T10:00:00').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Scroll Effect for Header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // Show sticky CTA when user scrolls past the hero/form section (approx 1500px on mobile)
      setShowStickyCTA(window.scrollY > 1500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || !location || !name || !birthDate || !email || !city || !zip || !position || !heardAbout || !highestLevel) return;
    
    setFormStatus('submitting');
    
    const payload = {
      consent,
      location,
      name,
      birthDate,
      email,
      city,
      zip,
      position,
      heardAbout,
      currentTeam,
      highestLevel
    };

    try {
      const response = await fetch('https://webhook.infra-remakingautomacoes.cloud/webhook/idclinic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormStatus('success');
        if (typeof (window as any).fbq === 'function') {
          (window as any).fbq('track', 'Lead');
        }
      } else {
        console.error('Failed to submit form:', response.statusText);
        setFormStatus('idle');
        alert('There was an error submitting your registration. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('idle');
      alert('There was an error submitting your registration. Please check your connection and try again.');
    }
  };

  // Nav Links Configuration
  const navLinks = [
    { name: t.nav.locations, href: '#locations' },
    { name: t.nav.register, href: '#register' },
    { name: t.nav.instagram, href: '#instagram' }
  ];

  const positions = [
    'Goalkeeper', 'Left Back', 'Right Back', 'Center Back', 
    'Left Midfield', 'Right Midfield', 'Center Midfield', 'Forward'
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden font-sans">
      
      {/* --- HEADER --- */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Area */}
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-yellow-400 bg-white p-1 shrink-0">
              <img 
                src="https://traccoveredbridge.com/wp-content/uploads/2024/03/Covered_Bridge_logo.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className={`font-heading font-extrabold uppercase tracking-tighter leading-none ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              Covered<br/>Bridge
            </div>
          </div>

          {/* Right Side: Nav & Language */}
          <div className="flex items-center space-x-4 md:space-x-8">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href}
                  className={`text-sm font-bold uppercase tracking-wide hover:text-yellow-400 transition-colors ${scrolled ? 'text-gray-800' : 'text-white/90'}`}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="#register"
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl shadow-lg hover:shadow-red-500/50 transition-all transform hover:-translate-y-0.5"
              >
                {t.nav.registerNow}
              </a>
            </nav>

            {/* Language Selector */}
            <div className={`flex items-center space-x-2 md:space-x-3 bg-black/5 backdrop-blur-sm px-3 py-1.5 rounded-2xl border border-gray-200/20`}>
              <button onClick={() => setLang('en')} className={`text-2xl md:text-3xl transition-all duration-300 ${lang === 'en' ? 'scale-125 opacity-100 drop-shadow-md -translate-y-0.5' : 'opacity-40 hover:opacity-100 hover:scale-110 grayscale-[60%]'}`} title="English">🇺🇸</button>
              <button onClick={() => setLang('es')} className={`text-2xl md:text-3xl transition-all duration-300 ${lang === 'es' ? 'scale-125 opacity-100 drop-shadow-md -translate-y-0.5' : 'opacity-40 hover:opacity-100 hover:scale-110 grayscale-[60%]'}`} title="Español">🇪🇸</button>
              <button onClick={() => setLang('pt')} className={`text-2xl md:text-3xl transition-all duration-300 ${lang === 'pt' ? 'scale-125 opacity-100 drop-shadow-md -translate-y-0.5' : 'opacity-40 hover:opacity-100 hover:scale-110 grayscale-[60%]'}`} title="Português">🇧🇷</button>
            </div>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-28 pb-12 md:pt-16 lg:pt-24 lg:pb-24 overflow-hidden bg-gray-900 min-h-[90vh] flex items-center">
        {/* Background Layer: Video Loop */}
        <div className="absolute inset-0 z-0">
           <video 
             autoPlay 
             loop 
             muted 
             playsInline 
             className="w-full h-full object-cover opacity-60"
             poster="https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2940&auto=format&fit=crop"
           >
             <source src="https://traccoveredbridge.com/wp-content/uploads/2023/05/intro.mp4" type="video/mp4" />
           </video>
        </div>
        
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/40 z-0"></div>
        
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 z-0"></div>

        {/* Subtle MLS Next Watermark */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none">
          <img 
            src="https://images.mlssoccer.com/image/upload/v1664742553/assets/logos/mls-next-2022-COLOR-800x800.png" 
            alt="MLS Next Watermark" 
            className="w-[800px] h-[800px] object-contain"
          />
        </div>

        {/* Bottom Fade to next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>

        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Content */}
          <motion.div 
            className="text-left space-y-6 md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-red-600/90 border border-red-400/50 backdrop-blur-md px-4 py-1.5 rounded-xl shadow-lg max-w-full">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse shrink-0"></span>
              <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-widest truncate">{t.hero.officialEvent}</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-[clamp(2rem,8vw,5rem)] font-heading font-black text-white leading-[0.9] tracking-tight drop-shadow-2xl">
              {t.hero.title1} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">MLS</span> {t.hero.title2}
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-gray-200 text-lg md:text-xl max-w-md leading-relaxed border-l-4 border-red-500 pl-4 font-medium">
              {t.hero.subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 inline-block max-w-full">
              <p className="text-white font-bold tracking-wide text-sm md:text-base break-words">
                {t.hero.details}
              </p>
            </motion.div>

            {/* MLS Credibility Block */}
            <motion.div variants={itemVariants} className="pt-4 md:pt-6 flex flex-col items-center md:items-start space-y-3">
              <div className="relative group mx-auto md:mx-0">
                <div className="absolute -inset-2 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all duration-500"></div>
                <img 
                  src="https://images.mlssoccer.com/image/upload/v1664742553/assets/logos/mls-next-2022-COLOR-800x800.png" 
                  alt="MLS Next" 
                  className="w-24 h-24 md:w-32 md:h-32 max-w-[140px] object-contain relative z-10 drop-shadow-2xl"
                />
              </div>
              <div className="text-center md:text-left w-full md:w-auto">
                <p className="text-[10px] md:text-[11px] text-white/40 tracking-[0.15em] uppercase font-bold mb-1">
                  {t.hero.academyDivision}
                </p>
                <p className="text-gray-300 font-medium text-base md:text-lg italic">
                  {t.hero.evaluatedBy}
                </p>
              </div>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div variants={itemVariants} className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-md mx-auto md:mx-0">
                {[
                  { label: t.hero.days, value: timeLeft.days },
                  { label: t.hero.hours, value: timeLeft.hours },
                  { label: t.hero.mins, value: timeLeft.minutes },
                  { label: t.hero.secs, value: timeLeft.seconds }
                ].map((block, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center bg-black/50 backdrop-blur-md border border-gray-700 rounded-xl p-3 md:p-4">
                    <span className="text-3xl md:text-4xl font-black text-yellow-400 font-heading leading-none">{block.value}</span>
                    <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">{block.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* --- THE FORM --- */}
          <motion.div 
            id="register" 
            className="bg-white rounded-3xl shadow-2xl shadow-black/50 p-4 md:p-8 transform transition-all border-t-8 border-red-600 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
             
             {/* Decorative Background Icon */}
             <Trophy className="absolute -top-6 -right-6 w-32 h-32 text-gray-50 opacity-50 rotate-12 pointer-events-none" />

             <div className="relative z-10 w-full">
               {formStatus === 'success' ? (
                 <motion.div 
                   className="text-center py-12"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                 >
                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                       <CheckCircle2 className="w-10 h-10 text-green-600" />
                   </div>
                   <h3 className="text-3xl font-heading font-black text-gray-900 mb-2">{t.form.successTitle}</h3>
                   <p className="text-gray-500 text-lg mb-8">
                      {t.form.successLine1} <strong>{name}</strong> {t.form.successLine2} <strong>{location}</strong> {t.form.successLine3}
                   </p>
                   <p className="text-gray-600 text-sm">
                     {t.form.successLine4} <strong>{email}</strong> {t.form.successLine5}
                   </p>
                 </motion.div>
               ) : (
                 <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                   <motion.h2 variants={itemVariants} className="text-2xl lg:text-3xl font-heading font-black text-gray-900 mb-1 uppercase tracking-tight">{t.form.title}</motion.h2>
                   <motion.p variants={itemVariants} className="text-gray-500 text-sm mb-6 font-medium">{t.form.subtitle}</motion.p>

                   <form onSubmit={handleBookingSubmit} className="space-y-5 w-full">
                      {/* Consent */}
                      <motion.label variants={itemVariants} className="flex items-start space-x-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                          <input 
                            type="checkbox" 
                            required
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded bg-white checked:bg-red-600 checked:border-red-600 transition-all focus:ring-2 focus:ring-red-600 focus:ring-offset-1 outline-none"
                          />
                          <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          {t.form.consent}
                        </span>
                      </motion.label>

                      {/* Location Switcher */}
                      <motion.div variants={itemVariants} className="w-full">
                        <div className="flex flex-col sm:flex-row bg-gray-100 p-1 rounded-xl gap-1 w-full">
                          <button
                            type="button"
                            onClick={() => setLocation('Euharlee')}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 w-full ${
                              location === 'Euharlee' 
                                ? 'bg-white text-red-600 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {t.form.euharlee}
                          </button>
                          <button
                            type="button"
                            onClick={() => setLocation('Gainesville')}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 w-full ${
                              location === 'Gainesville' 
                                ? 'bg-white text-red-600 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {t.form.gainesville}
                          </button>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="pt-2">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-red-600/20 pb-2 mb-4">{t.form.playerInfo}</h3>
                      </motion.div>

                      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {/* Name */}
                        <div className="w-full">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block ml-1">{t.form.fullName}</label>
                          <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t.form.fullName}
                            className="w-full bg-gray-50 px-4 py-3 rounded-xl font-semibold text-gray-900 border border-gray-200 focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all outline-none shadow-[0_0_0_0px_#CC0000] focus:shadow-[0_0_0_2px_#CC0000]"
                          />
                        </div>

                        {/* BirthDate */}
                        <div className="w-full">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block ml-1">{t.form.birthDate}</label>
                          <input 
                            type="date" 
                            required
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full bg-gray-50 px-4 py-3 rounded-xl font-semibold text-gray-900 border border-gray-200 focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all outline-none shadow-[0_0_0_0px_#CC0000] focus:shadow-[0_0_0_2px_#CC0000]"
                          />
                        </div>
                      </motion.div>

                      {/* Email */}
                      <motion.div variants={itemVariants} className="w-full">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block ml-1">{t.form.email}</label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t.form.email}
                          className="w-full bg-gray-50 px-4 py-3 rounded-xl font-semibold text-gray-900 border border-gray-200 focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all outline-none shadow-[0_0_0_0px_#CC0000] focus:shadow-[0_0_0_2px_#CC0000]"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 w-full">
                        {/* City */}
                        <div className="w-full">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block ml-1">{t.form.city}</label>
                          <input 
                            type="text" 
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder={t.form.city}
                            className="w-full bg-gray-50 px-4 py-3 rounded-xl font-semibold text-gray-900 border border-gray-200 focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all outline-none shadow-[0_0_0_0px_#CC0000] focus:shadow-[0_0_0_2px_#CC0000]"
                          />
                        </div>

                        {/* Zip */}
                        <div className="w-full">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block ml-1">{t.form.zip}</label>
                          <input 
                            type="text" 
                            required
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            placeholder={t.form.zip}
                            className="w-full bg-gray-50 px-4 py-3 rounded-xl font-semibold text-gray-900 border border-gray-200 focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all outline-none shadow-[0_0_0_0px_#CC0000] focus:shadow-[0_0_0_2px_#CC0000]"
                          />
                        </div>
                      </motion.div>

                      {/* Position */}
                      <motion.div variants={itemVariants} className="w-full">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">{t.form.positionLabel}</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
                          {positions.map(pos => (
                            <button
                              type="button"
                              key={pos}
                              onClick={() => setPosition(pos)}
                              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 border w-full ${
                                position === pos 
                                  ? 'bg-red-600 border-red-600 text-white shadow-md' 
                                  : 'bg-white border-gray-200 text-gray-600 hover:border-red-300'
                              }`}
                            >
                              {pos}
                            </button>
                          ))}
                        </div>
                      </motion.div>

                      {/* How did you hear */}
                      <motion.div variants={itemVariants} className="w-full">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block ml-1">{t.form.heardAbout}</label>
                        <div className="relative">
                          <select 
                            required
                            value={heardAbout}
                            onChange={(e) => setHeardAbout(e.target.value)}
                            className="w-full bg-gray-50 px-4 py-3 rounded-xl font-semibold text-gray-900 border border-gray-200 focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all outline-none shadow-[0_0_0_0px_#CC0000] focus:shadow-[0_0_0_2px_#CC0000] appearance-none pr-10"
                          >
                            <option value="" disabled>{t.form.heardAbout}</option>
                            <option value="Instagram">{t.form.heardAboutOptions.instagram}</option>
                            <option value="TikTok">{t.form.heardAboutOptions.tiktok}</option>
                            <option value="Facebook">{t.form.heardAboutOptions.facebook}</option>
                            <option value="Friend">{t.form.heardAboutOptions.friend}</option>
                            <option value="Coach">{t.form.heardAboutOptions.coach}</option>
                            <option value="Other">{t.form.heardAboutOptions.other}</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {/* Current Team */}
                        <div className="w-full">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block ml-1">{t.form.currentTeam}</label>
                          <input 
                            type="text" 
                            value={currentTeam}
                            onChange={(e) => setCurrentTeam(e.target.value)}
                            placeholder={t.form.currentTeam}
                            className="w-full bg-gray-50 px-4 py-3 rounded-xl font-semibold text-gray-900 border border-gray-200 focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all outline-none shadow-[0_0_0_0px_#CC0000] focus:shadow-[0_0_0_2px_#CC0000]"
                          />
                        </div>

                        {/* Highest Level */}
                        <div className="w-full">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block ml-1">{t.form.highestLevel}</label>
                          <input 
                            type="text" 
                            required
                            value={highestLevel}
                            onChange={(e) => setHighestLevel(e.target.value)}
                            placeholder={t.form.highestLevel}
                            className="w-full bg-gray-50 px-4 py-3 rounded-xl font-semibold text-gray-900 border border-gray-200 focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all outline-none shadow-[0_0_0_0px_#CC0000] focus:shadow-[0_0_0_2px_#CC0000]"
                          />
                        </div>
                      </motion.div>

                      <motion.button 
                        variants={itemVariants}
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className="relative w-full min-h-[52px] overflow-hidden bg-red-600 hover:bg-red-700 text-white font-heading font-black uppercase tracking-widest px-6 py-3 rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center space-x-2 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4 group"
                      >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        {formStatus === 'submitting' ? <Loader2 className="animate-spin relative z-10" /> : <span className="relative z-10">{t.form.submit}</span>}
                      </motion.button>
                   </form>
                 </motion.div>
               )}
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- LOCATION & SCHEDULE SECTION --- */}
      <section id="locations" className="py-12 md:py-16 lg:py-24 bg-gray-900 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-[128px] opacity-10 -ml-24 -mt-24 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[128px] opacity-10 -mr-24 -mb-24 pointer-events-none"></div>

        <motion.div 
          className="max-w-6xl mx-auto px-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-black text-white mb-4 tracking-tight uppercase">
              {t.locations.title}
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Euharlee Card */}
            <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 border-t-4 border-t-red-600 hover:bg-white/10 transition-colors w-full">
              <h3 className="text-2xl md:text-3xl font-heading font-black text-white uppercase tracking-tight mb-2">Euharlee</h3>
              <div className="flex items-center space-x-2 text-red-400 font-bold mb-6">
                <CalendarDays className="w-5 h-5" />
                <span>April 18</span>
              </div>
              
              <a 
                href="https://maps.google.com/?q=100+Euharlee+5+Forks+Rd+SW,+Euharlee,+GA+30145" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors mb-8 group"
              >
                <MapPin className="w-5 h-5 text-gray-400 group-hover:text-red-500 shrink-0 mt-0.5" />
                <span className="break-words">
                  <strong>Joe Cowen Park</strong><br/>
                  100 Euharlee 5 Forks Rd SW<br/>
                  Euharlee, GA 30145
                </span>
              </a>

              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-red-600/20 pb-3">
                  <span className="text-white font-bold">U13-U14</span>
                  <span className="text-gray-400 text-right">10:00–11:30am</span>
                </div>
                <div className="flex justify-between items-center border-b border-red-600/20 pb-3">
                  <span className="text-white font-bold">U15-U16</span>
                  <span className="text-gray-400 text-right">11:30am–1:00pm</span>
                </div>
                <div className="flex justify-between items-center pb-3">
                  <span className="text-white font-bold">U17-U19</span>
                  <span className="text-gray-400 text-right">1:00–2:30pm</span>
                </div>
              </div>
            </motion.div>

            {/* Gainesville Card */}
            <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 border-t-4 border-t-red-600 hover:bg-white/10 transition-colors w-full">
              <h3 className="text-2xl md:text-3xl font-heading font-black text-white uppercase tracking-tight mb-2">Gainesville</h3>
              <div className="flex items-center space-x-2 text-red-400 font-bold mb-6">
                <CalendarDays className="w-5 h-5" />
                <span>April 19</span>
              </div>
              
              <a 
                href="https://maps.google.com/?q=1560+Community+Way+NE,+Gainesville,+GA+30501" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors mb-8 group"
              >
                <MapPin className="w-5 h-5 text-gray-400 group-hover:text-red-500 shrink-0 mt-0.5" />
                <span className="break-words">
                  1560 Community Way NE<br/>
                  Gainesville, GA 30501
                </span>
              </a>

              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-red-600/20 pb-3">
                  <span className="text-white font-bold">U13</span>
                  <span className="text-gray-400 text-right">9:00–10:30am</span>
                </div>
                <div className="flex justify-between items-center border-b border-red-600/20 pb-3">
                  <span className="text-white font-bold">U14</span>
                  <span className="text-gray-400 text-right">10:30am–12:00pm</span>
                </div>
                <div className="flex justify-between items-center border-b border-red-600/20 pb-3">
                  <span className="text-white font-bold">U15</span>
                  <span className="text-gray-400 text-right">12:00–1:30pm</span>
                </div>
                <div className="flex justify-between items-center border-b border-red-600/20 pb-3">
                  <span className="text-white font-bold">U16</span>
                  <span className="text-gray-400 text-right">1:30–3:00pm</span>
                </div>
                <div className="flex justify-between items-center border-b border-red-600/20 pb-3">
                  <span className="text-white font-bold">U17</span>
                  <span className="text-gray-400 text-right">3:00–4:30pm</span>
                </div>
                <div className="flex justify-between items-center pb-3">
                  <span className="text-white font-bold">U19</span>
                  <span className="text-gray-400 text-right">4:30–6:00pm</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <HowItWorksSection t={t} />

      {/* --- INSTAGRAM PROFILE CLONE SECTION --- */}
      <section id="instagram" className="py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
         <motion.div 
           className="max-w-4xl mx-auto px-6 relative z-10"
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
         >
            
            {/* Insta Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center md:items-start md:space-x-12 mb-12">
               {/* Profile Pic */}
               <div className="mb-6 md:mb-0 shrink-0">
                  <div className="w-24 h-24 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                     <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white">
                        <img 
                           src="https://traccoveredbridge.com/wp-content/uploads/2024/03/Covered_Bridge_logo.png" 
                           alt="Profile" 
                           className="w-full h-full object-contain"
                        />
                     </div>
                  </div>
               </div>

               {/* Profile Info */}
               <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 mb-5">
                     <h2 className="text-2xl font-light text-gray-800 flex items-center gap-1">
                        coveredbridge_ 
                        <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-50" />
                     </h2>
                     <div className="flex space-x-2">
                        <a href="https://www.instagram.com/coveredbridge_/" target="_blank" rel="noreferrer" className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-5 py-1.5 rounded-xl text-sm font-semibold transition-colors">
                           {t.instagram.follow}
                        </a>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-1.5 rounded-xl text-sm font-semibold transition-colors">
                           {t.instagram.message}
                        </button>
                        <button className="text-gray-800 p-1">
                           <MoreHorizontal className="w-6 h-6" />
                        </button>
                     </div>
                  </div>

                  <div className="flex space-x-8 mb-5 text-sm md:text-base">
                     <div className="text-gray-900"><span className="font-bold">575</span> {t.instagram.posts}</div>
                     <div className="text-gray-900"><span className="font-bold">7.9k</span> {t.instagram.followers}</div>
                     <div className="text-gray-900"><span className="font-bold">3,510</span> {t.instagram.following}</div>
                  </div>

                  <div className="text-sm text-gray-900 leading-snug">
                     <div className="font-bold mb-0.5">Covered Bridge Academy</div>
                     <div className="text-gray-600">{t.instagram.sportsClub}</div>
                     <div className="mt-1">📍EUHARLEE 📍CUMMING</div>
                     <div>📍MARIETTA 📍GAINESVILLE</div>
                     <div className="text-[#00376b] mt-1">@georgiasoccer @usyouthsoccer @nationalleaguesoccer @eliteacademyleague</div>
                     <div className="mt-1">🏴󠁧󠁢󠁥󠁮󠁧󠁿🇳🇱🇧🇷🇵🇹🇪🇸🇺🇸</div>
                     <div className="font-medium mt-1">{t.instagram.germanyTrip}</div>
                     <a href="#" className="text-[#00376b] font-semibold hover:underline">linktr.ee/coveredbridge</a>
                  </div>
               </div>
            </motion.div>
         </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-white py-12 border-t border-gray-800">
         <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
            
            <div className="flex items-center space-x-3 mb-8">
               <div className="w-12 h-12 rounded-full border-2 border-yellow-400 bg-white p-1 overflow-hidden shrink-0">
                 <img src="https://traccoveredbridge.com/wp-content/uploads/2024/03/Covered_Bridge_logo.png" alt="Footer Logo" className="w-full h-full object-contain" />
               </div>
               <span className="font-heading font-black text-2xl uppercase tracking-tighter text-white">Covered Bridge</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">
               <a href="#" className="hover:text-yellow-400 transition-colors">{t.footer.idClinic}</a>
               <a href="#" className="hover:text-yellow-400 transition-colors">{t.footer.camps}</a>
               <a href="#" className="hover:text-yellow-400 transition-colors">{t.footer.tournaments}</a>
               <a href="#" className="hover:text-yellow-400 transition-colors">{t.footer.contact}</a>
            </div>
            
            <div className="w-full h-px bg-gray-800 mb-8"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-center w-full text-xs text-gray-600 gap-4">
               <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
               <div className="flex space-x-6">
                  <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
                  <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
               </div>
            </div>
         </div>
      </footer>

      {/* --- STICKY CTA (MOBILE ONLY) --- */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] px-4 py-2.5 flex justify-center md:hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showStickyCTA ? 0 : 100, opacity: showStickyCTA ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src="https://images.mlssoccer.com/image/upload/v1664742553/assets/logos/mls-next-2022-COLOR-800x800.png" 
              alt="MLS Next" 
              className="h-8 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">{t.sticky.idClinic}</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-bold text-gray-900">{t.sticky.available}</span>
              </div>
            </div>
          </div>
          <a 
            href="#register"
            className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-5 py-2.5 rounded-lg font-heading font-bold text-sm tracking-wide shadow-md shadow-red-600/20 transition-all active:scale-95"
          >
            <span>{t.sticky.secureSpot}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
