import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import Button from './Button.jsx';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';
import MobileMenu from './MobileMenu.jsx';

const navItems = ['Home', 'About', 'Features', 'Games', 'Story', 'GameStats', 'Contact'];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const  {y: currentScrollY}  = useWindowScroll();
  useEffect(() => {
  if (currentScrollY === 0) {
    setIsNavVisible(true);
    navContainerRef.current.classList.remove('floating-nav');
  } else if (currentScrollY > lastScrollY) {
    setIsNavVisible(false);
    navContainerRef.current.classList.add('floating-nav');
  } else if (currentScrollY < lastScrollY) {
    setIsNavVisible(true);
    navContainerRef.current.classList.add('floating-nav');
  }
  
  setLastScrollY(currentScrollY); // Update last scroll position
}, [currentScrollY, lastScrollY]); // Add lastScrollY to dependencies

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      duration: 0.2,
      opacity: isNavVisible ? 1 : 0,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  }

  const handleNavClick = (item) => {
    const sectionMap = {
      'Home': 'hero',
      'About': 'about', 
      'Features': 'features',
      'Games': 'games',
      'Story': 'story',
      'GameStats': 'gamestats',
      'Contact': 'contact'
    };
    
    const sectionId = sectionMap[item];
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();  
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);
  
  
  return (
    <>
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
    <header className='absolute top-1/2 w-full -translate-y-1/2'>
      <nav className='flex size-full items-center justify-between p-4'>
        <div className='flex items-center gap-1'>
          <img src="/img/logo.png" alt="Logo" className='w-10' />

          <div className='text-2xl font-bold font-zentry '>
            <span className='text-red-500'>Game</span>
            <span className='text-white'>Hub</span>
          </div>
        </div>
        <div className='flex h-full items-center'>
          <div className='hidden md:block'>
            {navItems.map((item) => (
              <button 
                key={item} 
                onClick={() => handleNavClick(item)}
                className='nav-hover-btn cursor-pointer'
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className='md:hidden ml-4 p-2 text-blue-50'
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className="block w-5 h-0.5 bg-current mb-1"></span>
              <span className="block w-5 h-0.5 bg-current mb-1"></span>
              <span className="block w-5 h-0.5 bg-current"></span>
            </div>
          </button>

          <button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>
            <audio ref={audioElementRef} className='hidden' src='/audio/loop.mp3' loop />
              {[1,2,3,4].map((bar)=> (
                <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} style={{animationDelay: `${bar * 0.1}s`}} />

              ))}
          

          </button>
        </div>
      </nav>
    </header>
    </div>

    <MobileMenu 
      isOpen={isMobileMenuOpen}
      onClose={() => setIsMobileMenuOpen(false)}
      navItems={navItems}
    />
    </>
  )
}

export default Navbar
