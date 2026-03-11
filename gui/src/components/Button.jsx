import React from 'react'

const Button = ({ Icon, text, className = "", ...rest }) => {
  return (
    <button
      {...rest}
      className={`${className} 
        flex items-center justify-center 
        bg-black text-white 
        text-sm md:text-xl 
        rounded-md px-3 py-2 
        cursor-pointer 
        hover:brightness-95 
        hover:bg-white hover:text-black 
        transition-all duration-300`}
    >
      {Icon && <Icon className="mr-3" />}
      {text}
    </button>
  )
}

export default Button