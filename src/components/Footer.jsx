import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TiLocationArrow } from 'react-icons/ti';
import Button from './Button';

const Footer = () => {
  const footerRef = useRef(null);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  useGSAP(() => {
    gsap.from('.footer-element', {
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });
  });

  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    setSubscribeStatus('');

    try {
      const response = await fetch('http://localhost:3001/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribeStatus('success');
        setEmail('');
      } else {
        setSubscribeStatus('error');
      }

      setTimeout(() => setSubscribeStatus(''), 3000);
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus(''), 3000);
    } finally {
      setIsSubscribing(false);
    }
  };

  const footerLinks = {
    'Company': [
      { name: 'About Us', href: '#about' },
      { name: 'Our Story', href: '#story' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press Kit', href: '#press' }
    ],
    'Gaming': [
      { name: 'Features', href: '#features' },
      { name: 'Tournaments', href: '#tournaments' },
      { name: 'Leaderboard', href: '#leaderboard' },
      { name: 'Community', href: '#community' }
    ],
    'Resources': [
      { name: 'Documentation', href: '#docs' },
      { name: 'API Reference', href: '#api' },
      { name: 'Support Center', href: '#support' },
      { name: 'System Status', href: '#status' }
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', href: '#' },
    { name: 'Discord', icon: '⚡', href: '#' },
    { name: 'YouTube', icon: '▶', href: '#' },
    { name: 'Twitch', icon: '⚪', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' }
  ];

  return (
    <footer ref={footerRef} className="bg-black text-blue-50 border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-5 md:px-10 py-16">
        {/* Top Section */}
        <div className="footer-element mb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="font-zentry text-4xl md:text-6xl font-bold text-white mb-4">
                Ready to Play?
              </h2>
              <p className="text-white opacity-70 max-w-md mb-6">
                Join millions of gamers in the ultimate metaverse experience. 
                Start your legendary journey today.
              </p>
              <Button
                title="Get Started"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 hover:bg-white transition-colors"
              />
            </div>
            
            {/* Newsletter Signup */}
            <div className="lg:text-right">
              <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-white opacity-70 mb-6">
                Get the latest news, updates, and exclusive content delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/80 flex-1 lg:max-w-xs"
                  required
                />
                <Button
                  title={isSubscribing ? "Subscribing..." : "Subscribe"}
                  containerClass={`${isSubscribing ? 'opacity-70 cursor-not-allowed' : ''} bg-blue-600 hover:bg-blue-700 text-white transition-colors`}
                />
              </form>
              {subscribeStatus === 'success' && (
                <p className="text-green-400 text-sm mt-2">Successfully subscribed!</p>
              )}
              {subscribeStatus === 'error' && (
                <p className="text-red-400 text-sm mt-2">Subscription failed. Please try again.</p>
              )}
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-element grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-white opacity-70 hover:opacity-100 hover:text-white transition-all duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="footer-element border-y border-white/10 py-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10M+</div>
              <div className="text-white opacity-70 text-sm">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500K+</div>
              <div className="text-white opacity-70 text-sm">Daily Matches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">1K+</div>
              <div className="text-white opacity-70 text-sm">Game Titles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-white opacity-70 text-sm">Countries</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-element">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Brand */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <div>
                <div className="font-zentry text-2xl font-bold text-white">Metagame</div>
                <div className="text-white opacity-70 text-sm">The Future of Gaming</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-white opacity-70 text-sm mr-2">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  title={social.name}
                >
                  <span className="text-white text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white opacity-70">
              <p>© {currentYear} Metagame. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#privacy" className="hover:opacity-100 transition-opacity">Privacy</a>
                <a href="#terms" className="hover:opacity-100 transition-opacity">Terms</a>
                <a href="#cookies" className="hover:opacity-100 transition-opacity">Cookies</a>
                <a href="#accessibility" className="hover:opacity-100 transition-opacity">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;