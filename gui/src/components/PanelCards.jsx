import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoSettingsSharp } from "react-icons/io5";

const PanelCards = ({ Icon, title, nav, flipIcon, onClick, Settings, SettingsClick, className = "", ...rest }) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        } else if (nav) {
            navigate(nav);
        }
    };
    return (
        <button
            {...rest}
            onClick={handleClick}
            className={`
            ${className}
            w-full
            cursor-pointer
            px-4 py-3
            flex items-center gap-3
            rounded-xl
            text-sm font-semibold
            text-white/80
            hover:text-white
            transition-all duration-200
            `}
        >
            {Icon && <Icon className={`text-2xl ${flipIcon ? "transform scale-x-[-1]" : ""}`} />}
            <div className='flex flex-row justify-between w-full items-center'>
                <span className="font-bold text-xs uppercase">
                    {title}
                </span>
                {Settings && <IoSettingsSharp className='text-2xl text-gray-500' />}
            </div>
        </button>
    )
}

export default PanelCards