import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets';

const ViewApplications = () => {

  

  return (
    <div className='container mx-auto p-4'>
     <div className="">
      <table className='w-full max-w-4xl bg-white border border-gray-100 text-sm'>
        <thead>
          <tr className='border-b '>
            <th className='py-2 px-4 text-left'>#</th>
            <th className='py-2 px-4 text-left'>User</th>
            <th className='py-2 px-4 text-left max-sm:hidden'>Job</th>
            <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
            <th className='py-2 px-4 text-left'>Resume</th>
            <th className='py-2 px-4 text-left'>Action</th>
          </tr>
        </thead>
        <tbody>
          {viewApplicationsPageData.map((applicant, index)=>(
            <tr 
            className='text-slate border border-gray-100'
            key={index}>
              <td className='py-2 px-4 text-center'>{index + 1}</td>
              <td className='py-2 px-4 text-center flex items-center gap-2'>
                <img src={applicant.imgSrc} className='w-10 h-10 rounded-full m(3
                 max-sm:hidden object-cover' alt="" />
                <span>{applicant.name}</span>
              </td>
              <td className='py-2 px-4 text-center max-sm:hidden'>{applicant.jobTitle}</td>
              <td className='py-2 px-4 text-center max-sm:hidden'>{applicant.location}</td>
              <td className='py-2 px-4'>
                <a
                className='bg-blue-100 text-light-blue px-3 py1 rounded inline-flex gap-2 items-center'
                href="" target='_blank'>Resume
                <img src={assets.resume_download_icon} alt="" />
                </a>
              </td>
              <td className='py-2 px-4 relative'>
               <div className="relative inline-block text-left group">
                <button className='text-slate'>...</button>
                <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border-gray-200 rounded shadow group-hover:block">
                  <button className='block w-full text-left px-4 py-2 text-light-blue hover:bg-gray-100'>Accept</button>
                  <button className='block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100'>Reject</button>
                </div>
               </div> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div> 
    </div>
  )
}

export default ViewApplications;
