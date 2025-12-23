import React from 'react'


const Button = ({id, title, leftIcon,rightIcon, containerClass}) => {
  return (
    <button id={id} className={`group relative cursor-pointer z-10 w-fit overflow-hidden rounded-full px-7 py-3 text-black flex items-center justify-center gap-2 ${containerClass}`} >  
      {leftIcon}
      <span className='relative inline-flex overflow-hidden font-general text-xs uppercase'>
        <div>
          {title}
        </div>
      </span>
      {rightIcon}
    </button>
  )
}

export default Button
