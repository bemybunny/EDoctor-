import React from 'react'
import Footercomponent from './Footercomponent'

const Footer = () => {
  return (
    <div className=" py-24 px-12 lg:px-32">
      <div className="bg-custom-gradient px-24 py-24 flex flex-col items-center space-y-8 rounded-2xl">
            <span className="text-white text-3xl lg:text-5xl ">You can grow faster than you think!</span>
            <p className="text-white lg:text-xl">Partner with EDoctor to meet today's demand and tomorrow's aspirations. We empower brands of all sizes with the strategies and tools used by global leaders to scale and succeed.</p>
            <button className="rounded-full bg-black text-white font-bold py-3 px-6">Get started with EDoctor</button>
      </div>
      <Footercomponent/>
    </div>
  )
}

export default Footer