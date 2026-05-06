import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <span className="text-navy-950 font-bold text-xl">N</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">Nexus</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering businesses through innovative strategy, operational excellence, and data-driven insights. Your partner in sustainable growth.
            </p>
            <div className="flex gap-4">
              <Link to="#" className="p-2 bg-navy-900 rounded-full hover:bg-navy-800 transition-colors">
                <Linkedin className="w-5 h-5 text-indigo-300" />
              </Link>
              <Link to="#" className="p-2 bg-navy-900 rounded-full hover:bg-navy-800 transition-colors">
                <Twitter className="w-5 h-5 text-sky-400" />
              </Link>
              <Link to="#" className="p-2 bg-navy-900 rounded-full hover:bg-navy-800 transition-colors">
                <Facebook className="w-5 h-5 text-blue-500" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-4 text-slate-400 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Insights & News</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Our Services</h3>
            <ul className="flex flex-col gap-4 text-slate-400 text-sm">
              <li><Link to="/services/strategy" className="hover:text-white transition-colors">Business Strategy</Link></li>
              <li><Link to="/services/operations" className="hover:text-white transition-colors">Operations Management</Link></li>
              <li><Link to="/services/marketing" className="hover:text-white transition-colors">Market Analysis</Link></li>
              <li><Link to="/services/finance" className="hover:text-white transition-colors">Financial Consulting</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Get in Touch</h3>
            <ul className="flex flex-col gap-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-navy-700 shrink-0" />
                <span>123 Business Way, Suite 500<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-navy-700 shrink-0" />
                <span>+1 (555) NEXUS-01</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-navy-700 shrink-0" />
                <span>contact@nexusconsulting.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-navy-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} Nexus Consulting Group. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
