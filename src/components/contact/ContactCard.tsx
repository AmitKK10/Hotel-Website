import React, { useState } from 'react';
import { SITE_CONFIG } from '@/src/config/site';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  ShieldAlert,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';

interface ContactCardProps {
  type: 'phone' | 'whatsapp' | 'email' | 'address' | 'hours' | 'emergency';
}

export function ContactCard({ type }: ContactCardProps) {
  const [copied, setCopied] = useState(false);

  const getCardDetails = () => {
    switch (type) {
      case 'phone':
        return {
          title: 'Direct Call & Reception',
          subtitle: 'Available 24×7 for immediate assistance',
          value: SITE_CONFIG.contact.phone,
          icon: Phone,
          actionLabel: 'Call Concierge',
          href: `tel:${SITE_CONFIG.contact.rawPhone}`,
          copyValue: SITE_CONFIG.contact.phone,
          color: 'text-[#f0e2b6]',
          bgColor: 'bg-[#c5a059]/10',
          borderColor: 'border-[#c5a059]/30',
        };
      case 'whatsapp':
        return {
          title: 'Instant WhatsApp Concierge',
          subtitle: 'Instant response for bookings & queries',
          value: SITE_CONFIG.contact.whatsapp,
          icon: MessageSquare,
          actionLabel: 'Chat on WhatsApp',
          href: `https://wa.me/${SITE_CONFIG.contact.rawWhatsapp}?text=${encodeURIComponent(
            'Hello Digha Beach Resort team, I would like to inquire about stay details.'
          )}`,
          copyValue: SITE_CONFIG.contact.whatsapp,
          color: 'text-emerald-400',
          bgColor: 'bg-emerald-400/10',
          borderColor: 'border-emerald-400/20',
        };
      case 'email':
        return {
          title: 'Email Reservations',
          subtitle: 'Send us corporate inquiries or feedback',
          value: SITE_CONFIG.contact.email,
          icon: Mail,
          actionLabel: 'Send Email',
          href: `mailto:${SITE_CONFIG.contact.email}`,
          copyValue: SITE_CONFIG.contact.email,
          color: 'text-sky-400',
          bgColor: 'bg-sky-400/10',
          borderColor: 'border-sky-400/20',
        };
      case 'address':
        return {
          title: 'Resort Location',
          subtitle: 'Located conveniently at New Digha',
          value: SITE_CONFIG.contact.address,
          icon: MapPin,
          actionLabel: 'Get Directions',
          href: SITE_CONFIG.contact.googleMapsUrl,
          copyValue: SITE_CONFIG.contact.address,
          color: 'text-rose-400',
          bgColor: 'bg-rose-400/10',
          borderColor: 'border-rose-400/20',
        };
      case 'hours':
        return {
          title: 'Operating Hours',
          subtitle: 'Desk & Concierge Service',
          value: '24 Hours / 7 Days a Week',
          icon: Clock,
          actionLabel: 'View Schedule',
          href: '#business-hours',
          copyValue: '24×7 Reception & Concierge',
          color: 'text-amber-300',
          bgColor: 'bg-amber-300/10',
          borderColor: 'border-amber-300/20',
        };
      case 'emergency':
        return {
          title: '24×7 Emergency Support',
          subtitle: 'On-site medical & coastal security aid',
          value: SITE_CONFIG.contact.phone,
          icon: ShieldAlert,
          actionLabel: 'Emergency Call',
          href: `tel:${SITE_CONFIG.contact.rawPhone}`,
          copyValue: SITE_CONFIG.contact.phone,
          color: 'text-red-400',
          bgColor: 'bg-red-400/10',
          borderColor: 'border-red-400/20',
        };
    }
  };

  const details = getCardDetails();
  const Icon = details.icon;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(details.copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-stone-900/80 border border-white/10 hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-amber-500/15 transition-all" />

      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <div
            className={`p-2.5 rounded-xl ${details.bgColor} ${details.borderColor} border flex items-center justify-center ${details.color} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-5 h-5" />
          </div>

          <button
            onClick={handleCopy}
            title="Copy to clipboard"
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-stone-400 hover:text-stone-100 hover:border-amber-400/30 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-stone-400 tracking-wider">
            {details.subtitle}
          </span>
          <h4 className="text-base font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
            {details.title}
          </h4>
        </div>

        <p className="text-xs sm:text-sm font-mono text-stone-300 break-words pt-1 font-medium">
          {details.value}
        </p>
      </div>

      <a
        href={details.href}
        target={details.href.startsWith('http') ? '_blank' : undefined}
        rel={details.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`text-xs font-mono ${details.color} hover:underline flex items-center gap-1 pt-3 border-t border-white/10 group/link relative z-10 cursor-pointer`}
      >
        <span>{details.actionLabel}</span>
        <ExternalLink className="w-3.5 h-3.5 ml-auto group-hover/link:translate-x-0.5 transition-transform" />
      </a>
    </div>
  );
}
