import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";


const JobListing = () => {

  const {isSearched, searchFilter, setSearchFilter, jobs} = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories(
      prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )

  }
  const handleLocationChange = (location) => {
    setSelectedLocations(
      prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
    )
  }

  useEffect(()=>{
    const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category);
    const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location);
    const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilterJobs = jobs.slice().reverse().filter(
      job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
    )
    setFilteredJobs(newFilterJobs);
    setCurrentPage(1);
  },[jobs, selectedCategories, selectedLocations, searchFilter])

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* sidebar */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* search filter from hero component */}
        {
          isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
             <h3 className="text-slate font-medium text-lg mb-2">Current Search</h3>
             <div className="mb-4 text-dark-blue">
              {searchFilter.title && (
                <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">{searchFilter.title} 
                <img onClick={() => setSearchFilter(prev => ({...prev, title: ""}))} src={assets.cross_icon} className="cursor-pointer" alt="" />
                </span>
              )}
              {searchFilter.location && (
                <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">{searchFilter.location} 
                <img onClick={() => setSearchFilter(prev => ({...prev, location: ""}))} src={assets.cross_icon} className="cursor-pointer" alt="" />
                </span>
              )}
             </div>
            </>
          )
        }

        <button onClick={() => setShowFilter(prev => !prev)} className="w-full px-6 py-1.5 rounded border border-dark-blue lg:hidden text-dark-blue cursor-pointer mb-4">
          {showFilter ? "Close" : "Filters"}
        </button>

        {/* categories filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg mb-2 text-dark-blue">Search by Categories</h4>
          <ul className="space-y-2 text-slate">
            {JobCategories.map((category, index)=>(
              <li className="flex gap-3 items-center" key={index}>
                <input 
                onChange={() => handleCategoryChange(category)}
                checked = {selectedCategories.includes(category)}
                className="scale-125" type="checkbox" /> {category}
              </li>
            ))}
          </ul>
        </div>

        {/* location filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg mt-4 mb-2 text-dark-blue">Search by Location</h4>
          <ul className="space-y-2 text-slate">
            {JobLocations.map((location, index)=>(
              <li className="flex gap-3 items-center" key={index}>
                <input 
                onChange={() => handleLocationChange(location)}
                checked = {selectedLocations.includes(location)}
                className="scale-125" type="checkbox" /> {location}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* job listings */}
      <section className="w-full lg:w-3/4 text-slate max-lg:px-4">
        <h3 className="text-3xl font-medium mb-2" id="job-list">Latest Jobs</h3>
        <p className="mb-8">Get your desired job from top Campanies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
         {
          filteredJobs.slice((currentPage -1) * 6, currentPage * 6).map((job, index)=>(
            <JobCard job={job} key={index}/>
          ))
         } 
        </div>
        {/* pagination */}

         {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list"><img onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)} src={assets.left_arrow_icon} className="mr-4" alt="" /></a>
            {Array.from({length: Math.ceil(filteredJobs.length / 6)}).map((__, index)=>(
              <a href="#job-list" key={index}>
                <button 
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h10 flex items-center justify-center border border-gray-300 cursor-pointer rounded ${currentPage === index + 1 ? "bg-light-blue text-white" : "text-slate"}`}>{index + 1}</button>
              </a>
            ))}
            <a href="#job-list" className=""><img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} className="ml-4" alt="" /></a>
          </div>
          )}

      </section>
    </div>
  )
}

export default JobListing;
