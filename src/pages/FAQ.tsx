import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const faqCategories = [
  {
    name: "General",
    questions: [
      {
        q: "How does Nexus Consulting differ from other firms?",
        a: "Unlike firms that focus solely on high-level strategy, we are implementation partners. We don't just deliver a report; we stay with you to ensure the operational changes are executed correctly and deliver the promised results."
      },
      {
        q: "What industries do you specialize in?",
        a: "While our methodologies are industry-agnostic, we have deep expertise in Technology, Manufacturing, Healthcare, and Professional Services. Our core strength lies in solving complex operational and strategic puzzles regardless of the sector."
      }
    ]
  },
  {
    name: "Engagement",
    questions: [
      {
        q: "What is the typical length of an engagement?",
        a: "Engagement length varies based on complexity. A strategic audit typically takes 4-6 weeks, while a full operational turnaround or growth implementation can last 6-12 months."
      },
      {
        q: "How do you charge for your services?",
        a: "We offer both project-based fixed fees and performance-linked models. We believe in transparency and value-based pricing, ensuring our incentives are perfectly aligned with your success."
      }
    ]
  },
  {
    name: "Operations",
    questions: [
      {
        q: "Will we have a dedicated account manager?",
        a: "Yes. Every client is assigned a Project Partner who serves as your primary point of contact and is accountable for the delivery of all strategic objectives."
      }
    ]
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>("General-0");

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="pt-32 pb-20 container-custom min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-50 rounded-2xl mb-6">
            <HelpCircle className="w-8 h-8 text-navy-700" />
          </div>
          <h1 className="font-serif text-5xl font-bold text-navy-950 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-slate-600">Find answers to common questions about our methodology, pricing, and process.</p>
        </div>

        <div className="space-y-12">
          {faqCategories.map((category) => (
            <div key={category.name}>
              <h2 className="text-lg font-bold text-navy-900 uppercase tracking-widest mb-6 px-4">{category.name}</h2>
              <div className="space-y-4">
                {category.questions.map((item, idx) => {
                  const id = `${category.name}-${idx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div 
                      key={id} 
                      className={cn(
                        "border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 bg-white",
                        isOpen ? "shadow-lg border-navy-100" : "hover:border-slate-200"
                      )}
                    >
                      <button 
                        onClick={() => toggle(id)}
                        className="w-full px-8 py-6 flex items-center justify-between text-left group"
                      >
                        <span className={cn(
                          "font-bold text-lg transition-colors",
                          isOpen ? "text-navy-950" : "text-slate-700 group-hover:text-navy-900"
                        )}>
                          {item.q}
                        </span>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-navy-700" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-8 pb-8 text-slate-600 leading-relaxed pt-2 border-t border-slate-50 italic">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-slate-50 rounded-[2.5rem] text-center border border-slate-100">
          <h3 className="text-2xl font-bold text-navy-950 mb-4">Still have questions?</h3>
          <p className="text-slate-600 mb-8">Can't find the answer you're looking for? Reach out to our support team.</p>
          <div className="flex justify-center gap-4">
             <a href="/contact" className="btn-primary">Contact Support</a>
             <a href="/book" className="btn-secondary">Book a Call</a>
          </div>
        </div>
      </div>
    </div>
  );
}

