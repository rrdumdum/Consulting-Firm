import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Users, Zap, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  {
    title: "Strategic Growth",
    description: "Multi-year roadmaps focused on market expansion and sustainable revenue generation.",
    icon: BarChart3,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Change Management",
    description: "Guidance through organizational transitions, mergers, and internal restructuring.",
    icon: Users,
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    title: "Operational Velocity",
    description: "Lean methodology application to streamline workflows and eliminate bottlenecks.",
    icon: Zap,
    color: "bg-amber-50 text-amber-600"
  },
  {
    title: "Risk Mitigation",
    description: "Comprehensive audits and resilience planning to protect your corporate assets.",
    icon: ShieldCheck,
    color: "bg-emerald-50 text-emerald-600"
  }
];

const testimonials = [
  {
    quote: "Nexus Consulting redefined our operational model. Within six months, we saw a 40% increase in productivity across our regional offices.",
    author: "Sarah Jenkins",
    role: "COO at Global Logistics Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "Their strategic insight is unparalleled. They didn't just give us a report; they worked alongside us to implement the change.",
    author: "Michael Chen",
    role: "CEO at TechVentures Unit",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 lg:py-32 overflow-hidden relative">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl lg:text-7xl font-bold text-navy-950 leading-tight mb-8"
            >
              Driving Growth through <span className="text-navy-700 italic">Strategic</span> Excellence
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl"
            >
              We provide data-driven management consulting services to help businesses navigate complexity, optimize operations, and achieve sustainable competitive advantage.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/book" className="btn-primary text-lg px-8">Book Consultation</Link>
              <Link to="/services" className="btn-secondary text-lg px-8">Our Services</Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-navy-900 opacity-[0.03] -skew-x-12 translate-x-1/4 hidden lg:block"></div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-navy-700 uppercase tracking-widest mb-4">What We Do</h2>
            <p className="font-serif text-3xl lg:text-4xl font-bold text-navy-950 mb-6">Expert guidance for every stage of your business journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${service.color}`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-navy-950 mb-4">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link to="/services" className="text-navy-900 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-navy-950 text-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">Testimonials</h2>
              <p className="font-serif text-4xl lg:text-5xl font-bold mb-8">Trusted by industry leaders worldwide.</p>
              <div className="flex flex-col gap-12">
                {testimonials.map((t, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-6"
                  >
                    <Quote className="w-10 h-10 text-navy-700" />
                    <p className="text-xl text-slate-300 italic leading-relaxed">"{t.quote}"</p>
                    <div className="flex items-center gap-4">
                      <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover border-2 border-navy-800" />
                      <div>
                        <p className="font-bold">{t.author}</p>
                        <p className="text-sm text-slate-500">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="aspect-square bg-navy-900 rounded-3xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071823991-b1ae5e6a3048?auto=format&fit=crop&q=80&w=1000" 
                  alt="Consultation" 
                  className="w-full h-full object-cover opacity-60 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent"></div>
                <div className="absolute bottom-10 left-10 p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                  <p className="text-3xl font-bold mb-2">98%</p>
                  <p className="text-sm text-slate-300 font-medium tracking-wide font-sans">CLient Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Preview */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-navy-700 uppercase tracking-widest mb-4">Case Studies</h2>
              <p className="font-serif text-4xl font-bold text-navy-950">Proven results for complex organizations.</p>
            </div>
            <Link to="/case-studies" className="text-navy-900 font-bold flex items-center gap-2 hover:gap-3 transition-all border-b-2 border-navy-900 pb-1">
              View all insights <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
                alt="Case Study 1" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-4 inline-block">Strategy</span>
                <h3 className="text-3xl font-bold text-white mb-4">Scaling a Fintech Disruptor to $100M ARR</h3>
                <p className="text-slate-300 mb-6 line-clamp-2">How we redesigned the unit economics and user acquisition strategy for a leading European startup.</p>
                <Link to="/case-studies" className="text-white font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read Case Study <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000" 
                alt="Case Study 2" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-4 inline-block">Operations</span>
                <h3 className="text-3xl font-bold text-white mb-4">Lean Transformation for Manufacturing Giant</h3>
                <p className="text-slate-300 mb-6 line-clamp-2">Reducing operational overhead by $2.5M annually through automated supply chain auditing.</p>
                <Link to="/case-studies" className="text-white font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read Case Study <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="bg-navy-900 rounded-[2.5rem] p-10 lg:p-20 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl">
              <h2 className="font-serif text-4xl lg:text-6xl font-bold text-white mb-8">Ready to transform your business?</h2>
              <p className="text-xl text-indigo-100 mb-10 opacity-80">
                Join 500+ companies that have scaled their operations and strategy with Nexus. Let's build your future together.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/book" className="bg-white text-navy-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors">
                  Book Free Consultation
                </Link>
                <Link to="/contact" className="border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
            {/* Background elements */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="absolute right-0 top-0 w-full h-full pointer-events-none opacity-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[40px] border-white/5 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

