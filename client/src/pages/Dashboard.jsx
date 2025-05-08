import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";


const Dashboard = () => {

  const navigate = useNavigate();

  const {companyData, setCompanyData, setCompanyToken} = useContext(AppContext);
  
  // logout function company
  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
  } 

  useEffect(()=>{
    if(companyData){
      navigate("/dashboard/manage-jobs");
    }
  },[companyData]);

  return (
    <div className="min-h-screen">
      {/* navbar for recruiter panel */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
        <Link to="/">
        <h1 className='text-light-blue text-3xl font-bold'>
          <span className='text-dark-blue'>H</span>ire <span className='text-slate text-xl'>me</span>
        </h1>
        </Link>  
          {companyData && (
            <div className="flex items-center gap-3">
          <p className="max-sm:hidden text-slate text-sm">Welcome, {companyData.name}</p>
          <div className="relative group">
            <img src={companyData.image} className="w-8 rounded-full border border-light-blue" alt="" />
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-slate rounded pt-12">
              <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                <li onClick={logout} className="py-1 px-2 cursor-pointer pr-10">Logout</li>
              </ul>
            </div>
          </div>
            </div>
          )}
        </div>
      </div>
      {/* sidebar */}
      <div className="flex items-start">
        {/* left side */}
       <div className="inline-block min-h-screen border-r border-gray-200">
        <ul className="flex flex-col items-start pt-5 text-slate">
          <NavLink 
          className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && "bg-blue-100 border-r-4 border-light-blue"}`} 
          to="/dashboard/add-job">
           <img src={assets.add_icon} className="min-w-4" alt="" />
           <p className="max-sm:hidden">Add Job</p>
          </NavLink>
          <NavLink 
          className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && "bg-blue-100 border-r-4 border-light-blue"}`} 
          to="/dashboard/manage-jobs">
           <img src={assets.home_icon} className="min-w-4" alt="" />
           <p className="max-sm:hidden">Manage Jobs</p>
          </NavLink>
          <NavLink 
          className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && "bg-blue-100 border-r-4 border-light-blue"}`} 
          to="/dashboard/view-applications">
           <img src={assets.person_tick_icon} className="min-w-4" alt="" />
           <p className="max-sm:hidden">View Applications</p>
          </NavLink>
        </ul>
       </div>
       <div className="">
        <Outlet />
       </div>
      </div>
    </div>
  )
}

export default Dashboard;
