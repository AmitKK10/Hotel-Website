import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { DESIGN_TOKENS } from '@/src/constants/design-tokens';

interface BaseMotionProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * FadeIn Motion Wrapper
 */
export function FadeIn({
  children,
  delay = 0,
  duration = DESIGN_TOKENS.animation.duration.normal,
  className = '',
  ...props
}: BaseMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: DESIGN_TOKENS.animation.ease.luxury,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * RevealUp Motion Wrapper with upward slide and fade
 */
export function RevealUp({
  children,
  delay = 0,
  duration = DESIGN_TOKENS.animation.duration.slow,
  className = '',
  ...props
}: BaseMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: DESIGN_TOKENS.animation.ease.luxury,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleIn Motion Wrapper
 */
export function ScaleIn({
  children,
  delay = 0,
  duration = DESIGN_TOKENS.animation.duration.normal,
  className = '',
  ...props
}: BaseMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration,
        delay,
        ease: DESIGN_TOKENS.animation.ease.luxury,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Container
 */
export function StaggerContainer({
  children,
  staggerChildren = 0.1,
  delayChildren = 0,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Item
 */
export function StaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: DESIGN_TOKENS.animation.ease.luxury,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Magnetic Hover Container
 */
export function MagneticHover({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: DESIGN_TOKENS.animation.ease.luxury }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
