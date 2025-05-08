import React, { useContext, useEffect, useState } from 'react'
import moment from "moment";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const ManageJobs = () => {

  const {backendUrl, companyToken} = useContext(AppContext);

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  // fetch jobs applications
  const fetchCompanyJobs = async () => {
    try {
      const {data} = await axios.get(backendUrl + "/api/company/list-jobs", {headers: {token: companyToken}});
      if(data.success){
        setJobs(data.jobsData.reverse());
        console.log(data);
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // change job visibility
  const changeJobVisibility = async (id) => {
   try {
    const {data} = await axios.post(backendUrl + "/api/company/change-visibility", {id}, {headers: {token: companyToken}});
    if(data.success){
      toast.success(data.message);
      fetchCompanyJobs();
    } else {
      toast.error(data.message);
    }
   } catch (error) {
    toast.error(error.message);
   }
  }

  useEffect(()=>{
    if(companyToken){
      fetchCompanyJobs();
    }
  },[companyToken]);


  return (
    <div className='container p-4 max-w-5xl'>
      <div className="overflow-x-auto">
        <table className='min-w-full bg-white border border-gray-100 text-sm'>
          <thead>
            <tr>
              <th className='py-2 px-4 text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 text-left'>Job</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 text-center'>Applicants</th>
              <th className='py-2 px-4 text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index)=>(
              <tr key={index} className='text-slate'>
               <td className='py-2 px-4 max-sm:hidden'>{index + 1}</td>
               <td className='py-2 px-4'>{job.title}</td>
               <td className='py-2 px-4 max-sm:hidden'>{moment(job.date).format("ll")}</td>
               <td className='py-2 px-4 max-sm:hidden'>{job.location}</td>
               <td className='py-2 px-4 text-center'>{job.applicants}</td>
               <td className='py-2 px-4 text-center'>
                <input type="checkbox" checked={job.visible} onChange={() => changeJobVisibility(job._id)} className='scale-110'/>
               </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pt-4 flex justify-end">
        <button onClick={() => navigate("/dashboard/add-job")} className='bg-light-blue text-white py-2 px-4 rounded'>Add new Job</button>
      </div>
      
    </div>
  )
}

export default ManageJobs;