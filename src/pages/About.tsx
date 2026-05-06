import { motion } from 'motion/react';
import { Globe, Lightbulb, Target, Shield } from 'lucide-react';

const coreValues = [
  {
    title: "Analytical Rigor",
    desc: "We don't settle for surface-level observations. We dig deep into the data to find the root cause of every challenge.",
    icon: Target
  },
  {
    title: "Innovative Strategy",
    desc: "Best practices aren't always enough. We develop bespoke strategies tailored to your specific competitive landscape.",
    icon: Lightbulb
  },
  {
    title: "Global Perspective",
    desc: "With partners across three continents, we bring a worldwide view to every local business problem.",
    icon: Globe
  },
  {
    title: "Unwavering Integrity",
    desc: "We tell you what you need to hear, not what you want to hear. Trust is our most valuable asset.",
    icon: Shield
  }
];

const team = [
  {
    name: "Dr. Elena Vance",
    role: "Managing Partner, Strategy",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=400",
    bio: "Former McKinsey lead with 20 years in digital transformation and market entry strategy."
  },
  {
    name: "Marcus Thorne",
    role: "Senior Partner, Operations",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=400",
    bio: "Operations turnaround specialist with a background in lean manufacturing and aerospace."
  },
  {
    name: "Amara Okoro",
    role: "Head of Financial Consulting",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=400",
    bio: "CFA & MBA from Wharton. Expert in capital structure optimization and risk assessment."
  }
];

export function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-slate-50 py-24 border-b border-slate-100">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="font-serif text-5xl lg:text-7xl font-bold text-navy-950 mb-10 leading-tight">
              A Legacy of <span className="text-navy-700 italic">Precision</span> and Purpose.
            </h1>
            <p className="text-2xl text-slate-600 leading-relaxed">
              Founded in 2008, Nexus Consulting Group was built to bridge the gap between high-level theory and on-the-ground operational reality. We believe that true consulting requires getting our hands dirty.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {coreValues.map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-navy-50 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-navy-700" />
                </div>
                <h3 className="text-xl font-bold text-navy-950 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-navy-950 text-white overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-16 items-start mb-20">
             <div className="lg:w-1/2">
                <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">Leadership</h2>
                <p className="font-serif text-4xl lg:text-5xl font-bold leading-tight">Guided by veterans of industry.</p>
             </div>
             <div className="lg:w-1/2">
                <p className="text-xl text-slate-400 leading-relaxed">
                  Our partners aren't just consultants; they are former CEOs, COOs, and founders who have built and scaled multi-million dollar enterprises.
                </p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-3xl mb-6 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-navy-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                     <p className="text-white text-sm italic font-serif">"{member.bio}"</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                <p className="text-indigo-400 font-medium tracking-wide uppercase text-xs">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container-custom">
          <div className="bg-slate-50 rounded-[3rem] p-10 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy-950 mb-8 leading-tight">Our Global Reach</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Operating from hubs in New York, London, and Singapore, we provide seamless consulting services for multinational corporations navigating complex global markets.
              </p>
              <div className="flex gap-12">
                <div>
                  <p className="text-3xl font-bold text-navy-900">40+</p>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">Countries Served</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-navy-900">12k+</p>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">Hours of Analysis</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="aspect-video bg-navy-900 rounded-3xl overflow-hidden relative shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800" alt="World Map" className="w-full h-full object-cover opacity-40 mix-blend-multiply" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white font-serif italic text-2xl text-center px-10">Connecting local expertise with global vision.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

