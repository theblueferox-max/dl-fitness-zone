import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Phone, Star, ChevronRight, CheckCircle2, Dumbbell, Activity, Flame, Users, Clock, Instagram, Facebook, Twitter, Quote, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Programs', href: '#programs' },
  { name: 'BMI Calculator', href: '#bmi' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Success Stories', href: '#stories' },
  { name: 'Contact', href: '#contact' },
];

const PROGRAMS = [
  { title: 'Strength Training', desc: 'Build muscle and power with our free weights and resistance machines.', icon: <Dumbbell className="w-8 h-8 text-[#FFD300]" />, img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop' },
  { title: 'Cardio Fitness', desc: 'Boost endurance with treadmills, ellipticals, and high-intensity sessions.', icon: <Activity className="w-8 h-8 text-[#FFD300]" />, img: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1374&auto=format&fit=crop' },
  { title: 'Weight Loss', desc: 'Burn fat effectively with guided routines and nutritional advice.', icon: <Flame className="w-8 h-8 text-[#FFD300]" />, img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop' },
  { title: 'Personal Training', desc: '1-on-1 coaching tailored to your specific fitness goals in Hyderabad.', icon: <Users className="w-8 h-8 text-[#FFD300]" />, img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop' },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // BMI State
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState<string | null>(null);

  // Contact State
  const [contactForm, setContactForm] = useState({ name: '', phone: '', goal: '' });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmi = (w / (h * h)).toFixed(1);
      let category = '';
      if (Number(bmi) < 18.5) category = 'Underweight 🔻';
      else if (Number(bmi) < 25) category = 'Normal weight ✅';
      else if (Number(bmi) < 30) category = 'Overweight ⚠️';
      else category = 'Obese 🔴';
      setBmiResult(`Your BMI is ${bmi} (${category})`);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.phone) {
      alert('Thanks for reaching out! We will contact you shortly.');
      setContactForm({ name: '', phone: '', goal: '' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#FFFFFF] font-sans selection:bg-[#FFD300] selection:text-[#121212]">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#121212] py-4 shadow-lg shadow-black/50' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FFD300] rounded flex items-center justify-center shadow-[0_4px_15px_rgba(255,211,0,0.3)]">
              <Dumbbell className="w-6 h-6 text-[#121212]" />
            </div>
            <div>
              <h1 className="text-xl font-oswald font-bold uppercase leading-none tracking-wide text-[#FFFFFF]">DL Fitness</h1>
              <p className="text-[10px] text-[#FFD300] font-bold tracking-widest uppercase leading-none">Zone</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-[#A0A0A0] hover:text-[#FFD300] transition-colors uppercase tracking-wider">
                {link.name}
              </a>
            ))}
            <a href="#contact" className="bg-[#FFD300] text-[#121212] px-6 py-3 rounded font-bold uppercase tracking-wider text-sm hover:bg-yellow-400 transition-all min-h-[48px] flex items-center shadow-[0_4px_15px_rgba(255,211,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,211,0,0.5)] hover:-translate-y-0.5">
              Join the Zone
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-[#FFFFFF] p-2 min-h-[48px] min-w-[48px] flex items-center justify-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#121212] pt-24 px-6 lg:hidden flex flex-col gap-6">
          {NAV_LINKS.map(link => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-2xl font-oswald font-bold uppercase tracking-wider text-[#A0A0A0] hover:text-[#FFD300]">
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-[#FFD300] text-[#121212] px-6 py-4 rounded font-bold uppercase tracking-wider text-center mt-4 min-h-[48px] flex items-center justify-center shadow-[0_4px_15px_rgba(255,211,0,0.3)]">
            Join the Zone
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" alt="Gym" className="w-full h-full object-cover opacity-30" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-[#FFD300] font-bold tracking-widest uppercase mb-4 text-sm md:text-base flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#FFD300] inline-block"></span>
              Jiyaguda's Elite Gym Experience
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-oswald font-bold uppercase tracking-tighter leading-[1.1] mb-8 text-[#FFFFFF]">
              Transform Yourself <br /> <span className="text-[#FFD300]">In The Zone.</span>
            </h1>
            <p className="text-lg text-[#A0A0A0] mb-10 max-w-xl">
              Experience top-tier equipment, expert trainers, and a motivating community right here in Jiyaguda, Hyderabad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-[#FFD300] text-[#121212] px-8 py-4 rounded font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all min-h-[48px] w-max shadow-[0_4px_15px_rgba(255,211,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,211,0,0.5)] hover:-translate-y-1">
                Join the Zone <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section id="programs" className="py-24 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase tracking-tighter mb-4 text-[#FFFFFF]">Our Programs</h2>
            <div className="w-24 h-1 bg-[#FFD300] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMS.map((prog, idx) => (
              <div key={idx} className="group relative bg-[#1E1E1E] border border-[#2C2C2C] rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:border-[#FFD300]/50">
                <div className="aspect-video overflow-hidden relative border-b border-[#2C2C2C]">
                  <img src={prog.img} alt={prog.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-300" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] to-transparent" />
                </div>
                <div className="p-6 relative z-10 -mt-10">
                  <div className="w-14 h-14 bg-[#121212] border border-[#2C2C2C] rounded flex items-center justify-center mb-4 shadow-lg group-hover:border-[#FFD300] transition-colors">
                    {prog.icon}
                  </div>
                  <h3 className="text-xl font-oswald font-bold uppercase tracking-wide mb-2 text-[#FFFFFF]">{prog.title}</h3>
                  <p className="text-[#A0A0A0] text-sm leading-relaxed">{prog.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The BMI Engine */}
      <section id="bmi" className="py-24 bg-[#1E1E1E] border-y border-[#2C2C2C]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[#FFD300] font-bold tracking-widest uppercase mb-2 text-xs">Know Your Metrics</h2>
              <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase tracking-tighter mb-4 text-[#FFFFFF]">The BMI Engine</h2>
              <div className="w-24 h-1 bg-[#FFD300] mb-6"></div>
              <p className="text-[#A0A0A0] mb-8 text-lg">
                Calculate your Body Mass Index (BMI) to understand your current fitness level and set the right goals.
              </p>
              <form onSubmit={calculateBMI} className="space-y-4 max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#A0A0A0] uppercase mb-2">Height (cm)</label>
                    <input type="number" value={height} onChange={e => setHeight(e.target.value)} required className="w-full bg-[#2C2C2C] border border-[#2C2C2C] text-[#FFFFFF] px-4 py-3 rounded focus:outline-none focus:border-[#FFD300] transition-colors min-h-[48px]" placeholder="175" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#A0A0A0] uppercase mb-2">Weight (kg)</label>
                    <input type="number" value={weight} onChange={e => setWeight(e.target.value)} required className="w-full bg-[#2C2C2C] border border-[#2C2C2C] text-[#FFFFFF] px-4 py-3 rounded focus:outline-none focus:border-[#FFD300] transition-colors min-h-[48px]" placeholder="70" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#FFD300] text-[#121212] font-bold uppercase tracking-wider py-3 rounded hover:bg-yellow-400 transition-all min-h-[48px] shadow-[0_4px_15px_rgba(255,211,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,211,0,0.5)] hover:-translate-y-0.5">
                  Calculate BMI
                </button>
              </form>
              {bmiResult && (
                <div className="mt-6 p-4 bg-[#121212] border-l-4 border-[#FFD300] rounded">
                  <p className="text-[#FFD300] font-bold text-lg">{bmiResult}</p>
                </div>
              )}
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-[#FFD300] rounded-lg transform translate-x-4 translate-y-4 opacity-20"></div>
              <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop" alt="Fitness Measurement" className="rounded-lg shadow-2xl opacity-90 relative z-10 border border-[#2C2C2C]" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tier */}
      <section id="pricing" className="py-24 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase tracking-tighter mb-4 text-[#FFFFFF]">Membership Plans</h2>
            <div className="w-24 h-1 bg-[#FFD300] mx-auto mb-4"></div>
            <p className="text-[#A0A0A0]">Simple pricing. No hidden fees. Prices in INR.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {/* Basic */}
            <div className="bg-[#1E1E1E] p-8 rounded-lg border border-[#2C2C2C]">
              <h3 className="text-xl font-oswald font-bold uppercase tracking-wider mb-2 text-[#FFFFFF]">Basic</h3>
              <div className="text-4xl font-bold text-[#FFFFFF] mb-6">₹1,200<span className="text-sm text-[#A0A0A0] font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['Access to gym equipment', 'Locker room access', 'Free parking'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#A0A0A0] text-sm"><CheckCircle2 className="w-5 h-5 text-[#FFD300]" /> {f}</li>
                ))}
              </ul>
              <a href="#contact" className="block w-full py-3 text-center border border-[#2C2C2C] text-[#FFFFFF] rounded font-bold uppercase hover:border-[#FFD300] hover:text-[#FFD300] transition-colors min-h-[48px] leading-[24px]">Choose Basic</a>
            </div>
            {/* Pro */}
            <div className="bg-[#1E1E1E] p-8 rounded-lg border-2 border-[#FFD300] relative transform md:-translate-y-4 shadow-[0_10px_30px_rgba(255,211,0,0.15)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFD300] text-[#121212] text-xs font-bold uppercase px-4 py-1 rounded-full shadow-[0_4px_15px_rgba(255,211,0,0.3)]">Most Popular</div>
              <h3 className="text-xl font-oswald font-bold uppercase tracking-wider mb-2 text-[#FFFFFF]">Pro</h3>
              <div className="text-5xl font-bold text-[#FFD300] mb-6">₹2,000<span className="text-sm text-[#A0A0A0] font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['All Basic features', 'Group fitness classes', 'Customized workout plan', '1 PT session/mo'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#FFFFFF] text-sm"><CheckCircle2 className="w-5 h-5 text-[#FFD300]" /> {f}</li>
                ))}
              </ul>
              <a href="#contact" className="block w-full py-3 text-center bg-[#FFD300] text-[#121212] rounded font-bold uppercase hover:bg-yellow-400 transition-all min-h-[48px] leading-[24px] shadow-[0_4px_15px_rgba(255,211,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,211,0,0.5)] hover:-translate-y-0.5">Choose Pro</a>
            </div>
            {/* Elite */}
            <div className="bg-[#1E1E1E] p-8 rounded-lg border border-[#2C2C2C]">
              <h3 className="text-xl font-oswald font-bold uppercase tracking-wider mb-2 text-[#FFFFFF]">Elite</h3>
              <div className="text-4xl font-bold text-[#FFFFFF] mb-6">₹4,500<span className="text-sm text-[#A0A0A0] font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['All Pro features', 'Unlimited PT sessions', 'Advanced diet planning', 'Priority support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#A0A0A0] text-sm"><CheckCircle2 className="w-5 h-5 text-[#FFD300]" /> {f}</li>
                ))}
              </ul>
              <a href="#contact" className="block w-full py-3 text-center border border-[#2C2C2C] text-[#FFFFFF] rounded font-bold uppercase hover:border-[#FFD300] hover:text-[#FFD300] transition-colors min-h-[48px] leading-[24px]">Choose Elite</a>
            </div>
          </div>
        </div>
      </section>

      {/* Local Social Proof */}
      <section id="stories" className="py-24 bg-[#1E1E1E] border-t border-[#2C2C2C]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase tracking-tighter mb-4 text-[#FFFFFF]">Member Success Stories</h2>
            <div className="w-24 h-1 bg-[#FFD300] mx-auto mb-4"></div>
            <div className="flex items-center justify-center gap-2 text-[#FFD300]">
              <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              <span className="text-[#FFFFFF] font-bold ml-2">4.5 Rating on Google</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { name: 'Arjun fitness club', text: 'Good gym and coaching is awsum weightng training weightloss personal taking care of every student.' },
              { name: 'navateja guduri', text: 'Great recommendation for this. Awesome experience. I specially like body building and cardio... courteous trainer.' },
              { name: 'Gujjari Kapil', text: 'Super gym excellent coach from arjun singh.' }
            ].map((review, i) => (
              <div key={i} className="bg-[#121212] p-8 rounded-lg relative border border-[#2C2C2C]">
                <Quote className="w-8 h-8 text-[#2C2C2C] absolute top-4 right-4" />
                <div className="flex gap-1 mb-4 text-[#FFD300]">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-[#A0A0A0] mb-6 italic text-sm leading-relaxed">"{review.text}"</p>
                <h4 className="font-bold text-[#FFFFFF] uppercase text-sm">{review.name}</h4>
              </div>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="bg-[#121212] rounded-lg p-2 h-[400px] relative overflow-hidden flex items-center justify-center border border-[#2C2C2C]">
            <div className="text-center z-10">
              <MapPin className="w-12 h-12 text-[#FFD300] mx-auto mb-4" />
              <h3 className="text-2xl font-oswald font-bold text-[#FFFFFF] mb-2">Located in Jiyaguda, Hyderabad</h3>
              <p className="text-[#A0A0A0]">13-3-598, Opp: Gopi Hotel, Puranapool</p>
            </div>
            {/* Simulating a map background */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1474&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity"></div>
          </div>
        </div>
      </section>

      {/* Lead Gen Footer */}
      <footer id="contact" className="bg-[#121212] pt-24 pb-12 border-t border-[#2C2C2C]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FFD300]/10 border border-[#FFD300]/20 text-[#FFD300] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-8">
                <Clock className="w-4 h-4" /> Open 24/7
              </div>
              <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase tracking-tighter mb-6 text-[#FFFFFF]">Ready To Start?</h2>
              <p className="text-[#A0A0A0] mb-8 text-lg">Drop by our Jiyaguda location or fill out the form to book your free trial session today.</p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1E1E1E] border border-[#2C2C2C] rounded flex items-center justify-center text-[#FFD300]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm text-[#A0A0A0] uppercase font-bold">Call / WhatsApp</h4>
                    <a href="https://wa.me/919441930182" target="_blank" rel="noopener noreferrer" className="text-[#FFFFFF] font-bold text-lg hover:text-[#FFD300] transition-colors">094419 30182</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1E1E1E] border border-[#2C2C2C] rounded flex items-center justify-center text-[#FFD300]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm text-[#A0A0A0] uppercase font-bold">Visit Us</h4>
                    <p className="text-[#FFFFFF] font-bold">13-3-598, Opp: Gopi Hotel, Puranapool</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1E1E1E] p-8 rounded-lg border border-[#2C2C2C]">
              <h3 className="text-2xl font-oswald font-bold uppercase mb-6 text-[#FFFFFF]">Book Free Trial</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <input type="text" placeholder="Your Name" required value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} className="w-full bg-[#2C2C2C] border border-[#2C2C2C] text-[#FFFFFF] px-4 py-3 rounded focus:outline-none focus:border-[#FFD300] transition-colors min-h-[48px]" />
                </div>
                <div>
                  <input type="tel" placeholder="Phone Number" required value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} className="w-full bg-[#2C2C2C] border border-[#2C2C2C] text-[#FFFFFF] px-4 py-3 rounded focus:outline-none focus:border-[#FFD300] transition-colors min-h-[48px]" />
                </div>
                <div className="relative">
                  <select value={contactForm.goal} onChange={e => setContactForm({ ...contactForm, goal: e.target.value })} className="w-full bg-[#2C2C2C] border border-[#2C2C2C] text-[#FFFFFF] px-4 py-3 pr-10 rounded focus:outline-none focus:border-[#FFD300] transition-colors min-h-[48px] appearance-none cursor-pointer">
                    <option value="" disabled>Select Your Goal</option>
                    <option value="weight_loss">Weight Loss</option>
                    <option value="muscle_gain">Muscle Gain</option>
                    <option value="general_fitness">General Fitness</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A0A0] pointer-events-none" />
                </div>
                <button type="submit" className="w-full bg-[#FFD300] text-[#121212] font-bold uppercase tracking-wider py-3 rounded hover:bg-yellow-400 transition-all min-h-[48px] shadow-[0_4px_15px_rgba(255,211,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,211,0,0.5)] hover:-translate-y-0.5 mt-2">
                  Submit Request
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#2C2C2C] gap-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-[#FFD300]" />
              <span className="font-oswald font-bold uppercase text-[#FFFFFF] tracking-wide">DL Fitness Zone</span>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[#A0A0A0] text-sm mb-1">Proudly serving the Jiyaguda community.</p>
              <p className="text-[#A0A0A0] text-sm opacity-70">© {new Date().getFullYear()} DL Fitness Zone. All rights reserved.</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-[#A0A0A0] hover:text-[#FFD300] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-[#A0A0A0] hover:text-[#FFD300] transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-[#A0A0A0] hover:text-[#FFD300] transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

