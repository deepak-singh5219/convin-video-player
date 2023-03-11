import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Feed from '../components/Feed';
import VideoDetails from '../components/VideoDetails';
import SelectCategory from '../components/SelectCategory';
import History from '../components/History';


const AppRoutes = () => {
  return (
    <Routes>
       <Route path="/" exact element={<Feed />} />
       <Route path="/category/:id/video/:videoId" element={<VideoDetails />} />
       <Route path="/category/:id" element={<Feed/>} />
       <Route path="/history" element={<History/>}/>
    </Routes>
  )
}

export default AppRoutes