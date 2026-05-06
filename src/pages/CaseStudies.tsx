import { motion } from 'motion/react';
import { ArrowUpRight, TrendingUp, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const caseStudies = [
  {
    title: "Global Logistics Turnaround",
    client: "EuroParcel Systems",
    impact: "40% Efficiency Increase",
    category: "Operations",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    description: "Re-engineered cross-border supply chain workflows to eliminate redundant auditing steps and reduce transit time by 3 days."
  },
  {
    title: "SaaS Market Expansion",
    client: "CloudDraft AI",
    impact: "3x Revenue Growth",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    description: "Defined a new GTM strategy for the APAC region, shifting focus from enterprise-wide licenses to department-level adoption models."
  },
  {
    title: "Retail Digital Transformation",
    client: "Heritage Fabrics",
    impact: "$2M Yearly Savings",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    description: "Automated inventory management and integrated financial forecasting to reduce overstock by 22% while increasing fulfillment speed."
  }
];

export function CaseStudies() {
  return (
    <div className="pt-20 bg-white">
      <section className="bg-navy-950 py-24 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl lg:text-7xl font-bold mb-8">Measureable <span className="text-indigo-400">Impact</span>.</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              We don't believe in vanity metrics. We focus on the bottom line, delivering transformative results that justify every dollar invested in consulting.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-navy-700 mb-4" />
              <p className="text-3xl font-bold text-navy-950 mb-2">avg. 32%</p>
              <p className="text-slate-600 font-medium">Operational Efficiency Gain</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl">
              <Users className="w-8 h-8 text-navy-700 mb-4" />
              <p className="text-3xl font-bold text-navy-950 mb-2">500+</p>
              <p className="text-slate-600 font-medium">Global Projects Completed</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl">
              <Target className="w-8 h-8 text-navy-700 mb-4" />
              <p className="text-3xl font-bold text-navy-950 mb-2">$450M+</p>
              <p className="text-slate-600 font-medium">Value Created for Clients</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-24">
            {caseStudies.map((study, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col h-full bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-navy-900 uppercase tracking-widest shadow-sm">
                      {study.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-navy-700 font-bold text-sm mb-2">{study.client}</p>
                  <h3 className="text-2xl font-bold text-navy-950 mb-4 group-hover:text-navy-800 transition-colors">{study.title}</h3>
                  <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
                    {study.description}
                  </p>
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Impact</p>
                      <p className="font-bold text-emerald-600">{study.impact}</p>
                    </div>
                    <Link to="/contact" className="w-10 h-10 bg-navy-50 rounded-full flex items-center justify-center text-navy-900 group-hover:bg-navy-900 group-hover:text-white transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-y border-slate-100">
         <div className="container-custom text-center">
            <h2 className="font-serif text-4xl font-bold text-navy-950 mb-8">Want results like these?</h2>
            <Link to="/book" className="btn-primary px-10 py-5 text-xl inline-block shadow-xl shadow-navy-900/10 active:scale-[0.98] transition-transform">
              Book Your Strategic Audit &rarr;
            </Link>
         </div>
      </section>
    </div>
  );
}

