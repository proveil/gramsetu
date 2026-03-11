import React from 'react'
import { FaCheck, FaXmark } from "react-icons/fa6";
import Button from './Button';
import { animate, motion } from 'framer-motion';

const FeaturesCard = ({ features, title }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1}}
            viewport={{ once: true }}
            className='bg-[#172036] text-white w-[90%] lg:w-[22%] md:w-[30%] md:mb-20 p-4 flex flex-col items-center rounded-md'>
            <h2 className='my-2 text-2xl'>{title}</h2>
            <div className='flex justify-center w-full'>
                <hr className='w-[90%] h-px text-white/40' />
            </div>
            <div className='self-start p-4'>
                {
                    features.map((feature, index) => (
                        <div key={index} className='flex flex-row items-center'>
                            {feature.check ? <FaCheck className='mx-2 text-xl self-start mt-2' /> : <FaXmark className='mx-2 text-xl self-start mt-2' />}
                            <p className='text-xl text-wrap'>{feature.info}</p>
                        </div>
                    ))
                }
            </div>
            <Button text={'Explore'} />
        </motion.div>
    )
}

export default FeaturesCard