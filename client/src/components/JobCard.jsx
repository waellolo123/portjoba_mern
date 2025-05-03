import { assets } from "../assets/assets";
import {useNavigate} from "react-router-dom";

const JobCard = ({job}) => {

  const navigate = useNavigate();

  return (
    <div className="border border-gray-100 p-4 shadow rounded">
     <div className="flex justify-between items-center">
      <img src={assets.company_icon} className="h-8" alt="" />
     </div>
     <h4 className="font-medium text-xl mt-2 text-dark-blue">{job.title}</h4>
     <div className="flex items-center gap-3 mt-2 text-xs">
      <span className="bg-blue-50 px-4 py-1.5 rounded">{job.location}</span>
      <span className="bg-red-50 px-4 py-1.5 rounded">{job.level}</span>
     </div>
     <p className="text-slate text-sm mt-4" dangerouslySetInnerHTML={{__html:job.description.slice(0, 150)}}></p>
     <div className="mt-4 flex items-center justify-between text-sm">
      <button onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0, 0)}} className="bg-light-blue text-white px-4 py-2 rounded">Apply Now</button>
      <button onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0, 0)}} className=" text-dark-blue border border-dark-blue rounded px-4 py-2">Learn More</button>
     </div>
    </div>
  )
}

export default JobCard;