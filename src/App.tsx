import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Wind, 
  Battery, 
  Zap, 
  Menu, 
  X, 
  ChevronRight, 
  MessageSquare, 
  BarChart3, 
  ShieldCheck, 
  Globe, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calculator,
  Download,
  CheckCircle2,
  Send,
  Loader2
} from 'lucide-react';
import { getGeminiResponse } from './services/gemini';

// --- Types ---
type Page = 'home' | 'about' | 'products' | 'skyvolt' | 'ai' | 'quote' | 'blog' | 'contact' | 'subscription';

// --- Components ---

const Navbar = ({ activePage, setActivePage }: { activePage: Page, setActivePage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: Page, label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Solutions' },
    { id: 'skyvolt', label: 'SkyVolt OS' },
    { id: 'subscription', label: 'Pricing' },
    { id: 'ai', label: 'AI Assistant' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => setActivePage('home')}
        >
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-emerald-500/10">
            <img 
              src="https://image2url.com/r2/default/images/1771592876725-fa6ec4ac-09fb-4ab5-af0d-7dd0e453b11c.jpeg" 
              alt="SkyThernEnergy Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xl font-bold tracking-tighter text-slate-900">
            SKYTHERN<span className="text-emerald-600">ENERGY</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`text-sm font-medium transition-colors hover:text-emerald-600 ${activePage === link.id ? 'text-emerald-600' : 'text-slate-600'}`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => setActivePage('quote')}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg font-medium ${activePage === link.id ? 'text-emerald-600' : 'text-slate-600'}`}
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => {
                  setActivePage('quote');
                  setIsMobileMenuOpen(false);
                }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl text-center font-semibold"
              >
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/50 skew-x-12 transform translate-x-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl" />
    </div>

    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
          <Globe size={14} />
          Powering Africa's Future
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-slate-900">
          24/7 Smart <span className="text-emerald-600">Renewable Energy</span> for Africa.
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
          Reliable, affordable, and intelligent power solutions integrating solar, wind, and AI-driven management to eliminate blackouts forever.
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onCtaClick}
            className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/30 flex items-center gap-2 group"
          >
            Request a Quote
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
            Explore Solutions
          </button>
        </div>
        
        <div className="mt-12 flex items-center gap-8 pt-8 border-t border-slate-100">
          <div>
            <div className="text-2xl font-bold text-slate-900">1M+</div>
            <div className="text-sm text-slate-500">Homes Targeted</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">500+</div>
            <div className="text-sm text-slate-500">Mini-Grids</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">24/7</div>
            <div className="text-sm text-slate-500">Uptime Guarantee</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative"
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square md:aspect-auto md:h-[600px]">
          <img 
            src="https://picsum.photos/seed/solar-capetown/1200/1600" 
            alt="Solar Installation in Cape Town" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          
          {/* Floating Stats Card */}
          <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase">Current Output</div>
                  <div className="text-lg font-bold text-slate-900">4.8 kW / 5.0 kW</div>
                </div>
              </div>
              <div className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-1 rounded">Optimal</div>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '96%' }}
                transition={{ duration: 2, delay: 1 }}
                className="bg-emerald-500 h-full" 
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const SkyVoltDemo = () => {
  const [activeTab, setActiveTab] = useState('usage');
  
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-4">SkyVolt OS</div>
            <div className="flex flex-col md:flex-row md:items-center gap-8 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                The Brain of Your <br />Energy Ecosystem.
              </h2>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl shadow-emerald-500/20 shrink-0"
              >
                <img 
                  src="https://monthly-yellow-3lbjjuefp1.edgeone.app/pic.png" 
                  alt="SkyVolt Core" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Our AI-driven operating system monitors your solar output, battery health, and consumption patterns in real-time, optimizing for maximum efficiency and zero downtime.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <BarChart3 />, title: "Real-time Monitoring", desc: "Track every watt generated and consumed." },
                { icon: <Zap />, title: "Smart Optimization", desc: "AI automatically balances loads to extend battery life." },
                { icon: <ShieldCheck />, title: "Predictive Maintenance", desc: "Get alerts before issues occur with smart diagnostics." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-10 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2">
              Learn More About SkyVolt
              <ChevronRight size={18} />
            </button>
          </div>
          
          <div className="relative">
            {/* Mock Dashboard UI */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                    <Zap size={16} />
                  </div>
                  <span className="font-bold text-sm">SkyVolt Dashboard</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
                    <div className="text-slate-500 text-xs font-medium uppercase mb-1">Solar Generation</div>
                    <div className="text-2xl font-bold text-emerald-400">3.2 kW</div>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
                    <div className="text-slate-500 text-xs font-medium uppercase mb-1">Battery Level</div>
                    <div className="text-2xl font-bold text-blue-400">84%</div>
                  </div>
                </div>
                
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium">Energy Consumption</span>
                    <select className="bg-slate-800 text-xs border-none rounded px-2 py-1">
                      <option>Last 24 Hours</option>
                    </select>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {[40, 60, 45, 90, 65, 30, 55, 80, 40, 70, 50, 60].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-sm"
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm text-emerald-400 font-medium">AI Optimization Active</span>
                  </div>
                  <span className="text-xs text-slate-400">Saving 1.2kWh today</span>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Solutions = () => {
  const solutions = [
    {
      title: "Residential Energy",
      icon: <Sun className="text-emerald-600" />,
      desc: "Complete solar home systems with lithium battery backup for 24/7 power.",
      features: ["Solar Panels", "Smart Inverters", "Lithium Storage", "Mobile App"]
    },
    {
      title: "Commercial & Industrial",
      icon: <BarChart3 className="text-emerald-600" />,
      desc: "Large-scale rooftop PV installations for businesses to slash operational costs.",
      features: ["Diesel-to-Solar Hybrid", "Peak Shaving", "Energy Audits", "24/7 Support"]
    },
    {
      title: "Community Mini-Grids",
      icon: <Globe className="text-emerald-600" />,
      desc: "Electrifying rural communities, schools, and health centers with shared power stations.",
      features: ["Rural Electrification", "Water Pumping", "Smart Metering", "Local Jobs"]
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Energy Solutions for Every Need</h2>
          <p className="text-slate-600 text-lg">We provide end-to-end renewable energy infrastructure tailored to the African landscape.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                {React.cloneElement(s.icon as React.ReactElement, { size: 28 })}
              </div>
              <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{s.desc}</p>
              <ul className="space-y-3 mb-8">
                {s.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border border-emerald-200 text-emerald-700 font-bold hover:bg-emerald-50 transition-colors">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIChat = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: "Hello! I'm SkyVolt AI. How can I help you with your energy needs today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getGeminiResponse(userMsg);
    setMessages(prev => [...prev, { role: 'ai', content: response || "I'm sorry, I couldn't process that." }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[600px]">
      <div className="p-6 bg-emerald-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <MessageSquare size={20} />
          </div>
          <div>
            <div className="font-bold">SkyVolt AI Assistant</div>
            <div className="text-xs text-emerald-100">Online & Ready to Help</div>
          </div>
        </div>
        <div className="text-xs bg-white/20 px-2 py-1 rounded">24/7 Support</div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-emerald-600" />
              <span className="text-xs text-slate-500">Thinking...</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about system sizing, pricing, or technical support..."
            className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const QuoteForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'home',
    needs: '',
    budget: '',
    location: '',
    name: '',
    email: ''
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-1/3 h-1.5 rounded-full mx-1 ${step >= i ? 'bg-emerald-500' : 'bg-slate-100'}`} />
          ))}
        </div>
        <h3 className="text-2xl font-bold">Request Your Custom Quote</h3>
        <p className="text-slate-500 text-sm">Tell us about your energy needs and we'll get back to you within 24 hours.</p>
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Project Type</label>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {['Home', 'Business', 'Community'].map(t => (
              <button 
                key={t}
                onClick={() => setFormData({...formData, type: t.toLowerCase()})}
                className={`p-4 rounded-2xl border-2 transition-all ${formData.type === t.toLowerCase() ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 hover:border-emerald-200'}`}
              >
                <div className="font-bold">{t}</div>
              </button>
            ))}
          </div>
          <button onClick={nextStep} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-600/20">Next Step</button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Estimated Energy Needs (kWh/day)</label>
              <input 
                type="text" 
                placeholder="e.g. 10kWh or list your appliances"
                className="w-full bg-slate-50 border-slate-200 rounded-xl p-4"
                onChange={(e) => setFormData({...formData, needs: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Location (City, Country)</label>
              <input 
                type="text" 
                placeholder="e.g. Cape Town, South Africa"
                className="w-full bg-slate-50 border-slate-200 rounded-xl p-4"
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={prevStep} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-xl font-bold">Back</button>
            <button onClick={nextStep} className="flex-2 bg-emerald-600 text-white py-4 rounded-xl font-bold">Next Step</button>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border-slate-200 rounded-xl p-4"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-slate-50 border-slate-200 rounded-xl p-4"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={prevStep} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-xl font-bold">Back</button>
            <button onClick={() => alert('Quote Request Sent!')} className="flex-2 bg-emerald-600 text-white py-4 rounded-xl font-bold">Submit Request</button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const Footer = ({ setActivePage }: { setActivePage: (p: Page) => void }) => (
  <footer className="bg-slate-900 text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg overflow-hidden">
            <img 
              src="https://image2url.com/r2/default/images/1771592876725-fa6ec4ac-09fb-4ab5-af0d-7dd0e453b11c.jpeg" 
              alt="SkyThernEnergy Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-lg font-bold tracking-tighter">SKYTHERNENERGY</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          Empowering Africa with smart, reliable, and sustainable energy solutions. Closing the energy gap one community at a time.
        </p>
        <div className="flex gap-4">
          {/* Social icons would go here */}
        </div>
      </div>
      
      <div>
        <h4 className="font-bold mb-6">Solutions</h4>
        <ul className="space-y-4 text-sm text-slate-400">
          <li><button onClick={() => setActivePage('products')} className="hover:text-emerald-400">Residential Solar</button></li>
          <li><button onClick={() => setActivePage('products')} className="hover:text-emerald-400">Commercial Power</button></li>
          <li><button onClick={() => setActivePage('products')} className="hover:text-emerald-400">Mini-Grids</button></li>
          <li><button onClick={() => setActivePage('skyvolt')} className="hover:text-emerald-400">SkyVolt OS</button></li>
          <li><button onClick={() => setActivePage('subscription')} className="hover:text-emerald-400">Subscription Plans</button></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold mb-6">Company</h4>
        <ul className="space-y-4 text-sm text-slate-400">
          <li><button onClick={() => setActivePage('about')} className="hover:text-emerald-400">About Us</button></li>
          <li><button onClick={() => setActivePage('blog')} className="hover:text-emerald-400">Blog & News</button></li>
          <li><button onClick={() => setActivePage('contact')} className="hover:text-emerald-400">Contact</button></li>
          <li><button className="hover:text-emerald-400">Careers</button></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold mb-6">Contact Us</h4>
        <ul className="space-y-4 text-sm text-slate-400">
          <li className="flex items-center gap-3"><Phone size={16} className="text-emerald-500" /> +27 691417309</li>
          <li className="flex items-center gap-3"><Mail size={16} className="text-emerald-500" /> skythernenergy@gmail.com</li>
          <li className="flex items-start gap-3">
            <MapPin size={16} className="text-emerald-500 mt-1" />
            <span>Cape Town, South Africa</span>
          </li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center gap-4 text-xs text-slate-500">
      <p>© 2026 SkyThernEnergy. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Terms of Service</a>
        <a href="#" className="hover:text-white">Cookie Policy</a>
      </div>
    </div>
  </footer>
);

const SubscriptionPage = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      desc: "Essential monitoring for small residential systems.",
      features: ["Real-time Monitoring", "Daily Usage Reports", "Basic AI Alerts", "Mobile App Access"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "SkyVolt Pro",
      price: "$19",
      period: "/month",
      desc: "Advanced optimization for homes and small businesses.",
      features: ["Everything in Basic", "AI Load Balancing", "Predictive Maintenance", "Priority Support", "Historical Data (1 Year)"],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Full-scale energy management for industrial operations.",
      features: ["Everything in Pro", "Multi-site Management", "API Access", "Dedicated Account Manager", "Custom AI Training"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section className="pt-32 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-slate-600 text-lg">Unlock the full potential of your energy system with SkyVolt OS.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-3xl border ${plan.popular ? 'border-emerald-500 bg-white shadow-2xl relative' : 'border-slate-200 bg-white/50'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-slate-500">{plan.period}</span>}
              </div>
              <p className="text-slate-600 text-sm mb-8">{plan.desc}</p>
              
              <ul className="space-y-4 mb-10">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-emerald-600 rounded-[2.5rem] p-12 text-white flex flex-col md:row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Need a custom solution?</h2>
            <p className="text-emerald-100">We offer tailored plans for large-scale community projects and industrial mini-grids.</p>
          </div>
          <button className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all shrink-0">
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="min-h-screen">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main>
        {activePage === 'blog' && (
          <section className="pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">Energy & Innovation Blog</h1>
                <p className="text-slate-600 text-lg">Insights into Africa's renewable energy transition.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "The Future of Solar in Sub-Saharan Africa",
                    date: "Oct 12, 2025",
                    category: "Industry News",
                    img: "https://picsum.photos/seed/blog1/800/600"
                  },
                  {
                    title: "How SkyVolt OS is Reducing Energy Costs by 40%",
                    date: "Nov 05, 2025",
                    category: "Technology",
                    img: "https://picsum.photos/seed/blog2/800/600"
                  },
                  {
                    title: "Rural Electrification: A Case Study in Kenya",
                    date: "Dec 01, 2025",
                    category: "Community",
                    img: "https://picsum.photos/seed/blog3/800/600"
                  }
                ].map((post, i) => (
                  <motion.div key={i} whileHover={{ y: -5 }} className="group cursor-pointer">
                    <div className="rounded-2xl overflow-hidden mb-6 aspect-video">
                      <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="text-xs font-bold text-emerald-600 uppercase mb-2">{post.category} • {post.date}</div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2">Discover how renewable energy is transforming lives and businesses across the continent...</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activePage === 'home' && (
          <>
            <Hero onCtaClick={() => setActivePage('quote')} />
            <Solutions />
            <SkyVoltDemo />
            <section className="py-24 bg-emerald-50">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-6">Ready to Power Your Future?</h2>
                <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
                  Join thousands of homes and businesses across Africa making the switch to smart, reliable renewable energy.
                </p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => setActivePage('quote')}
                    className="bg-emerald-600 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20"
                  >
                    Get Started Today
                  </button>
                  <button 
                    onClick={() => setActivePage('ai')}
                    className="bg-white text-emerald-700 border border-emerald-200 px-10 py-4 rounded-full font-bold hover:bg-emerald-50 transition-all"
                  >
                    Talk to SkyVolt AI
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {activePage === 'about' && (
          <section className="pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
                <div>
                  <h1 className="text-5xl font-bold mb-8">Our Mission to <br /><span className="text-emerald-600">Electrify Africa</span>.</h1>
                  <p className="text-slate-600 text-lg leading-relaxed mb-6">
                    SkyThernEnergy was founded with a single vision: to close Africa's energy gap using the continent's most abundant resources—the sun and wind.
                  </p>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    We believe that reliable electricity is a fundamental right and the bedrock of socio-economic development. By combining renewable hardware with intelligent software, we're building the infrastructure for a brighter, more sustainable future.
                  </p>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img src="https://picsum.photos/seed/wind-energy-sa/1000/800" alt="Renewable Energy South Africa" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-12">
                <div className="p-8 bg-slate-50 rounded-3xl">
                  <h3 className="text-xl font-bold mb-4 text-emerald-600 uppercase tracking-wider text-sm">Vision</h3>
                  <p className="text-slate-700 font-medium">To be Africa’s leading provider of clean, reliable, and intelligent energy solutions that transform communities.</p>
                </div>
                <div className="p-8 bg-slate-50 rounded-3xl">
                  <h3 className="text-xl font-bold mb-4 text-emerald-600 uppercase tracking-wider text-sm">Mission</h3>
                  <p className="text-slate-700 font-medium">To deliver smart, affordable energy using renewable technology, empowering homes and businesses to thrive.</p>
                </div>
                <div className="p-8 bg-slate-50 rounded-3xl">
                  <h3 className="text-xl font-bold mb-4 text-emerald-600 uppercase tracking-wider text-sm">Values</h3>
                  <p className="text-slate-700 font-medium">Innovation, Sustainability, Reliability, Customer Empowerment, and Community Development.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === 'products' && (
          <section className="pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">Our Energy Solutions</h1>
                <p className="text-slate-600 text-lg">Tailored renewable power for every scale.</p>
              </div>
              <Solutions />
              
              <div className="mt-24 bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-bold mb-6">Industrial Grade Storage</h2>
                    <p className="text-slate-400 text-lg mb-8">
                      Our high-density lithium iron phosphate (LiFePO4) battery systems are designed for the harsh African climate, offering 10+ years of reliable service.
                    </p>
                    <ul className="space-y-4 mb-10">
                      <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" /> 6000+ Cycle Life</li>
                      <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" /> Smart BMS Integration</li>
                      <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" /> Modular & Scalable</li>
                    </ul>
                    <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold">Download Catalog</button>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                    <img src="https://picsum.photos/seed/battery-storage-sa/800/600" alt="Battery Storage System" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
              </div>
            </div>
          </section>
        )}

        {activePage === 'skyvolt' && (
          <section className="pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                <div className="inline-block p-3 bg-emerald-100 text-emerald-700 rounded-2xl mb-6">
                  <Zap size={32} />
                </div>
                <h1 className="text-5xl font-bold mb-4">SkyVolt OS</h1>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">The world's first AI-powered energy management system built specifically for the African grid landscape.</p>
              </div>
              
              <SkyVoltDemo />
              
              <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <img src="https://picsum.photos/seed/energy-dashboard-mobile/800/1200" alt="SkyVolt Mobile App Dashboard" className="w-full max-w-md mx-auto rounded-[3rem] shadow-2xl border-8 border-slate-900" referrerPolicy="no-referrer" />
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-4xl font-bold mb-6">Power in Your Pocket</h2>
                  <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                    The SkyVolt mobile app gives you complete control over your energy system from anywhere in the world. Monitor production, manage loads, and get instant support.
                  </p>
                  <div className="space-y-6 mb-10">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <Download size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold">Real-time Alerts</h4>
                        <p className="text-slate-500 text-sm">Get notified of low battery levels or unusual consumption patterns.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <Calculator size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold">Savings Calculator</h4>
                        <p className="text-slate-500 text-sm">See exactly how much money you're saving compared to grid power.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold">
                      App Store
                    </button>
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold">
                      Google Play
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === 'ai' && (
          <section className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">SkyVolt AI Assistant</h1>
                <p className="text-slate-600 text-lg">Your 24/7 intelligent energy consultant.</p>
              </div>
              <AIChat />
              <div className="mt-12 text-center text-slate-500 text-sm">
                <p>Try asking: "How many solar panels do I need for a 3-bedroom house?" or "What are the benefits of lithium batteries?"</p>
              </div>
            </div>
          </section>
        )}

        {activePage === 'quote' && (
          <section className="pt-32 pb-24 bg-emerald-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">Get a Custom Quote</h1>
                <p className="text-slate-600 text-lg">Let's design the perfect energy system for your needs.</p>
              </div>
              <QuoteForm />
            </div>
          </section>
        )}

        {activePage === 'contact' && (
          <section className="pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h1 className="text-5xl font-bold mb-8">Get in Touch</h1>
                  <p className="text-slate-600 text-lg mb-12">
                    Have questions about our solutions or need technical support? Our team is here to help you transition to clean energy.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Call Us</h4>
                        <p className="text-slate-600">+27 691417309</p>
                        <p className="text-slate-400 text-sm">Mon-Fri, 8am - 6pm</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Email Us</h4>
                        <p className="text-slate-600">skythernenergy@gmail.com</p>
                        <p className="text-slate-400 text-sm">We respond within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Visit Us</h4>
                        <p className="text-slate-600">Cape Town, South Africa</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
                  <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">First Name</label>
                        <input type="text" className="w-full bg-slate-50 border-slate-200 rounded-xl p-4" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Last Name</label>
                        <input type="text" className="w-full bg-slate-50 border-slate-200 rounded-xl p-4" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
                      <input type="email" className="w-full bg-slate-50 border-slate-200 rounded-xl p-4" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Message</label>
                      <textarea rows={4} className="w-full bg-slate-50 border-slate-200 rounded-xl p-4"></textarea>
                    </div>
                    <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-600/20">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === 'subscription' && <SubscriptionPage />}
      </main>

      <Footer setActivePage={setActivePage} />
      
      {/* Floating AI Chat Trigger */}
      {activePage !== 'ai' && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActivePage('ai')}
          className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 group"
        >
          <MessageSquare size={28} />
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with SkyVolt AI
          </span>
        </motion.button>
      )}
    </div>
  );
}
