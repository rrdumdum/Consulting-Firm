import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { 
    name: 'Services', 
    path: '/services',
    subLinks: [
      { name: 'Strategy', path: '/services/strategy' },
      { name: 'Operations', path: '/services/operations' },
      { name: 'Marketing', path: '/services/marketing' },
      { name: 'Finance', path: '/services/finance' },
    ]
  },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Blog', path: '/blog' },
  { name: 'FAQ', path: '/faq' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-navy-900 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className={cn(
            "font-serif text-2xl font-bold tracking-tight",
            scrolled ? "text-navy-950" : "text-navy-900"
          )}>
            Nexus
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div 
              key={link.path} 
              className="relative group"
              onMouseEnter={() => link.subLinks && setActiveSubMenu(link.name)}
              onMouseLeave={() => setActiveSubMenu(null)}
            >
              <Link 
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-navy-700 flex items-center gap-1",
                  location.pathname === link.path ? "text-navy-900" : "text-slate-600"
                )}
              >
                {link.name}
                {link.subLinks && <ChevronDown className="w-4 h-4" />}
              </Link>

              {link.subLinks && (
                <AnimatePresence>
                  {activeSubMenu === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-lg py-2"
                    >
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-navy-900"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <Link to="/book" className="btn-primary py-2 text-sm">
            Book Consultation
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-navy-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.path} className="flex flex-col gap-2">
                  <Link 
                    to={link.path}
                    className="text-lg font-medium text-slate-900"
                  >
                    {link.name}
                  </Link>
                  {link.subLinks && (
                    <div className="pl-4 flex flex-col gap-2 border-l border-slate-200">
                      {link.subLinks.map((sub) => (
                        <Link 
                          key={sub.path} 
                          to={sub.path}
                          className="text-slate-600"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/book" className="btn-primary text-center mt-4">
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
