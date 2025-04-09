'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqData = [
  {
    question: 'What is SparkMint?',
    answer: 'SparkMint is an AI-powered platform that lets anyone create and launch full-featured decentralized applications by simply describing their idea – no coding required.'
  },
  {
    question: 'How does AI app creation work?',
    answer: 'You input your app concept in natural language, and the AI generates the smart contract, backend, frontend, and deploys the complete dApp to chain in one flow.'
  },
  {
    question: 'What can I do with $SPARK tokens?',
    answer: '$SPARK is used to deploy apps, access modules, generate AI expansion packs, boost visibility in tournaments, and participate in governance. You can also stake it for revenue sharing.'
  },
  {
    question: 'How do App Tournaments work?',
    answer: 'Each month, community members vote and compete based on usage and traction. Winning apps get liquidity support, homepage promotion, and added incentives.'
  },
  {
    question: 'Can I monetize modules or AI packs I create?',
    answer: 'Yes – developers and creators can list feature modules or AI-generated content packs on the marketplace and earn $SPARK through platform rev-share.'
  },
  {
    question: 'Is SparkMint only for developers?',
    answer: 'Not at all. It\'s built for non-devs, creators, founders, and even memers – if you can describe it, you can build it.'
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const faqItemsRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<boolean>(false);
  
  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !faqItemsRef.current) return;
    
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
        
        // Animate FAQ items
        if (faqItemsRef.current) {
          const items = faqItemsRef.current.querySelectorAll('.faq-item');
          gsap.fromTo(
            items,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
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
    <section ref={sectionRef} id="faq" className="py-36 bg-[#18181B]">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <div className="inline-block bg-spark-yellow/10 text-spark-yellow px-6 py-2 rounded-full text-sm font-medium mb-8">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        </div>
        
        {/* FAQ items */}
        <div ref={faqItemsRef} className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="faq-item opacity-0 mb-4"
            >
              <button 
                onClick={() => toggleQuestion(index)} 
                className="w-full text-left py-5 px-6 bg-[#27272F]/80 backdrop-blur-sm rounded-lg flex justify-between items-center transition-all duration-300 hover:bg-[#2A2A33]"
              >
                <span className="text-white font-semibold text-lg">{item.question}</span>
                <span className="text-spark-yellow ml-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="py-4 px-6 text-gray-300 text-base bg-[#27272F]/50 rounded-b-lg">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 