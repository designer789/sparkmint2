'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Navigation items - same as Footer
const navigationItems = [
  { name: 'Home', href: '#' },
  { name: 'Features', href: '#features' },
  { name: 'Why SparkMint', href: '#why-sparkmint' },
  { name: 'Tokenomics', href: '#tokenomics' },
  { name: 'Roadmap', href: '#roadmap' },
  { name: 'FAQ', href: '#faq' },
];

// Social icons - same as Footer
const socialItems = [
  { 
    name: 'X', 
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

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="py-5 px-4 md:px-8 border-b border-gray-800/30 bg-[#18181B]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/hd.png" 
            alt="SparkMint Logo" 
            width={150} 
            height={40} 
            className="h-10 w-auto"
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="px-4 py-2 text-gray-300 rounded-full hover:text-white hover:bg-[#27272F]/70 transition-all duration-300 text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Social Icons & CTA - Desktop */}
        <div className="hidden md:flex items-center">
          <div className="flex space-x-2">
            {socialItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-300 hover:text-white hover:bg-[#27272F]/70 rounded-full transition-all duration-300 flex items-center justify-center"
                aria-label={item.name}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden absolute top-full left-0 right-0 bg-[#18181B]/95 backdrop-blur-md border-b border-gray-800/30 py-4 px-4"
        >
          <nav className="flex flex-col space-y-3 mb-4">
            {navigationItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-[#27272F]/70 rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-800/30">
            <div className="flex space-x-2">
              {socialItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-300 hover:text-white hover:bg-[#27272F]/70 rounded-full transition-all duration-300 flex items-center justify-center"
                  aria-label={item.name}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 