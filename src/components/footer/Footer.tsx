import React, { useState } from 'react';
import { SITE_CONFIG } from '@/src/config/site';
import { Container } from '@/src/components/ui/Container';
import { useSmoothScroll } from '@/src/providers/SmoothScrollProvider';
import { useDataImport } from '@/src/context/DataImportContext';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Heart,
  Instagram,
  Facebook,
  Youtube,
  Github,
  Linkedin,
  CheckCircle2,
  Compass,
  FileSpreadsheet,
  Calendar,
} from 'lucide-react';

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const { openImportModal, openRecordsDrawer, records } = useDataImport();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId =
        href === '#attractions' ? 'nearby' : href === '#restaurant' ? 'dining' : href.replace('#', '');
      const el = document.getElementById(targetId) || document.querySelector(href);
      if (el) {
        scrollTo(el, { offset: -80 });
      } else {
        scrollTo(href);
      }
    }
  };

  return (
    <footer className="bg-[#01060d] text-stone-300 border-t border-white/10 relative overflow-hidden pt-16 sm:pt-20 pb-12">
      {/* Background Subtle Accent Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Top Newsletter & Brand Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#030e1a]/80 border border-[#c5a059]/25 p-6 sm:p-10 rounded-3xl shadow-2xl">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-xs font-mono uppercase text-[#f0e2b6] tracking-widest flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#c5a059]" /> Exclusive Privileges
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-100">
              Subscribe to Coastal Privileges
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-light max-w-lg">
              Receive secret promotional codes, seasonal seafood festival invites, and priority booking options directly in your inbox.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! You have been subscribed to luxury offers.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-950/80 border border-white/10 text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-[#c5a059] transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl bg-[#c5a059] hover:bg-[#dfb76c] text-stone-950 font-mono font-bold text-xs shrink-0 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Link Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pt-4">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-100 tracking-wide">
                {SITE_CONFIG.name}
              </h2>
              <p className="text-xs font-mono text-amber-400 mt-0.5">
                {SITE_CONFIG.tagline}
              </p>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {SITE_CONFIG.description}
            </p>

            <address className="not-italic space-y-2 text-xs font-mono text-stone-300 pt-2">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contact.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${SITE_CONFIG.contact.rawPhone}`} className="hover:text-amber-300">
                  {SITE_CONFIG.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-amber-300">
                  {SITE_CONFIG.contact.email}
                </a>
              </p>
            </address>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-stone-100 uppercase tracking-wider border-b border-white/10 pb-2">
              Quick Links
            </h4>
            <nav aria-label="Footer Navigation">
              <ul className="space-y-2 text-xs font-mono">
                {SITE_CONFIG.quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-amber-400/40">•</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => openImportModal('2026-05-05')}
                    className="text-[#f0e2b6] hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left font-semibold"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Import Data by Date</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openRecordsDrawer()}
                    className="text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <Calendar className="w-3.5 h-3.5 text-stone-500" />
                    <span>View Folio Records ({records.length})</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 3: Accommodations */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-stone-100 uppercase tracking-wider border-b border-white/10 pb-2">
              Accommodations
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {SITE_CONFIG.roomCategories.map((room) => (
                <li key={room.label}>
                  <a
                    href={room.href}
                    onClick={(e) => handleNavClick(e, room.href)}
                    className="text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-amber-400/40">•</span>
                    <span>{room.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Policies & Social Media */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-stone-100 uppercase tracking-wider border-b border-white/10 pb-2">
              Policies & Connect
            </h4>
            <ul className="space-y-2 text-xs font-mono mb-4">
              {SITE_CONFIG.policies.map((policy) => (
                <li key={policy.label}>
                  <a href={policy.href} className="text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    <span className="text-amber-400/40">•</span>
                    <span>{policy.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-stone-400 block">
                Social Channels
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-lg bg-stone-900 border border-white/10 text-stone-400 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-lg bg-stone-900 border border-white/10 text-stone-400 hover:text-blue-400 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="p-2 rounded-lg bg-stone-900 border border-white/10 text-stone-400 hover:text-red-400 transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a
                  href={SITE_CONFIG.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-lg bg-stone-900 border border-white/10 text-stone-400 hover:text-purple-400 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a
                  href={SITE_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-lg bg-stone-900 border border-white/10 text-stone-400 hover:text-blue-300 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Credit */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400">
          <p>© {new Date().getFullYear()} Digha Beach Resort. All rights reserved.</p>

          <p className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>in India</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
