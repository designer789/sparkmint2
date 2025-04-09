'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhySparkMintWins() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const splitTextRef = useRef<SplitType | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !badgeRef.current || !textRef.current) return;

    // Split text into spans
    splitTextRef.current = new SplitType(textRef.current, {
      types: 'words,chars',
      tagName: 'span'
    });

    // Create a timeline for the animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate the badge with a fade-in effect
    tl.fromTo(
      badgeRef.current,
      { 
        y: 30,
        opacity: 0
      },
      { 
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }
    );

    // Animate each character with a staggered opacity effect
    tl.fromTo(
      splitTextRef.current.chars,
      { 
        y: 20,
        opacity: 0
      },
      { 
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.015, // Stagger each character by 0.015 seconds
        ease: 'power2.out'
      },
      '-=0.3' // Start slightly before the previous animation ends
    );

    // Avoid flash of unstyled content
    gsap.set(textRef.current, { opacity: 1 });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="why-sparkmint" className="py-24 sm:py-32 md:py-40 lg:py-48 bg-[#18181B] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={badgeRef}
            className="inline-block bg-spark-yellow/10 text-spark-yellow px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-5 sm:mb-6 md:mb-8"
          >
            Why SparkMint Wins
          </div>
          <h2 
            ref={textRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white md:leading-snug"
          >
            SparkMint makes building dApps instant, permissionless, and profitable. No devs needed – just your idea. From auto-tokenized apps to monetizable modules and AI-powered upgrades, it's the fastest way to launch, grow, and earn on-chain.
          </h2>
        </div>
      </div>
    </section>
  );
} 
