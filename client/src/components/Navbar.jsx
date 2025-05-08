import React, { useContext } from 'react';
import {Link} from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Navbar = () => {

  // const {openSignIn} = useClerk();
  // const {user} = useUser();
  const user = true;
  const {setShowRecruiterLogin} = useContext(AppContext);

  return (
    <div>
      <div className="shadow py-4">
        <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <Link to="/">
        <h1 className='text-light-blue text-3xl font-bold'>
          <span className='text-dark-blue'>H</span>ire <span className='text-slate text-xl'>me</span>
        </h1>
        </Link>  
        {user 
        ? 
        (<div className='flex items-center gap-3'>
          <Link to={"/applications"} className='text-light-blue'>Applied Jobs</Link>
          {/* <p></p> */}
          {/* <p>Hi, {user.firstName+ " "+user.lastName}</p> */}
          <p className='max-sm:hidden'>Hi, {user.firstName}</p>
          <img src={assets.person_icon}  alt="" />
        </div>) 
        : 
        (<div className="flex gap-4 max-sm:text-sm">
          <button 
          onClick={() => setShowRecruiterLogin(true)}
          className="text-slate-500 text-sm cursor-pointer">Recruiter Login</button>
          <button className="bg-[#11a8e8] text-white px-6 py-2 rounded-full text-sm cursor-pointer">Login</button>
        </div>)
        }
        </div>
      </div>
    </div>
  )
}

export default Navbar;
