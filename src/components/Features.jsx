const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative size-full">
      <video 
      src={src}
      autoPlay 
      loop 
      muted 
      playsInline
      preload="metadata"
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
    <section id='features' className='bg-black pb-52'>
      <div className='container mx-auto px-3 md:px-10'>
        <div className='px-5 py-32'>
          <h2 className='font-circular-web text-2xl md:text-4xl lg:text-5xl text-white font-bold mb-6'>
            Latest Gaming Coverage
          </h2>

        
        <p className='max-w-md md:max-w-2xl lg:max-w-4xl font-circular-web text-sm md:text-lg lg:text-xl text-blue-50 opacity-70 leading-relaxed'>
          Stay ahead with comprehensive gaming news coverage, exclusive previews, and in-depth analysis. Our platform delivers breaking news on upcoming releases, industry updates, developer interviews, and detailed reviews to keep you informed about the latest in gaming. Join our community of gaming enthusiasts for the most accurate and timely gaming news updates.
        </p>
      </div>
      
      <div className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
        <BentoCard 
        src='videos/feature-1.mp4'
        title={<>late<b>s</b>t</>}
        description='Get exclusive access to the newest game releases with comprehensive reviews and gameplay analysis.'
        

        
        />

      </div>
      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <div className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
          <BentoCard 
          src='videos/feature-2.mp4'
          title={<>break<b>i</b>ng</>}
          description='Stay updated with breaking gaming industry news, announcements, and exclusive developer interviews.' />
        </div>

        <div className='bento-tilt_2 row-span-1 md:col-span-1 md:row-span-1'>
          <BentoCard 
          src='videos/feature-3.mp4'
          title={<>previ<b>e</b>ws</>}
          description='Exclusive early access previews and hands-on gameplay coverage of upcoming gaming titles.' />
        </div>

        <div className='bento-tilt_2 row-span-1 md:col-span-1 md:row-span-1'>
          <BentoCard 
          src='videos/feature-4.mp4'
          title={<>revie<b>w</b>s</>}
          description='In-depth game reviews, ratings, and detailed analysis to help you discover your next favorite game.' />
        </div>

        <div className='bento-tilt_1 col-span-2 row-span-1 md:col-span-2 md:row-span-1'>
          <BentoCard 
          src='videos/feature-5.mp4'
          title={<>trend<b>i</b>ng</>}
          description='Discover trending games, viral gaming moments, and emerging gaming technologies shaping the industry.' />
        </div>
      </div>
      </div>
    </section>
  )
}

export default Features
