import { Routes, Route, Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Target, PieChart, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';

const servicesData = {
  strategy: {
    title: 'Business Strategy',
    icon: Target,
    description: 'We help you define your long-term vision and the concrete steps needed to achieve market dominance.',
    problem: 'Many businesses struggle with short-term reactive decision-making, lacking a coherent framework for sustainable growth and competitive differentiation.',
    solution: 'Our strategy consulting provides a rigorous, data-driven approach to competitive analysis, market positioning, and capital allocation.',
    process: [
      'Market & Competitive Audit',
      'Vision & KPI Alignment',
      'Strategic Roadmap Design',
      'Implementation Support'
    ],
    results: [
      'Clear competitive advantage',
      'Optimized resource allocation',
      'Increased market share'
    ]
  },
  operations: {
    title: 'Operations Management',
    icon: PieChart,
    description: 'Streamline your workflows and eliminate waste to maximize your bottom line.',
    problem: 'Inefficient processes, organizational silos, and lack of operational transparency often lead to rising costs and stagnating growth.',
    solution: 'We apply lean methodologies and organizational design principles to optimize your value chain and improve delivery speed.',
    process: [
      'Value Stream Mapping',
      'Process Optimization',
      'Organizational Restructuring',
      'Performance Management Systems'
    ],
    results: [
      '25-40% reduction in operational waste',
      'Improved cross-departmental collaboration',
      'Highly scalable delivery models'
    ]
  },
  marketing: {
    title: 'Market Analysis',
    icon: TrendingUp,
    description: 'Deep-dive insights into consumer behavior and competitive landscapes.',
    problem: 'Entering new markets or launching products without deep consumer insights leads to high failure rates and wasted marketing spend.',
    solution: 'Our market analysis leverages advanced data analytics and ethnographic research to uncover hidden opportunities and customer pain points.',
    process: [
      'Consumer Segmentation',
      'Trend Forecasting',
      'Pricing Sensitivity Analysis',
      'Market Entry Strategy'
    ],
    results: [
      'Data-backed market entry',
      'Higher customer acquisition ROI',
      'Precise product-market fit'
    ]
  },
  finance: {
    title: 'Financial Consulting',
    icon: ShieldCheck,
    description: 'Strategic capital allocation and financial health optimization.',
    problem: 'Suboptimal capital structures and lack of sophisticated financial modeling can hinder even the most promising business ideas.',
    solution: 'We provide high-level financial strategy, from capital raising preparation to comprehensive cost modeling and cash flow optimization.',
    process: [
      'Financial Health Audit',
      'Scenario Modeling & Stress Testing',
      'Capital Structure Optimization',
      'Budgetary Control Systems'
    ],
    results: [
      'Strengthened balance sheet',
      'Improved investor confidence',
      'Resilient cash flow management'
    ]
  }
};

export function Services() {
  return (
    <div className="pt-20 min-h-screen">
      <Routes>
        <Route index element={<ServicesOverview />} />
        <Route path=":serviceId" element={<ServiceDetail />} />
      </Routes>
    </div>
  );
}

function ServicesOverview() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-custom">
        <div className="max-w-3xl mb-16">
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-navy-950 mb-8">Our Services</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            We provide specialized consulting across four core pillars of business excellence. Each engagement is tailored to your unique challenges and market context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(servicesData).map(([id, service]) => (
            <motion.div 
              key={id}
              whileHover={{ y: -5 }}
              className="p-10 border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all group bg-white"
            >
              <service.icon className="w-12 h-12 text-navy-700 mb-8" />
              <h2 className="text-3xl font-bold text-navy-950 mb-4">{service.title}</h2>
              <p className="text-slate-600 mb-10 leading-relaxed">{service.description}</p>
              <Link 
                to={`/services/${id}`} 
                className="inline-flex items-center gap-2 text-navy-700 font-bold hover:gap-3 transition-all"
              >
                Learn more and view results <TrendingUp className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceDetail() {
  const { serviceId } = useParams();
  const service = servicesData[serviceId as keyof typeof servicesData];

  if (!service) return <div className="container-custom py-40">Service not found.</div>;

  return (
    <div className="py-20 animate-in fade-in duration-700">
      <div className="bg-slate-50 py-20 mb-20">
        <div className="container-custom">
          <Link to="/services" className="text-navy-700 font-bold mb-8 inline-block">&larr; Back to Services</Link>
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-2/3">
              <h1 className="font-serif text-5xl lg:text-7xl font-bold text-navy-950 mb-8">{service.title}</h1>
              <p className="text-2xl text-slate-600 leading-relaxed">{service.description}</p>
            </div>
            <div className="lg:w-1/3 w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-navy-950 mb-4">Interested in this service?</h3>
              <p className="text-slate-600 mb-6 text-sm">Schedule a primary audit to see how we can apply this to your business.</p>
              <Link to="/book" className="btn-primary w-full block text-center">Book Audit</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-navy-950 mb-6">The Challenge</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">{service.problem}</p>
            
            <h2 className="text-3xl font-bold text-navy-950 mb-6">Our Approach</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{service.solution}</p>
          </div>
          <div className="bg-navy-950 text-white p-10 lg:p-14 rounded-3xl">
            <h3 className="text-2xl font-bold mb-8">Our Engagement Process</h3>
            <ul className="space-y-6">
              {service.process.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center shrink-0 font-bold text-sm">
                    0{i + 1}
                  </div>
                  <span className="text-lg text-slate-300">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-emerald-50 p-10 lg:p-20 rounded-3xl border border-emerald-100">
          <h2 className="text-3xl font-bold text-navy-950 mb-10">Typical Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.results.map((result, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span className="font-bold text-navy-900 leading-tight">{result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

