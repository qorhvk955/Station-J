import { Route, Routes } from 'react-router-dom';

import ArchiveBoard from './Archive/ArchiveBoard';
import VideoBoard from './Video/VideoBoard';
import VideoDetailSection from './Video/VideoDetailSection'
import ArchiveDetailSection from './Archive/ArchiveDetailSection';
import SearchBoard from './Search/SreachBoard';
import BoardNavBar from './BoardNavBar';

function BoardSection({userRole, userData}){

    return(
        <>
            <BoardNavBar userRole={userRole} userData={userData}/>
            <Routes>
                <Route path="/archive/" element={<ArchiveBoard />}/>
                <Route path="/archive/detail/:boardNo" element={<ArchiveDetailSection />}/>
                <Route path="/video/" element={<VideoBoard />}/>
                <Route path="/video/detail/:boardNo" element={<VideoDetailSection />}/>
                <Route path="/search/:searchQuery" element={<SearchBoard />}/>
            </Routes>
        </>
    )
}

export default BoardSection;