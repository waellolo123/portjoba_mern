import React, { useContext, useRef } from 'react';
import {assets} from "../assets/assets";
import { AppContext } from '../context/AppContext';

const Hero = () => {

  const {setSearchFilter, setIsSearched} = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value
    });
    setIsSearched(true);
  }

  return (
    <div className='container 2xl:px20 mx-auto md:my-5'>
      <div className="shadow-lg rounded-lg py-16 text-center mx-2">
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-light-blue'>Over 10.000 Jobs to apply</h2>
        <p className='text-slate mb-8 max-w-xl mx-auto text-sm font-light px-5'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Career.</p>
          {/* inputs */}
        <div className="flex items-center justify-between rounded max-w-xl mx-4 sm:mx-auto border border-slate">
          <div className="flex items-center ml-2">
            <img src={assets.search_icon} className='h-4 sm:h-5' alt="" />
            <input 
            ref={titleRef}
            type="text" 
            placeholder='Search for Jobs...' 
            className='max-sm:text-xs p-2 rounded-2xl outline-none w-full' />
          </div>

          <div className="flex items-center">
            <img src={assets.location_icon} className='h-4 sm:h-5' alt="" />
            <input 
            ref={locationRef}
            type="text" 
            placeholder='Location' 
            className='max-sm:text-xs p-2 rounded-2xl outline-none w-full' />
          </div>
          <button 
          onClick={onSearch}
          className='bg-light-blue px-6 py-2 text-white cursor-pointer'
          >Search</button>
        </div>
      </div>
      {/* campagnies logos */}
      <div className="mx-2 mt-5 p-6 rounded-md flex">
        <div className="w-full flex justify-center items-center gap-10 lg:gap-16 flex-wrap">
          <p className='font-medium text-slate'>Trusted by</p>
          <img src={assets.microsoft_logo} className='h-6 lg:h-8 ' alt="" />
          <img src={assets.walmart_logo} className='h-6 lg:h-8 ' alt="" />
          <img src={assets.accenture_logo} className='h-6 lg:h-8 ' alt="" />
          <img src={assets.samsung_logo} className='h-6 lg:h-8 ' alt="" />
          <img src={assets.amazon_logo} className='h-6 lg:h-8 ' alt="" />
          <img src={assets.adobe_logo} className='h-6 lg:h-8 ' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Hero;
