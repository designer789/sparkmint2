'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const navigationItems = [
  { name: 'Home', href: '#' },
  { name: 'Features', href: '#features' },
  { name: 'Why SparkMint', href: '#why-sparkmint' },
  { name: 'Tokenomics', href: '#tokenomics' },
  { name: 'Roadmap', href: '#roadmap' },
  { name: 'FAQ', href: '#faq' },
];

const socialItems = [
  { 
    name: 'Twitter', 
    href: 'https://x.com/SparkMint_', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ) 
  },
  { 
    name: 'Telegram', 
    href: 'https://t.me/SparkMint_Official', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
      </svg>
    ) 
  },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<boolean>(false);
  
  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !navRef.current || !socialRef.current || !copyrightRef.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        if (animatedRef.current) return;
        animatedRef.current = true;
        
        // Animate the large text
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            ease: "power2.out"
          }
        );
        
        // Animate the navigation buttons
        const buttons = navRef.current?.querySelectorAll('a');
        if (buttons) {
          gsap.fromTo(
            buttons,
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.6,
              stagger: 0.1,
              delay: 0.4,
              ease: "power2.out"
            }
          );
        }
        
        // Animate the social buttons
        const socialButtons = socialRef.current?.querySelectorAll('a');
        if (socialButtons) {
          gsap.fromTo(
            socialButtons,
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.6,
              stagger: 0.1,
              delay: 0.8,
              ease: "power2.out"
            }
          );
        }
        
        // Animate the copyright text
        gsap.fromTo(
          copyrightRef.current,
          { opacity: 0 },
          { 
            opacity: 0.7, 
            duration: 0.6,
            delay: 1,
            ease: "power2.out"
          }
        );
      }
    });
    
    return () => {
      trigger.kill();
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-[#18181B] relative overflow-hidden border-t border-gray-800/30">
      {/* Subtle background gradients */}
      
      
      <div className="w-full max-w-full px-4">
        <div className="relative">
          {/* Large SparkMint text */}
          <div 
            ref={textRef}
            className="opacity-0 overflow-visible"
          >
            <h2 className="text-[18vw] font-bold text-center leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-600/40 to-gray-700/10">
              SparkMint
            </h2>
          </div>
          
          {/* Navigation buttons centered over the text */}
          <div 
            ref={navRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 z-10 max-w-[90%] md:max-w-none">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 bg-[#27272F]/70 backdrop-blur-sm rounded-full text-gray-300 text-center text-sm sm:text-base font-medium hover:bg-[#2A2A33]/90 hover:text-white transition-all duration-300 opacity-0 flex items-center justify-center min-w-0 sm:min-w-[110px] md:min-w-[120px] shadow-sm shadow-black/10"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Social buttons below the navigation */}
          <div 
            ref={socialRef}
            className="absolute inset-0 flex items-center justify-center pt-32 sm:pt-36 md:pt-40"
          >
            <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-2 sm:gap-4 z-10">
              {socialItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-[#27272F]/70 backdrop-blur-sm rounded-full text-gray-300 text-center text-sm sm:text-base font-medium hover:bg-spark-yellow/80 hover:text-spark-dark transition-all duration-300 opacity-0 flex items-center justify-center shadow-sm shadow-black/10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Copyright notice */}
          <div 
            ref={copyrightRef}
            className="absolute -bottom-10 sm:-bottom-16 md:-bottom-22 left-0 right-0 text-center text-xs text-gray-500 opacity-0 mt-4 sm:mt-6"
          >
            <p>© {new Date().getFullYear()} SparkMint. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 