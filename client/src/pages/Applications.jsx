import { useContext, useState } from "react"
import Navbar from "../components/Navbar"
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";


const Applications = () => {

  const {jobs} = useContext(AppContext);

  console.log(typeof(jobs));
     

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
     <Navbar />
     <div className="container px-4 min-h-[65vh] 2xl:px-20 my-10">
      <h2 className="text-xl font-semibold text-slate">Your Resume</h2>
      <div className="flex gap-2 mb-6 mt-3">
        {
          isEdit 
          ? 
          (<>
           <label className="flex items-center" htmlFor="resumeUpload">
            <p className="bg-light-blue text-white px-4 py-2 rounded-lg mr-2">Select Resume</p>
            <input id="resumeUpload" accept="application/pdf" type="file" hidden onChange={(e) => setResume(e.target.files[0])}/>
            <img src={assets.profile_upload_icon} alt="" />
           </label>
           <button
           onClick={() => setIsEdit(false)}
           className="bg-green-100 border border-green-400 rounded-lg px-4 py-2">Save</button>
          </>) 
          : 
          (<div className="flex gap-2">
            <a href="#" className="bg-light-blue text-white px-4 py-2 rounded-lg">Resume</a>
            <button
            onClick={() => setIsEdit(true)}
            className="text-slate border border-slate-400 rounded-lg px-4 py-2">Edit</button>
          </div>)
        }
      </div>
      <h2 className="text-xl font-semibold mb-4 text-dark-blue">Jobs Applications</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b text-left">Campagny</th>
            <th className="py-3 px-4 border-b text-left">Job Title</th>
            <th className="py-3 px-4 border-b text-left max-sm:hidden">Location</th>
            <th className="py-3 px-4 border-b text-left max-sm:hidden">Date</th>
            <th className="py-3 px-4 border-b text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {jobsApplied.map((job, index) => true ? (
            <tr key={index}>
              <td className="py-3 px-4 flex items-center gap-2 border-b"><img className="w-8 h-8" src={job.logo} alt="" /> {job.company}</td> 
              <td className="py-2 px-4 border-b">{job.title}</td>
              <td className="py-2 px-4 border-b max-sm:hidden">{job.location}</td>
              <td className="py-2 px-4 border-b max-sm:hidden">{moment(job.date).format("ll")}</td>
              <td className="py-2 px-4 border-b">
                <span className={`${job.status === "Accepted" ? "bg-green-100" : job.status === "Rejected" ? "bg-red-100" : "bg-blue-100"} px-4 py-1.5 rounded`}>{job.status}</span>
              </td>
            </tr>
          ) : (null))}
        </tbody>
      </table>
      
      {console.log(typeof(jobs))}
      
     </div>
     <Footer />
    </>
  )
}

export default Applications;
