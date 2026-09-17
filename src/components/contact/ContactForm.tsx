import React, { useState } from 'react';
import { SITE_CONFIG } from '@/src/config/site';
import { Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export type ContactPurpose =
  | 'Room Booking'
  | 'Restaurant Reservation'
  | 'General Inquiry'
  | 'Corporate Event'
  | 'Wedding'
  | 'Other';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: 'Room Booking' as ContactPurpose,
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    // Format WhatsApp message
    const formattedMsg = `Hello Digha Beach Resort,

I have sent a contact request from the website.

Name: ${formData.name.trim()}
Phone: ${formData.phone.trim()}
Email: ${formData.email.trim() || 'N/A'}
Purpose: ${formData.purpose}
Subject: ${formData.subject.trim() || 'General Inquiry'}

Message:
${formData.message.trim() || 'Please contact me regarding my request.'}

Thank you.`;

    const encodedText = encodeURIComponent(formattedMsg);
    const waUrl = `https://wa.me/${SITE_CONFIG.contact.rawWhatsapp}?text=${encodedText}`;

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      purpose: 'Room Booking',
      subject: '',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <div className="rounded-3xl bg-stone-900/90 border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[70px] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <span className="text-xs font-mono uppercase text-amber-400 tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Instant Inquiry
          </span>
          <h3 className="text-2xl font-serif font-bold text-stone-100">
            Send Us a Direct Message
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Fill in your details below to connect with our concierge directly via WhatsApp.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-6">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-serif font-bold text-stone-100">
              Inquiry Redirected to WhatsApp
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-amber-300 font-semibold">{formData.name}</span>!
              Your inquiry has been opened in WhatsApp. Our reservations desk will respond to you shortly.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-mono font-bold transition-all cursor-pointer shadow-md"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-stone-300 font-medium">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-stone-950/70 border border-white/10 text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-stone-300 font-medium">
                  Phone / Mobile <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-stone-950/70 border border-white/10 text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-stone-300 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-stone-950/70 border border-white/10 text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Purpose dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-stone-300 font-medium">
                  Purpose of Inquiry
                </label>
                <select
                  value={formData.purpose}
                  onChange={(e) =>
                    setFormData({ ...formData, purpose: e.target.value as ContactPurpose })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-white/10 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="Room Booking">Room Booking</option>
                  <option value="Restaurant Reservation">Restaurant Reservation</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-300 font-medium">Subject</label>
              <input
                type="text"
                placeholder="e.g. Weekend stay reservation request"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-stone-950/70 border border-white/10 text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-300 font-medium">
                Your Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about check-in dates, number of guests, or special arrangements required..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-stone-950/70 border border-white/10 text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-stone-950" />
              <span>Send Message via WhatsApp</span>
              <Send className="w-4 h-4 ml-auto" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
