import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

const Games = () => {
  const containerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [gameData, setGameData] = useState([]);

  // Sample game data - in a real app, this would come from an API
  const gamesDatabase = {
    trending: [
      {
        id: 1,
        title: "CYBERPUNK 2088",
        developer: "Future Studios",
        genre: "RPG/Action",
        rating: 9.2,
        releaseDate: "2024-03-15",
        image: "/img/gallery-1.webp",
        trailerUrl: "https://www.youtube.com/watch?v=8X2kIfS6fb8",
        description: "Experience the next generation of cyberpunk gaming with revolutionary AI-driven NPCs and immersive world-building.",
        tags: ["Open World", "Sci-Fi", "Multiplayer"],
        price: "$59.99",
        status: "HOT"
      },
      {
        id: 2,
        title: "MEDIEVAL LEGENDS",
        developer: "Sword & Sorcery Inc",
        genre: "Strategy/RPG",
        rating: 8.8,
        releaseDate: "2024-01-22",
        image: "/img/gallery-2.webp", 
        trailerUrl: "https://www.youtube.com/watch?v=qvsgGtivCgs",
        description: "Build your kingdom and command armies in this epic medieval strategy game with stunning graphics and deep gameplay.",
        tags: ["Strategy", "Medieval", "Kingdom Building"],
        price: "$49.99",
        status: "TRENDING"
      },
      {
        id: 3,
        title: "STELLAR ODYSSEY",
        developer: "Cosmos Games",
        genre: "Space Exploration",
        rating: 9.5,
        releaseDate: "2024-02-10",
        image: "/img/gallery-3.webp",
        trailerUrl: "https://www.youtube.com/watch?v=D1-9jj0bzbQ", 
        description: "Explore the vast universe, discover new planets, and build your space empire in this breathtaking space adventure.",
        tags: ["Space", "Exploration", "Simulation"],
        price: "$54.99",
        status: "EPIC"
      }
    ],
    new: [
      {
        id: 4,
        title: "SHADOW REALM",
        developer: "Dark Arts Studio",
        genre: "Horror/Survival",
        rating: 8.9,
        releaseDate: "2024-03-01",
        image: "/img/gallery-4.webp",
        trailerUrl: "https://www.youtube.com/watch?v=uYHAR8Xzsyo",
        description: "Survive in a world where shadows come alive. A psychological horror game that will test your nerves.",
        tags: ["Horror", "Survival", "Psychological"],
        price: "$39.99",
        status: "NEW"
      },
      {
        id: 5,
        title: "RACING THUNDER",
        developer: "Speed Demons",
        genre: "Racing/Sports",
        rating: 8.7,
        releaseDate: "2024-02-28",
        image: "/img/gallery-5.webp",
        trailerUrl: "https://www.youtube.com/watch?v=CuklIb9d3fI",
        description: "Feel the adrenaline rush in the most realistic racing simulator ever created with cutting-edge physics.",
        tags: ["Racing", "Simulation", "Sports"],
        price: "$44.99",
        status: "FRESH"
      },
      {
        id: 6,
        title: "FANTASY WARRIORS",
        developer: "Mythic Realm Studios",
        genre: "Action/Fantasy",
        rating: 9.1,
        releaseDate: "2024-02-15",
        image: "/img/swordman.webp",
        trailerUrl: "https://www.youtube.com/watch?v=v2LPAgFUgas",
        description: "Embark on an epic quest with legendary warriors in a world filled with magic and ancient mysteries.",
        tags: ["Fantasy", "Action", "Adventure"],
        price: "$52.99",
        status: "LEGENDARY"
      }
    ]
  };

  useEffect(() => {
    setGameData(gamesDatabase[selectedCategory]);
  }, [selectedCategory]);

  useGSAP(() => {
    // Animate title
    gsap.fromTo('.games-title', {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.games-title',
        start: 'top 80%',
        end: 'bottom 60%',
      }
    });

    // Animate category buttons
    gsap.fromTo('.category-btn', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.category-buttons',
        start: 'top 80%',
      }
    });

    // Animate game cards
    gsap.fromTo('.game-card', {
      opacity: 0,
      y: 100,
      scale: 0.8
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.games-grid',
        start: 'top 80%',
      }
    });
  }, [gameData]);

  const handleGameCardHover = (e, isEntering) => {
    const card = e.currentTarget;
    const image = card.querySelector('.game-image');
    const overlay = card.querySelector('.game-overlay');
    const details = card.querySelector('.game-details');
    
    if (isEntering) {
      gsap.to(card, { y: -10, scale: 1.02, duration: 0.3, ease: 'power2.out' });
      gsap.to(image, { scale: 1.1, duration: 0.5, ease: 'power2.out' });
      gsap.to(overlay, { opacity: 0.9, duration: 0.3 });
      gsap.to(details, { y: 0, opacity: 1, duration: 0.4, delay: 0.1 });
    } else {
      gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(image, { scale: 1, duration: 0.5, ease: 'power2.out' });
      gsap.to(overlay, { opacity: 0.6, duration: 0.3 });
      gsap.to(details, { y: 20, opacity: 0, duration: 0.3 });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleWatchTrailer = (trailerUrl) => {
    window.open(trailerUrl, '_blank');
  };

  return (
    <section id='games' className='min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 overflow-hidden relative'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-pulse'></div>
        <div className='absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse' style={{animationDelay: '1s'}}></div>
        <div className='absolute bottom-20 left-20 w-1 h-1 bg-blue-400 rounded-full opacity-50 animate-pulse' style={{animationDelay: '2s'}}></div>
        <div className='absolute bottom-40 right-10 w-2 h-2 bg-pink-400 rounded-full opacity-30 animate-pulse' style={{animationDelay: '0.5s'}}></div>
        
        {/* Geometric Shapes */}
        <div className='absolute top-32 right-32 w-20 h-20 border border-cyan-500/20 rotate-45 animate-spin-slow'></div>
        <div className='absolute bottom-32 left-32 w-16 h-16 border border-purple-500/20 rotate-12 animate-pulse'></div>
      </div>

      <div ref={containerRef} className='container mx-auto px-5 md:px-10 relative z-10'>
        
        {/* Title with Gaming Style */}
        <div className='games-title text-center mb-16 relative'>
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60'></div>
          
          <AnimatedTitle
            title="DISC<b>O</b>VER NEW G<b>A</b>MES"
            containerClass="text-center text-white mb-6 font-mono"
          />
          
          <div className='relative inline-block'>
            <p className='text-cyan-300 opacity-80 max-w-3xl mx-auto text-lg leading-relaxed font-mono tracking-wide border border-cyan-500/30 bg-black/50 p-6 rounded-lg backdrop-blur-sm'>
              <span className='text-cyan-400'>&gt;</span> Stay ahead of the gaming curve with the latest releases, trending titles, and exclusive previews.<br/>
              <span className='text-purple-400'>&gt;</span> Discover your next gaming obsession in our curated collection.
            </p>
            <div className='absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
            <div className='absolute bottom-2 left-2 w-2 h-2 bg-red-400 rounded-full animate-pulse'></div>
          </div>
        </div>

        {/* Gaming Style Category Buttons */}
        <div className='category-buttons flex justify-center mb-16 gap-6'>
          <button
            className={`category-btn relative px-10 py-4 font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden group ${
              selectedCategory === 'trending'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/50 border border-cyan-400'
                : 'bg-black/80 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400'
            }`}
            style={{clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)'}}
            onClick={() => setSelectedCategory('trending')}
          >
            <div className='absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
            <span className='relative z-10'>◤ TRENDING NOW ◥</span>
          </button>
          <button
            className={`category-btn relative px-10 py-4 font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden group ${
              selectedCategory === 'new'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/50 border border-purple-400'
                : 'bg-black/80 text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-400'
            }`}
            style={{clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)'}}
            onClick={() => setSelectedCategory('new')}
          >
            <div className='absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
            <span className='relative z-10'>◤ NEW RELEASES ◥</span>
          </button>
        </div>

        {/* Gaming Style Cards Grid */}
        <div className='games-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {gameData.map((game, index) => (
            <div
              key={game.id}
              className='game-card relative bg-gradient-to-b from-gray-900/90 to-black/95 rounded-none overflow-hidden cursor-pointer border-2 border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400/80 transition-all duration-500 group'
              style={{
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                transform: `perspective(1000px) rotateY(${index % 2 === 0 ? '2deg' : '-2deg'})`
              }}
              onMouseEnter={(e) => handleGameCardHover(e, true)}
              onMouseLeave={(e) => handleGameCardHover(e, false)}
            >
              {/* Holographic Corner Effects */}
              <div className='absolute top-0 right-0 w-4 h-4 bg-gradient-to-bl from-cyan-400 to-transparent opacity-60'></div>
              <div className='absolute bottom-0 left-0 w-4 h-4 bg-gradient-to-tr from-purple-400 to-transparent opacity-60'></div>
              
              {/* Game Image with Overlay Effects */}
              <div className='relative h-64 overflow-hidden'>
                <img
                  src={game.image}
                  alt={game.title}
                  className='game-image w-full h-full object-cover filter brightness-90'
                />
                <div className='game-overlay absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70'></div>
                
                {/* Scan Line Effect */}
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-pulse'></div>
                
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                  game.status === 'HOT' ? 'bg-red-500 text-white' :
                  game.status === 'EPIC' ? 'bg-purple-500 text-white' :
                  game.status === 'LEGENDARY' ? 'bg-yellow-500 text-black' :
                  'bg-green-500 text-white'
                }`}
                style={{clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 100%, 6px 100%)'}}
                >
                  {game.status}
                </div>

                {/* Rating with Gaming Style */}
                <div className='absolute top-4 left-4 flex items-center bg-black/80 border border-yellow-400/50 px-3 py-1'>
                  <div className='text-yellow-400 text-sm font-bold mr-1'>★</div>
                  <span className='text-yellow-400 font-mono text-sm'>{game.rating}</span>
                </div>

                {/* Game Details Overlay with Cyberpunk Style */}
                <div className='game-details absolute bottom-4 left-4 right-4 transform translate-y-8 opacity-0 transition-all duration-300'>
                  <h3 className='text-cyan-300 text-xl font-bold mb-2 uppercase font-mono tracking-wide'>{game.title}</h3>
                  <p className='text-gray-300 text-sm mb-3 leading-relaxed'>{game.description}</p>
                  <div className='flex flex-wrap gap-1 mb-3'>
                    {game.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className='bg-cyan-600/30 border border-cyan-400/50 text-cyan-300 text-xs px-2 py-1 uppercase font-mono'>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glitch Effect Overlay */}
                <div className='absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300'>
                  <div className='w-full h-px bg-cyan-400 absolute top-1/4 animate-pulse'></div>
                  <div className='w-full h-px bg-purple-400 absolute top-1/2 animate-pulse' style={{animationDelay: '0.5s'}}></div>
                  <div className='w-full h-px bg-pink-400 absolute top-3/4 animate-pulse' style={{animationDelay: '1s'}}></div>
                </div>
              </div>

              {/* Game Info Section with Gaming Aesthetics */}
              <div className='p-6 border-t border-cyan-500/30'>
                <div className='flex justify-between items-start mb-4'>
                  <div>
                    <h4 className='text-cyan-300 text-lg font-bold uppercase font-mono tracking-wide'>{game.title}</h4>
                    <p className='text-gray-400 text-sm font-mono'>[{game.developer}]</p>
                  </div>
                  <span className='text-purple-400 text-sm font-mono bg-purple-900/30 px-2 py-1 border border-purple-500/30'>
                    {game.genre}
                  </span>
                </div>
                
                <div className='flex justify-between items-center'>
                  <span className='text-gray-500 text-xs font-mono'>
                    RELEASED: {formatDate(game.releaseDate)}
                  </span>
                  <button 
                    onClick={() => handleWatchTrailer(game.trailerUrl)}
                    className='bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 font-mono font-bold uppercase text-xs tracking-wider border border-red-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-400/30 group flex items-center gap-2'
                  >
                    <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M8 5v14l11-7z'/>
                    </svg>
                    <span className='group-hover:animate-pulse'>WATCH TRAILER</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gaming Style Load More Button */}
        <div className='text-center'>
          <button className='relative bg-black border-2 border-cyan-400 text-cyan-300 px-12 py-4 font-bold uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition-all duration-300 group overflow-hidden'
                  style={{clipPath: 'polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)'}}
          >
            <div className='absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></div>
            <span className='relative z-10 flex items-center gap-2 font-mono'>
              <span>&gt;&gt;</span>
              LOAD MORE GAMES
              <span>&lt;&lt;</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Games;