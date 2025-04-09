'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Feature data
const features = [
  {
    id: 1,
    title: "AI App Generator",
    description: "Input your idea, get a fully deployed dApp – smart contract, backend, frontend, all done by AI.",
    image: "/p1.png"
  },
  {
    id: 2,
    title: "Auto Token Creation",
    description: "Every app comes with a built-in token, ready for utility, governance, and value capture.",
    image: "/p2.png"
  },
  {
    id: 3,
    title: "Module Marketplace",
    description: "Access a growing library of plug-and-play features like chat, payments, and social tools. Modules are built by platform, community developers, or users and accessed using tokens.",
    image: "/p3.png"
  },
  {
    id: 4,
    title: "dApp Tournaments",
    description: "Top apps win liquidity support and exposure through monthly on-chain competitions.",
    image: "/p4.png"
  },
  {
    id: 5,
    title: "Cross-App Token Utility",
    description: "Tokens created on SparkMint can be used across multiple apps in the ecosystem, enabling composability and multi-app value loops.",
    image: "/p5.png"
  },
  {
    id: 6,
    title: "AI Expansion Packs",
    description: "Request AI to generate new features for your app and earn from marketplace sales.",
    image: "/p6.png"
  }
];

export default function CoreFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<boolean>(false);
  
  // Calculate how many slides to show at once based on screen size
  const getCardsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3; // Default for SSR
  };
  
  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());
  const [totalSlides, setTotalSlides] = useState(features.length - cardsToShow + 1);
  
  // Update cards to show on window resize
  useEffect(() => {
    const handleResize = () => {
      const newCardsToShow = getCardsToShow();
      setCardsToShow(newCardsToShow);
      setTotalSlides(features.length - newCardsToShow + 1);
      
      // If the current active index is now out of bounds after resize, adjust it
      if (activeIndex >= features.length - newCardsToShow + 1) {
        setActiveIndex(features.length - newCardsToShow);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex]);
  
  // GSAP animation setup
  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !carouselContainerRef.current || !indicatorsRef.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        if (animatedRef.current) return;
        animatedRef.current = true;
        
        // Create a timeline for sequential animations
        const tl = gsap.timeline();
        
        // Animate the header
        tl.fromTo(
          headerRef.current?.children || [],
          { 
            opacity: 0, 
            y: 30 
          },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
          }
        );
        
        // Animate the carousel
        tl.fromTo(
          carouselContainerRef.current,
          { 
            opacity: 0, 
            y: 40 
          },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            ease: "power2.out"
          },
          "-=0.4" // Start slightly before the header animation finishes
        );
        
        // Animate the indicators
        tl.fromTo(
          indicatorsRef.current?.children || [],
          { 
            opacity: 0, 
            scale: 0.8 
          },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.5)"
          },
          "-=0.3" // Start slightly before the carousel animation finishes
        );
      }
    });
    
    return () => {
      trigger.kill();
    };
  }, []);
  
  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => {
        // If we're at the last slide, stop auto-playing instead of wrapping
        if (current === totalSlides - 1) {
          setIsAutoPlaying(false);
          return current;
        }
        // Otherwise, move to the next slide
        return current + 1;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides, isDragging]);
  
  // Handle manual navigation
  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };
  
  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent, cardIndex: number) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    setDragStartX(e.clientX);
    setDragOffset(0);
    setActiveCardIndex(cardIndex);
    
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grabbing';
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const diff = currentX - dragStartX;
    
    // Calculate the maximum drag distance
    const maxDrag = (carouselRef.current?.offsetWidth || 0) * (totalSlides - 1) / totalSlides;
    
    // Limit the drag to prevent over-scrolling
    const newOffset = Math.max(Math.min(diff, maxDrag), -maxDrag);
    setDragOffset(newOffset);
  };
  
  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setActiveCardIndex(null);
    
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
    
    // Calculate which slide to snap to based on the drag distance
    const slideWidth = (carouselRef.current?.offsetWidth || 0) / cardsToShow;
    const threshold = slideWidth * 0.3; // 30% of a slide width
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Dragged right, go to previous slide
        setActiveIndex((current) => {
          // If we're at the first slide, don't wrap around
          if (current === 0) {
            return current;
          }
          return current - 1;
        });
      } else {
        // Dragged left, go to next slide
        setActiveIndex((current) => {
          // If we're at the last slide, don't wrap around
          if (current === totalSlides - 1) {
            return current;
          }
          return current + 1;
        });
      }
    }
    
    // Reset drag offset
    setDragOffset(0);
  };
  
  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent, cardIndex: number) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    setDragStartX(e.touches[0].clientX);
    setDragOffset(0);
    setActiveCardIndex(cardIndex);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStartX;
    
    // Calculate the maximum drag distance
    const maxDrag = (carouselRef.current?.offsetWidth || 0) * (totalSlides - 1) / totalSlides;
    
    // Limit the drag to prevent over-scrolling
    const newOffset = Math.max(Math.min(diff, maxDrag), -maxDrag);
    setDragOffset(newOffset);
    
    // Prevent page scrolling when swiping the carousel
    e.preventDefault();
  };
  
  const handleTouchEnd = () => {
    handleMouseUp();
  };
  
  // Calculate the transform value for the carousel
  const getTransformValue = () => {
    const baseTransform = -activeIndex * (100 / cardsToShow);
    const dragTransform = isDragging ? (dragOffset / (carouselRef.current?.offsetWidth || 1)) * 100 : 0;
    return baseTransform + dragTransform;
  };
  
  return (
    <section ref={sectionRef} id="features" className="py-20 md:py-28 lg:py-36 bg-[#18181B]">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 opacity-0">Core Features</h2>
          <p className="text-[#a8afb7] max-w-2xl mx-auto text-base sm:text-lg md:text-xl opacity-0 px-4">
            Discover the powerful tools that make SparkMint the ultimate platform for dApp creation
          </p>
        </div>
        
        {/* Carousel */}
        <div className="relative mx-auto">
          {/* Carousel container */}
          <div 
            className="overflow-hidden cursor-grab opacity-0"
            ref={carouselContainerRef}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              ref={carouselRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ 
                transform: `translateX(${getTransformValue()}%)`,
                transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
              }}
            >
              {features.map((feature, index) => (
                <div 
                  key={feature.id} 
                  className="w-full flex-shrink-0 px-1 sm:px-2 md:px-3"
                  style={{ width: `${100 / cardsToShow}%` }}
                >
                  <div 
                    className={`flex flex-col bg-[#27272A] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full group ${
                      isDragging && activeCardIndex === index ? 'scale-[0.98]' : 'scale-100'
                    }`}
                    onMouseDown={(e) => handleMouseDown(e, index)}
                    onTouchStart={(e) => handleTouchStart(e, index)}
                  >
                    {/* Image */}
                    <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden flex items-center justify-center">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-[60%] h-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 md:p-6 flex-grow">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">{feature.title}</h3>
                      <p className="text-[#a8afb7] text-sm md:text-base leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicators */}
          <div ref={indicatorsRef} className="flex justify-center mt-5 md:mt-8 space-x-2 md:space-x-3">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-spark-yellow w-6 md:w-8' : 'bg-[#a8afb7]/30 hover:bg-[#a8afb7]/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 