'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const allocationData = [
  { name: 'Liquidity & Public', percentage: 65, color: 'bg-spark-yellow' },
  { name: 'Ecosystem & Incentives', percentage: 15, color: 'bg-spark-yellow/80' },
  { name: 'Team & Advisors', percentage: 5, color: 'bg-spark-yellow/60' },
  { name: 'Community & Marketing', percentage: 10, color: 'bg-spark-yellow/40' },
  { name: 'Staking & Yield Rewards', percentage: 5, color: 'bg-spark-yellow/20' },
];

const utilityData = [
  { 
    title: 'dApp Deployment', 
    description: 'Use $SPARK to generate and launch AI-built dApps instantly on-chain.'
  },
  { 
    title: 'Module & Expansion Access', 
    description: 'Unlock premium modules and AI-generated feature packs through token payments.'
  },
  { 
    title: 'Tournaments & Boosting', 
    description: 'Spend $SPARK to boost your app\'s visibility in community tournaments and earn more exposure.'
  },
  { 
    title: 'Staking & Revenue Sharing', 
    description: 'Stake $SPARK to earn a portion of marketplace fees and platform-generated revenues.'
  },
  { 
    title: 'Governance Rights', 
    description: 'Vote on ecosystem decisions including feature upgrades, tournament rules, reward structures, and protocol changes.'
  },
  { 
    title: 'Fee Payments', 
    description: 'Cover service fees for AI generation, deployment gas subsidies, and marketplace interactions.'
  },
  { 
    title: 'Creator Incentives', 
    description: 'Earn $SPARK as a module builder, AI expansion creator, or top tournament winner.'
  },
];

export default function Tokenomics() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const utilityRef = useRef<HTMLDivElement>(null);
  const barSegmentsRef = useRef<HTMLDivElement[]>([]);
  const animatedRef = useRef<boolean>(false);
  
  const setBarSegmentRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      barSegmentsRef.current[index] = el;
    }
  };
  
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !chartRef.current || !utilityRef.current) return;
    
    // Create a common ScrollTrigger for all animations
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      // Only trigger the animations once
      once: true,
      onEnter: () => {
        if (animatedRef.current) return;
        animatedRef.current = true;

        // Animate section title
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
        
        // Animate bar segments
        barSegmentsRef.current.forEach((segment, index) => {
          if (!segment) return;
          
          const percentageText = segment.querySelector('.percentage-text');
          
          // Animate the bar segment width
          gsap.fromTo(
            segment,
            { width: 0 },
            { 
              width: `${allocationData[index].percentage}%`,
              duration: 1.5,
              ease: "power2.out",
              delay: 0.3 // Start after title animation
            }
          );
          
          // Animate the percentage text
          if (percentageText) {
            gsap.fromTo(
              percentageText,
              { innerText: "0" },
              { 
                innerText: allocationData[index].percentage,
                duration: 1.5,
                ease: "power2.out",
                snap: { innerText: 1 },
                delay: 0.3
              }
            );
          }
        });
        
        // Ensure utilityRef exists before trying to access it
        if (utilityRef.current) {
          // Animate utility items
          const items = utilityRef.current.querySelectorAll('.utility-item');
          gsap.fromTo(
            items,
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              delay: 0.8 // Start after bar animation
            }
          );
        }
      }
    });
    
    return () => {
      // Clean up the trigger on component unmount
      trigger.kill();
    };
  }, []);
  
  return (
    <section ref={sectionRef} id="tokenomics" className="py-36 bg-[#1D1D22]">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <div className="inline-block bg-spark-yellow/10 text-spark-yellow px-6 py-2 rounded-full text-sm font-medium mb-8">
            Tokenomics
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">$SPARK Token</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Total Supply: 1,000,000,000 $SPARK
          </p>
        </div>
        
        {/* Token Allocation Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Token Allocation</h3>
          
          {/* Percentage Bar */}
          <div ref={chartRef} className="mb-8">
            <div className="h-16 bg-gray-800 rounded-lg overflow-hidden flex">
              {allocationData.map((item, index) => (
                <div 
                  key={index}
                  ref={(el) => setBarSegmentRef(el, index)}
                  className={`h-full ${item.percentage === 65 ? "bg-[#FFD700]" : 
                              item.percentage === 15 ? "bg-[#D4AF37]" : 
                              item.percentage === 10 ? "bg-[#AA9834]" : 
                              item.percentage === 5 ? "bg-[#8A7B30]" : "bg-[#6A5E2C]"} 
                              flex items-center justify-center`}
                  style={{ width: '0%' }}
                >
                  {item.percentage >= 10 && (
                    <div className="text-spark-dark font-bold">
                      <span className="percentage-text">0</span>%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allocationData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-5 h-5 rounded mr-3" 
                  style={{ 
                    backgroundColor: item.percentage === 65 ? "#FFD700" : 
                                  item.percentage === 15 ? "#D4AF37" : 
                                  item.percentage === 10 ? "#AA9834" : 
                                  item.percentage === 5 ? "#8A7B30" : "#6A5E2C"
                  }}
                ></div>
                <div className="text-white">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-spark-yellow ml-2 font-semibold">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Utility Section */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Token Utility</h3>
          <div ref={utilityRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {utilityData.map((item, index) => (
              <div 
                key={index} 
                className="utility-item bg-[#27272F] rounded-xl p-6 flex flex-col h-full opacity-0"
              >
                <h4 className="text-white font-semibold mb-3">{item.title}</h4>
                <p className="text-gray-300 text-sm flex-grow">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 