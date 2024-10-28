import React from 'react'
import bannerImg from '../../assets/banner.png'

export const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row py-16 justify-between items-center gap-12'>
        <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={bannerImg} alt=''/>
        </div>
        
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Releases This Week</h1>
            <p className='mb-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.</p>
            <button className='btn-primary'>
                Subscribe
            </button>
        </div>

        
    </div>
  )
}
