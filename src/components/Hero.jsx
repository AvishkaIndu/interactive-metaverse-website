import React, { useState, useRef, use, useEffect } from 'react'
import Button from './Button.jsx'
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hashClicked, setHashClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [videoError, setVideoError] = useState(false);

  const totalVideos = 3; // Updated to match available videos (hero-1, hero-2, hero-3)
  const nextVideoRef = useRef(null);
  const mainVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    setHashClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  useEffect(() => {
    if (loadedVideos >= totalVideos - 2) { // More lenient loading check
      setIsLoading(false);
    }
  }, [loadedVideos]);

  // Effect to handle main video source updates
  useEffect(() => {
    if (mainVideoRef.current) {
      const currentVideo = mainVideoRef.current;
      currentVideo.src = getVideoSrc(currentIndex);
      currentVideo.load();
      currentVideo.play().catch(console.log);
    }
  }, [currentIndex]);

  useGSAP(() => {
    if (hashClicked){
      gsap.set('#next-video', {visibility: 'visible'});

      gsap.to('#next-video', {
        transformOrigin: 'center center', 
        scale: 1, 
        duration: 1, 
        width: '100%', 
        height: '100%', 
        ease: 'power1.inOut', 
        onStart: () => {
          if (nextVideoRef.current) {
            nextVideoRef.current.play().catch(console.log);
          }
        },
        onComplete: () => {
          // Reset for next transition
          setHashClicked(false);
        }
      });

      gsap.from('#current-video', {
        transformOrigin: 'center center', 
        scale: 1, 
        duration: 1.5,
        ease: 'power1.inOut',
      })
    }
  }, {dependencies: [currentIndex], revertOnUpdate: true});

  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
      borderRadius: '0 0 40% 10%',
    });

    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => {
    // Ensure we only use available video indices (1, 2, 3)
    const validIndex = ((index - 1) % totalVideos) + 1;
    return `/videos/hero-${validIndex}.mp4`;
  };


  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
      {isLoading && (
        <div className='flex-center h-dvh absolute z-[100] w-screen overflow-hidden bg-violet-50 '>
          <div className='three-body'>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
          </div>
        </div> 

      )}


      <div id='hero' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black'>
        {videoError && (
          <div className='absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-cyan-900 z-5'>
            <div className='absolute inset-0 bg-black/30'></div>
          </div>
        )}
        <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black'>
        <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
          <div onClick={handleMiniVdClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
            <video 
              src={getVideoSrc(upcomingVideoIndex)}
              loop
              muted
              autoPlay
              playsInline
              preload="metadata"
              id='current-video'
              className='size-64 origin-center scale-150 object-cover object-center'
              onLoadedData={handleVideoLoad}
              onError={(e) => {
                console.log('Mini video load error:', e.target.src);
                setVideoError(true);
              }}
              onCanPlay={(e) => {
                e.target.play().catch(console.log);
              }}
            />
          </div>
        </div>

        {/* Click Here Animation Indicator - On Main Video Background */}
        <div className='absolute bottom-32 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none'>
          <div className='flex flex-col items-center animate-bounce'>
            <svg className='w-8 h-8 text-white animate-pulse mb-2' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z'/>
            </svg>
            <div className='text-white font-bold text-lg animate-pulse bg-black/50 px-6 py-3 rounded-full backdrop-blur-sm border border-white/30'>
              Move to another world
            </div>
          </div>
        </div>

        <video 
        src={getVideoSrc(upcomingVideoIndex)}
        loop
        muted
        autoPlay
        playsInline
        preload="metadata"
        id='next-video'
        ref={nextVideoRef}
        className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
        onLoadedData={handleVideoLoad}
        onError={(e) => {
          console.log('Next video load error:', e.target.src);
          setVideoError(true);
        }}
        />

        <video 
            ref={mainVideoRef}
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className='absolute left-0 top-0 size-full object-cover object-center'
            onLoadedData={handleVideoLoad}
            onError={(e) => {
              console.log('Video load error:', e.target.src);
              setVideoError(true);
              // Fallback to first video if current fails
              if (currentIndex !== 1) {
                setCurrentIndex(1);
              }
            }}
            onCanPlay={() => {
              // Ensure video starts playing when it can
              if (mainVideoRef.current) {
                mainVideoRef.current.play().catch(console.log);
              }
            }}
            />

      
      <h1 className='special-font hero-heading absolute bottom-3 right-8 z-40 text-[#dbeafe]'>V<b>1.0</b></h1>

      <div className='absolute left-0 top-0 z-40 size-full pointer-events-none'>
        <div className='mt-24 px-5 sm:px-10'>
          <h1 className='special-font hero-heading text-[#dbeafe]'>Game<b>Hub</b></h1>

          <p className='text-[#dbeafe] mb-4 max-w-md lg:max-w-2xl text-sm lg:text-base text-justify font-general opacity-80 leading-relaxed'>
            Welcome to the ultimate gaming destination where you can explore the latest trending games, 
            discover upcoming blockbuster releases, and dive deep into exclusive game previews. 
            Stay ahead of the gaming curve with our comprehensive coverage of the most anticipated 
            titles, insider reviews, and immersive trailers that bring you closer to your next 
            gaming adventure.
          </p>
          <div className='pointer-events-auto'>
            <Button 
              id="explore-news" 
              title="Explore News" 
              leftIcon={<TiLocationArrow />} 
              containerClass="bg-yellow-300 flex-center gap-1 mt-2" 
              onClick={() => {
                const gamesSection = document.getElementById('games');
                if (gamesSection) {
                  gamesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </div>
        
        </div>
      </div>
      </div>
    </div>

  </div>
  )
}

export default Hero


