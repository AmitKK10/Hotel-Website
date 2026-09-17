import React from 'react';
import { SITE_CONFIG } from '@/src/config/site';
import { Instagram, Facebook, Youtube, Github, Linkedin, Share2 } from 'lucide-react';

export function SocialLinks() {
  const socialItems = [
    {
      name: 'Instagram',
      url: SITE_CONFIG.social.instagram,
      icon: Instagram,
      color: 'hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/10',
    },
    {
      name: 'Facebook',
      url: SITE_CONFIG.social.facebook,
      icon: Facebook,
      color: 'hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10',
    },
    {
      name: 'YouTube',
      url: SITE_CONFIG.social.youtube,
      icon: Youtube,
      color: 'hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10',
    },
    {
      name: 'GitHub',
      url: SITE_CONFIG.social.github,
      icon: Github,
      color: 'hover:text-purple-400 hover:border-purple-500/40 hover:bg-purple-500/10',
    },
    {
      name: 'LinkedIn',
      url: SITE_CONFIG.social.linkedin,
      icon: Linkedin,
      color: 'hover:text-blue-300 hover:border-blue-400/40 hover:bg-blue-400/10',
    },
  ];

  return (
    <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 tracking-wider">
        <Share2 className="w-3.5 h-3.5" />
        <span>Follow Our Coastal Journey</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {socialItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit Digha Beach Resort on ${item.name}`}
              className={`p-3 rounded-xl bg-stone-950 border border-white/10 text-stone-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.color} cursor-pointer flex items-center justify-center`}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
