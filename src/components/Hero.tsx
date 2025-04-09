'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BackgroundBeams } from '@/components/ui/background-beams';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<boolean>(false);
  
  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !descriptionRef.current || !buttonsRef.current || !scrollIndicatorRef.current) return;
    
    // Adjust the hero height to account for header
    const adjustHeight = () => {
      if (sectionRef.current) {
        const windowHeight = window.innerHeight;
        // Get the actual header height dynamically
        const header = document.querySelector('header');
        const headerHeight = header ? header.getBoundingClientRect().height : 72; // Use 72px as fallback
        
        // Apply the calculated height
        sectionRef.current.style.height = `${windowHeight - headerHeight}px`;
      }
    };
    
    // Call once and add resize listener
    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    
    // Run again after a slight delay to ensure all elements are properly loaded
    const timeoutId = setTimeout(adjustHeight, 200);
    
    // Only run the animation once
    if (animatedRef.current) return;
    animatedRef.current = true;
    
    // Create a timeline for sequential animations
    const tl = gsap.timeline();
    
    // Animate the heading
    tl.fromTo(
      headingRef.current.querySelectorAll('span'),
      { 
        opacity: 0, 
        y: 50 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }
    );
    
    // Animate the description
    tl.fromTo(
      descriptionRef.current,
      { 
        opacity: 0, 
        y: 30 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.3" // Start slightly before the heading animation finishes
    );
    
    // Animate the buttons
    tl.fromTo(
      buttonsRef.current.querySelectorAll('a'),
      { 
        opacity: 0, 
        y: 20 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      },
      "-=0.4" // Start slightly before the description animation finishes
    );
    
    // Animate the scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { 
        opacity: 0
      },
      { 
        opacity: 1, 
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.2" // Start slightly before the buttons animation finishes
    );
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('resize', adjustHeight);
      clearTimeout(timeoutId);
    };
    
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className="relative flex items-center justify-center overflow-hidden bg-[#18181B] pt-4 md:pt-0"
      id="home"
      style={{ minHeight: '100vh' }} /* Fallback before JS runs */
    >
      <div className="container mx-auto px-4 relative z-10 py-16 md:py-0">
        <div className="max-w-6xl mx-auto text-center space-y-8 md:space-y-12">
          {/* Main heading with solid colors */}
          <h1 ref={headingRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
            <span className="text-white inline-block">
              Unleash Ideas.
            </span>
            <br />
            <span className="text-gray-300 inline-block">
              Spark the Chain.
            </span>
          </h1>
          
          {/* Description with modern typography */}
          <p ref={descriptionRef} className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed font-light tracking-wide opacity-0 px-2">
            SparkMint lets you create and launch full dApps from a simple idea – AI handles the code, 
            deployment, and token. Build fast, expand with modules, and grow through community-driven competitions.
          </p>
          
          {/* CTA buttons with modern styling */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-8 md:pt-12">
            <a 
              
              className="group w-full sm:w-auto bg-spark-yellow text-spark-dark px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-spark-yellow/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-spark-yellow/20 opacity-0 inline-flex items-center justify-center"
            >
              Get Started
              <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a 
              href="https://docs.sparkmint.vip/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group w-full sm:w-auto border border-neutral-700 text-neutral-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-neutral-800/50 transition-all duration-300 backdrop-blur-sm opacity-0 inline-flex items-center justify-center"
            >
              Learn More
              <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-0 z-10">
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-neutral-700 rounded-full flex items-start p-1">
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-neutral-500 rounded-full animate-scroll" />
        </div>
      </div>
      
      {/* Background Beams Effect */}
      <BackgroundBeams />
    </section>
  )
} 
