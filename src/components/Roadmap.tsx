'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const roadmapData = [
  {
    phase: 'Phase 1: Foundation & Mainnet Launch',
    items: [
      'Launch of the AI App Generator for instant dApp creation',
      'Auto Token Creation system goes live with seamless token deployment',
      'Deployment of the first batch of AI-generated applications',
      'Inaugural dApp Tournament to kickstart community engagement',
      'Public launch of $SPARK token and liquidity provisioning'
    ]
  },
  {
    phase: 'Phase 2: Ecosystem Build-Out',
    items: [
      'Module Marketplace opens with initial AI and team-developed modules',
      'Third-party developer support for submitting marketplace modules',
      'AI Expansion Packs available for request, deployment, and monetization',
      'Governance framework introduced',
      'Integrated analytics dashboard for real-time dApp performance tracking'
    ]
  },
  {
    phase: 'Phase 3: Composability & Token Interoperability',
    items: [
      'Activation of Cross-App Token Utility across SparkMint dApps',
      'Introduction of shared-token logic and multi-dApp token integration',
      'Beta release of mobile-friendly dApp builder interface',
      'Enhanced tournament scoring algorithm and $SPARK-based boosting features',
      'Launch of SDK for community module developers'
    ]
  },
  {
    phase: 'Phase 4: Decentralization & Global Scale',
    items: [
      'Multi-chain deployment support',
      'Full governance decentralization through $SPARK staking rights',
      'Revenue sharing live for module creators and token stakers',
      'Launch of advanced AI interface for custom prompt engineering',
      'Establishment of SparkMint Grants to fund ecosystem-aligned builders'
    ]
  }
];

export default function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const phasesRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<boolean>(false);
  
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !phasesRef.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        if (animatedRef.current) return;
        animatedRef.current = true;
        
        // Animate title section
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            ease: "power2.out"
          }
        );
        
        // Animate phases
        if (phasesRef.current) {
          const phases = phasesRef.current.querySelectorAll('.roadmap-phase');
          gsap.fromTo(
            phases,
            { opacity: 0, scale: 0.95, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.15,
              ease: "back.out(1.2)",
              delay: 0.3
            }
          );
        }
      }
    });
    
    return () => {
      trigger.kill();
    };
  }, []);
  
  return (
    <section ref={sectionRef} id="roadmap" className="py-20 sm:py-24 md:py-30 lg:py-36 bg-gradient-to-b from-[#18181B] to-[#1D1D22]">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-10 sm:mb-14 md:mb-20 opacity-0">
          <div className="inline-block bg-spark-yellow/10 text-spark-yellow px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-5 sm:mb-8">
            Roadmap
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Roadmap</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mx-auto max-w-3xl">
            SparkMint's roadmap is structured into clear development phases, each unlocking new layers of functionality, scalability, and ecosystem participation. This phased approach ensures product stability, community feedback integration, and sustainable platform growth.
          </p>
        </div>
        
        {/* Phases grid */}
        <div ref={phasesRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {roadmapData.map((phase, phaseIndex) => (
              <div 
                key={phaseIndex} 
                className="roadmap-phase opacity-0 relative group mb-5 sm:mb-0"
              >
                {/* Card content */}
                <div className="bg-[#27272F]/80 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col h-full relative z-10 transition-all duration-300">
                  {/* Phase header with gradient accent */}
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-spark-yellow/80 to-spark-yellow/20"></div>
                    <div className="p-4 sm:p-6 border-b border-gray-800/50">
                      <h3 className="text-white font-bold text-lg md:text-xl">
                        {phase.phase.split(':')[0]}
                        <span className="block text-xs sm:text-sm font-medium text-gray-400 mt-1">{phase.phase.split(':')[1]}</span>
                      </h3>
                    </div>
                  </div>
                  
                  {/* Phase content */}
                  <div className="p-4 sm:p-6 pb-8 sm:pb-12 flex-grow flex flex-col">
                    <ul className="space-y-2 flex-grow">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start group/item">
                          <div className="mr-2 sm:mr-3 mt-0.5">
                            <span className="inline-block w-2 h-2 rounded-full bg-spark-yellow/50 group-hover/item:bg-spark-yellow transition-all duration-300"></span>
                          </div>
                          <span className="text-sm sm:text-base text-gray-300 group-hover/item:text-white transition-colors duration-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 