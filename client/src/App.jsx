
import './App.css'
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Applications from './pages/Applications';
import ApplyJob from './pages/ApplyJob';
import RecruiterLogin from './components/RecruiterLogin';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';

function App() {

  const {showRecruiterLogin} = useContext(AppContext);

  return (
    <div>
     { showRecruiterLogin && <RecruiterLogin  /> }
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/apply-job/:id' element={<ApplyJob />} />
      <Route path='/applications' element={<Applications />} />
     </Routes>
    </div>
  )
}

export default App;
