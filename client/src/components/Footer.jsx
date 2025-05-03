import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
     <h1 className='text-light-blue text-3xl font-bold'>
      <span className='text-dark-blue'>H</span>ire <span className='text-slate text-xl'>me</span>
      </h1>
      <p className='text-slate hidden sm:block'>Copyright <span className='text-dark-blue font-semibold'>&copy;</span> Hire_me.com | All right reserved.</p>
      <div className="flex items-center gap-3">
        <img width={38} src={assets.facebook_icon} alt="" />
        <img width={38} src={assets.twitter_icon} alt="" />
        <img width={38} src={assets.instagram_icon} alt="" />
      </div>
    </div>
  )
}

export default Footer