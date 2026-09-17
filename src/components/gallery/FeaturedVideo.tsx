import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Play, Pause, Volume2, VolumeX, Sparkles, Film, Compass, ShieldCheck } from 'lucide-react';

export function FeaturedVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full rounded-3xl overflow-hidden border border-amber-500/30 bg-[#030e1a]/90 shadow-2xl group"
    >
      {/* Video / Poster Background */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-stone-950 overflow-hidden">
        {/* Placeholder video stream or high-res motion cover */}
        <video
          ref={videoRef}
          loop
          muted={isMuted}
          playsInline
          poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85"
          className="w-full h-full object-cover transition-transform duration-700"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-ocean-waves-looping-seamlessly-41857-large.mp4"
            type="video/mp4"
          />
          Your browser does not support HTML5 video.
        </video>

        {/* Ambient Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020a14] via-stone-950/40 to-black/30" />

        {/* Center Play Button Overlay */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center group/btn cursor-pointer z-20 outline-none"
          aria-label={isPlaying ? 'Pause video' : 'Play cinematic video'}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shadow-2xl shadow-amber-500/50 group-hover/btn:scale-110 transition-transform duration-300 border-4 border-amber-300">
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </div>
        </button>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          <Badge variant="gold" className="text-xs uppercase font-mono py-1 px-3 shadow-lg">
            <Film className="w-3.5 h-3.5 mr-1.5" /> Cinematic Tour
          </Badge>

          {/* Sound Mute/Unmute Toggle */}
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-full bg-stone-950/80 hover:bg-amber-500 text-stone-200 hover:text-stone-950 border border-white/10 transition-colors cursor-pointer pointer-events-auto backdrop-blur-md"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Bottom Title & Specs */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2 pointer-events-none">
          <div>
            <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">
              Digha Beach Resort • 4K HDR Tour
            </span>
            <h4 className="text-lg sm:text-2xl font-serif font-semibold text-stone-100">
              A Visual Walkthrough Of Paradise
            </h4>
          </div>

          <span className="text-xs font-mono text-stone-300 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
            Duration: 01:45 • 4K
          </span>
        </div>
      </div>
    </motion.div>
  );
}
