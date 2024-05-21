
import React from 'react';
import Home from './Pages/Home';
import ArchiveBoard from './Pages/ArchiveBoard';
import Video from './Pages/Video';


import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import ArchiveDetail from './Pages/ArchiveDetail';
import VideoDetail from './Pages/VideoDetail';
import Login from './Pages/Login';
import DashMain from './Pages/DashMain';
import DashArchiveContent from './Pages/DashArchiveContent';
import DashVideoContent from './Pages/DashVideoContent';
import DashAccountManagement from './Pages/DashAccountManagement';
import DashAccountPermissions from './Pages/DashAccountPermissions';








function App() {
  return (
    <div className="App">          
      <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/archive" element={ <ArchiveBoard />} />
          <Route path="/video" element={ <Video />} />
          <Route path="/archiveDetail/:id" element={ <ArchiveDetail />} />
          <Route path="/videoDetail/:id" element={ <VideoDetail />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/dash" element={ <DashMain />} />
          <Route path="dash/content/archive" element={ <DashArchiveContent />} />
          <Route path="/dash/content/video" element={ <DashVideoContent />} />
          <Route path="/dash/account/management" element={ <DashAccountManagement />} />
          <Route path="/dash/account/permissions" element={ <DashAccountPermissions />} />






      </Routes>
      {/* <Footer /> */}
      <ScrollToTop />
    </div>
  );
}

export default App;
