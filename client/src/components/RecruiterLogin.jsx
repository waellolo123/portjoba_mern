import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const RecruiterLogin = () => {


  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [image, setImage] = useState(false);

  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const {setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData} = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(state === "Register" && !isTextDataSubmitted){
      return setIsTextDataSubmitted(true);
    }
    try {
    if(state === "Login"){
      const {data} = await axios.post(backendUrl + "/api/company/login", {email, password});
      if(data.success){
        setCompanyData(data.company);
        setCompanyToken(data.token);
        localStorage.setItem("companyToken", data.token);
        setShowRecruiterLogin(false);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);
      const {data} = await axios.post(backendUrl + "/api/company/register", formData);
      if(data.success){
        console.log(data, "registered user");
        setCompanyData(data.company);
        setCompanyToken(data.token);
        localStorage.setItem("companyToken", data.token);
        setShowRecruiterLogin(false);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } 
  } catch (error) {
    toast.error(error.message);
  }
  } 

  useEffect(()=>{
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    }
  },[])

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-black/60 flex justify-center items-center">
      <form onSubmit={onSubmitHandler} className="relative bg-white p-10 rounded-xl text-slate">
        <h1 className="text-center text-2xl text-light-blue font-medium">Recruiter {state}</h1>
        {
          state === "Login" && isTextDataSubmitted ? (
            <p className="text-sm text-center">Welcome back! Please sign in to continue</p>
          ) : (
            <p className="text-sm text-center">Create Your Recruiter Account</p>
          )
        }
        {state === "Register" && isTextDataSubmitted 
        ? 
        <>
         <div className="flex items-center gap-4 my-10">
          <label htmlFor="image">
            <img 
            src={image ? URL.createObjectURL(image) : assets.upload_area} 
            className="w-16 h-16 object-cover rounded-full" alt="" />
            <input onChange={(e) => setImage(e.target.files[0])} id="image" type="file" hidden />
          </label>
          <p>Upload Campany <br />logo</p>
         </div>
        </> 
        : 
        (<>
         {state !== "Login" && (
         <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.person_icon} alt="" />
          <input 
          onChange={(e) => setName(e.target.value)} value={name}
          type="text" placeholder="Campany Name" required 
          className="outline-none text-sm"
          />
         </div>
         )}
         <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="" />
          <input 
          onChange={(e) => setEmail(e.target.value)} value={email}
          type="email" placeholder="Email Id" required 
          className="outline-none text-sm"
          />
         </div>
         <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.lock_icon} alt="" />
          <input 
          onChange={(e) => setPassword(e.target.value)} value={password}
          type="text" placeholder="Password" required 
          className="outline-none text-sm"
          />
         </div>
        </>)
        }
        {
          state === "Login" ? (
            <p className="text-sm text-light-blue mt-1">Forgot Password?</p>
          ) : null
        }
        <button type="submit" className="bg-light-blue text-white mt-4 w-full px-4 py-2 rounded-full">
          {state === "Login" ? "Login" : isTextDataSubmitted ? "Create Account" : "Next"}
        </button>
        {
          state === "Login" ? (
            <p className="text-slate text-sm text-center mt-2">Don't have an Account? 
            <span onClick={() => setState("Register")} className="text-light-blue font-medium underline cursor-pointer"> Sign Up</span>
            </p>
          ) : (
            <p className="text-slate text-sm text-center mt-2">Already have an Account? 
            <span onClick={() => setState("Login")} className="text-light-blue font-medium underline cursor-pointer"> Login</span>
            </p>
          )
        }
        <img
        onClick={() => setShowRecruiterLogin(false)}
        src={assets.cross_icon} className="absolute top-2 right-2 cursor-pointer bg-gray-200 p-2 rounded-full" alt="" />
      </form>
    </div>
  )
}

export default RecruiterLogin;
