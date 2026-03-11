import React from 'react'

const Input = ({type,placeholder,className,Icon,error,success,...rest}) => {
  return (
    <div className={`${className} flex flex-row items-center ring-2 ring-gray-300 ${error && "ring-red-400"} ${success && "ring-green-400"} hover:ring-1  hover:ring-green-400 rounded-md my-2 p-2 overflow-hidden`}>
        
      {Icon && (
        <div className="shrink-0 w-5 h-5 mr-2">
          <Icon className="w-full h-full" />
        </div>
      )}
        <input 
        type={type}
        placeholder={placeholder}
        className={`outline-none border-none w-full`}
        {...rest} 
        
        />
    </div>
  )
}

export default Input