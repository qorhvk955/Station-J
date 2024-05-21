import React from "react";
import { Routes, Route } from 'react-router-dom';


import MainSection from '../Components/Home/MainSection';
import BoardSection from '../Components/Home/Section/BoardSection';
import Footer from '../Components/Home/Footer'


function Home({userRole, userData}){
    return(
        <>
            {/* 섹션관련 컴포넌트 */}
            <Routes>
                <Route path="/" element={<MainSection userRole={userRole} userData={userData} />}/>
                <Route path="/board/*" element={<BoardSection userRole={userRole} userData={userData} />}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default Home;