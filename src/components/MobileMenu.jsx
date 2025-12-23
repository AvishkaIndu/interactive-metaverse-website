import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const MobileMenu = ({ isOpen, onClose, navItems }) => {
  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-menu',
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      
      gsap.fromTo('.mobile-nav-item',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.1, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const handleNavClick = (item) => {
    if (item === 'Contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'About') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="mobile-menu fixed inset-0 bg-black/95 backdrop-blur-lg z-50 md:hidden">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <div className="font-zentry text-2xl font-bold text-white">Menu</div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white hover:text-blue-300 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 flex flex-col justify-center space-y-8 px-6">
          {navItems.map((item, index) => (
            <div key={index} className="mobile-nav-item">
              <button
                onClick={() => handleNavClick(item)}
                className="block w-full text-left text-3xl font-bold text-white hover:text-blue-300 transition-colors py-4"
              >
                {item}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <div className="mobile-nav-item text-center text-white opacity-70">
            <p>Ready to join the revolution?</p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;