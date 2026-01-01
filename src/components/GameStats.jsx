import React, { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedTitle from './AnimatedTitle';

const GameStats = () => {
  const [stats, setStats] = useState({
    articlesPublished: 0,
    gamesCovered: 0,
    exclusivePreviews: 0,
    monthlyReaders: 0,
    breakingNews: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useGSAP(() => {
    gsap.from('.stat-item', {
      scrollTrigger: {
        trigger: '.stats-container',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    });
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Fallback to static data
        setStats({
          articlesPublished: 2847,
          gamesCovered: 1654,
          exclusivePreviews: 127,
          monthlyReaders: 450000,
          breakingNews: 38
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    
    // Update stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toLocaleString();
  };

  if (isLoading) {
    return (
      <section className="bg-black py-20">
        <div className="container mx-auto px-5 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="h-12 bg-white/10 rounded mb-2"></div>
                  <div className="h-4 bg-white/10 rounded w-20 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='gamestats' className="bg-black py-20">
      <div className="container mx-auto px-5 md:px-10">
        <div className="text-center mb-12">
          <AnimatedTitle 
            title="Gaming n<b>e</b>ws platform <br /> st<b>a</b>tistics"
            containerClass="text-center text-white"
          />
          <p className="text-white opacity-70 mt-6 max-w-2xl mx-auto">
            Your trusted source for comprehensive gaming news coverage and exclusive industry insights
          </p>
        </div>

        <div className="stats-container grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          <div className="stat-item text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              {formatNumber(stats.articlesPublished)}
            </div>
            <div className="text-white opacity-70 text-sm">Articles Published</div>
          </div>

          <div className="stat-item text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              {formatNumber(stats.gamesCovered)}
            </div>
            <div className="text-white opacity-70 text-sm">Games Covered</div>
          </div>

          <div className="stat-item text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              {formatNumber(stats.exclusivePreviews)}
            </div>
            <div className="text-white opacity-70 text-sm">Exclusive Previews</div>
          </div>

          <div className="stat-item text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              {formatNumber(stats.monthlyReaders)}
            </div>
            <div className="text-white opacity-70 text-sm">Monthly Readers</div>
          </div>

          <div className="stat-item col-span-2 md:col-span-1 text-center p-6 bg-red-500/20 rounded-2xl backdrop-blur-sm border border-red-500/30">
            <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">
              {formatNumber(stats.breakingNews)}
            </div>
            <div className="text-red-300 text-sm">Breaking News</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameStats;