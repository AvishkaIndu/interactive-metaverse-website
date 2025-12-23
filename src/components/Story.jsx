import React from 'react'
import AnimatedTitle from './AnimatedTitle'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const StoryBentoCard = ({ src, title, description, className, isVideo = false }) => {
  const cardRef = useRef(null);
  
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.02,
      rotateY: 2,
      rotateX: 2,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div 
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl transition-transform duration-300 ease-out ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isVideo ? (
        <video 
          src={src}
          autoPlay 
          loop 
          muted 
          className="absolute top-0 left-0 size-full object-cover object-center"
        />
      ) : (
        <img 
          src={src}
          alt={title}
          className="absolute top-0 left-0 size-full object-cover object-center"
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      <div className="relative z-10 flex size-full flex-col justify-end p-6 text-white">
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-zentry mb-2 special-font">{title}</h3>
          {description && (
            <p className="text-sm md:text-base text-white/80 leading-relaxed">{description}</p>
          )}  
        </div>
      </div>
    </div>
  )
}

const Story = () => {
  const frameRef = useRef(null);
  const sectionRef = useRef(null);
  
  useGSAP(() => {
    gsap.from('.story-bento-card', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });

    gsap.from('.story-main-card', {
      scrollTrigger: {
        trigger: '.story-main-card',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    });
  });
  
  const handleMouseLeave = () => {  
    const element = frameRef.current;
    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: 'power1.inOut',
    });
  }

  const handleMouseMove = (e) => {
    const {clientX, clientY} = e;
    const element = frameRef.current;

    if(!element) return;

    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * -5;

    gsap.to(element, {
      duration: 0.1,
      rotateX: rotateX,
      rotateY: rotateY,
      ease: 'power1.out',
    });
  }

  return (
    <section id='story' className='min-h-dvh w-screen bg-black text-white py-20'>
      <div ref={sectionRef} className="container mx-auto px-5 md:px-10">
        <div className="flex flex-col items-center mb-16">
          <p className="font-general text-sm uppercase mb-5 text-blue-300">
            Our Story
          </p>

          <AnimatedTitle 
            title="The st<b>o</b>ry of <br /> hidden r<b>e</b>lics"
            containerClass="mt-5 text-center"
          />
          
          <p className="text-white/70 text-center max-w-2xl mt-6 leading-relaxed">
            Discover the ancient mysteries and forgotten legends that shaped our world. 
            Each relic tells a story of power, adventure, and the eternal quest for knowledge.
          </p>
        </div>

        {/* Main Story Image */}
        <div className='story-main-card mb-12'>
          <div className='relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-2xl'>
            <img 
              ref={frameRef}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseLeave}
              onMouseEnter={handleMouseLeave}
              onMouseMove={handleMouseMove}
              src="/img/entrance.webp" 
              alt="entrance"
              className='size-full object-cover transition-transform duration-200'
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-3xl md:text-4xl font-bold font-zentry mb-4 special-font">
                The <b>Gateway</b> of Mysteries
              </h3>
              <p className="text-white/90 max-w-md leading-relaxed">
                Through this ancient portal, heroes have ventured into realms unknown, 
                seeking the power of the hidden relics that could reshape reality itself.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story

