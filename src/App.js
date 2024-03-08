import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import { Routes,Route } from 'react-router-dom';
import Discover from './Pages/Discover';
import CategoricalData from './Pages/CategoricalData';
import DiscoverImg from './Pages/DiscoverImg';
import Profile from './Pages/Profile';
import Liked from './Pages/Liked';
import Login from './Pages/Login';
import Auth from './Auth/Auth';
import VideoPlayById from './Pages/VideoPlayById';

function App() {
  return (
   <>
    <div>
    <Routes>
      <Route path='/' element={<Auth><Home/></Auth>}/>
      <Route path='/discover' element={<Auth><Discover/></Auth>}/>
      <Route path='/category/:id' element={<Auth><CategoricalData/></Auth>}/>
      {/* <Route path='/discoverimg' element={<DiscoverImg/>}/> */}
      <Route path='/liked' element={<Auth><Liked/></Auth>}/>
      <Route path='/profile' element={<Auth><Profile/></Auth>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/videoPlayById/:id' element={<VideoPlayById/>}/>

    </Routes>
    </div>
   </>
  );
}

export default App;
