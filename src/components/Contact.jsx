import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import AnimatedTitle from './AnimatedTitle';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom center',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from('.contact-element', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });

    gsap.from(formRef.current, {
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        console.log('Form submitted successfully:', data);
      } else {
        setSubmitStatus('error');
        console.error('Form submission failed:', data);
      }
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(''), 3000);
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-black text-blue-50 py-20">
      <div ref={containerRef} className="container mx-auto px-5 md:px-10">
        <div className="flex flex-col items-center mb-16">
          <p className="contact-element font-general text-sm uppercase mb-5 text-blue-300">
            Get in Touch
          </p>
          
          <AnimatedTitle 
            title="Ready to j<b>o</b>in the <br /> metagame r<b>e</b>volution?"
            containerClass="contact-element mt-5 text-center"
          />
          
          <div className="contact-element mt-8 text-center max-w-2xl">
            <p className="text-white opacity-70 leading-relaxed">
              Whether you're a gamer, developer, or investor, we'd love to hear from you. 
              Join our community and be part of the future of gaming.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="contact-element space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Connect With Us</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <TiLocationArrow className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Address</h4>
                    <p className="text-white opacity-70">
                      123 Gaming District<br />
                      Metaverse City, MC 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">@</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-white opacity-70">contact@metagame.io</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">#</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Discord</h4>
                    <p className="text-white opacity-70">Join our community</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/10">
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {['Twitter', 'Discord', 'Telegram', 'YouTube'].map((social) => (
                  <button 
                    key={social}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-all duration-300 hover:scale-105"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="contact-element">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/80"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/80"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/80"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/80 resize-none"
                    placeholder="Tell us more..."
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Button
                    title={isSubmitting ? "Sending..." : "Send Message"}
                    rightIcon={!isSubmitting && <TiLocationArrow />}
                    containerClass={`${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''} bg-blue-50 hover:bg-white transition-colors`}
                  />
                  
                  {submitStatus === 'success' && (
                    <p className="text-green-400 text-sm">Message sent successfully!</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-sm">Failed to send message. Try again.</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;