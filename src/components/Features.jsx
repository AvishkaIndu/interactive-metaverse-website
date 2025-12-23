const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative size-full">
      <video 
      src={src}
      autoPlay 
      loop 
      muted 
      className="absolute top-0 left-0 size-full object-cover object-center"
      
      />

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}  
        </div>

      </div>
       {title}
    </div>
  )
}
    
      

const Features = () => {
  return (
    <section className='bg-black pb-52'>
      <div className='container mx-auto px-3 md:px-10'>
        <div className='px-5 py-32'>
          <h2 className='font-circular-web text-2xl md:text-4xl lg:text-5xl text-white font-bold mb-6'>
            Into the metagame layer
          </h2>

        
        <p className='max-w-md md:max-w-2xl lg:max-w-4xl font-circular-web text-sm md:text-lg lg:text-xl text-blue-50 opacity-70 leading-relaxed'>
          Immerse yourself in a world where gaming meets cutting-edge technology. Our platform leverages the power of blockchain to offer unique in-game assets, secure transactions, and a thriving community of gamers and developers. Experience seamless integration of NFTs, decentralized marketplaces, and play-to-earn models that redefine the gaming experience. Join us as we explore the future of gaming, where innovation and creativity know no bounds.
        </p>
      </div>
      
      <div className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
        <BentoCard 
        src='videos/feature-1.mp4'
        title={<>radi<b>n</b>t</>}
        description='Experience the future of gaming with Radiant, where blockchain technology meets immersive gameplay.'
        

        
        />

      </div>
      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <div className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
          <BentoCard 
          src='videos/feature-2.mp4'
          title={<>meta<b>v</b>ault</>}
          description='Secure your digital assets with MetaVault, the ultimate blockchain-based storage solution for gamers and collectors.' />
        </div>

        <div className='bento-tilt_2 row-span-1 md:col-span-1 md:row-span-1'>
          <BentoCard 
          src='videos/feature-3.mp4'
          title={<>n<b>e</b>xus</>}
          description='Connect with players worldwide through Nexus, our revolutionary social gaming platform.' />
        </div>

        <div className='bento-tilt_2 row-span-1 md:col-span-1 md:row-span-1'>
          <BentoCard 
          src='videos/feature-4.mp4'
          title={<>az<b>u</b>l</>}
          description='Dive into Azure, where virtual worlds come alive with stunning visuals and immersive experiences.' />
        </div>

        <div className='bento-tilt_1 col-span-2 row-span-1 md:col-span-2 md:row-span-1'>
          <BentoCard 
          src='videos/feature-5.mp4'
          title={<>m<b>o</b>re</>}
          description='Discover more features and innovations that make our platform the ultimate gaming destination.' />
        </div>
      </div>
      </div>
    </section>
  )
}

export default Features
