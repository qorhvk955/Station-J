import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import AdminMainSection from "../Components/Admin/AdminMainSection";
import AdminTopHeader from "../Components/Admin/AdminTopHeader";
import AdminSidebar from "../Components/Admin/AdminSideBar";
import AdminFooter from"../Components/Admin/AdminFooter";
import AccountManagement from '../Components/Admin/AccountManagement/AccountManagement';
import ModifyMember from "../Components/Admin/AccountManagement/ModifyMember";
import ArchiveContentManagement from '../Components/Admin/ContentManagement/ArchiveContentManagement'
import VideoContentManagement from '../Components/Admin/ContentManagement/VideoContentManagement'


function Admin({userRole, userData}){

    return(
        <>
        <div className="page-wrapper toggled">
            <AdminSidebar /> 
            <div className="page-content bg-light">
                <AdminTopHeader />
                <Routes>
                    {/* 대시보드관련 컴포넌트 */}
                    <Route path='/' element={<AdminMainSection userData={userData}/>}/>
                    <Route path='/contentManagement' element={
                        <ProtectedComponent rolesRequired={["ROLE_STAFF", "ROLE_SUBADMIN", "ROLE_ADMIN"]} userRole={userRole}>
                            <Outlet />
                        </ProtectedComponent>}>                   
                        <Route path='archive' element={<ArchiveContentManagement />} />                        
                        <Route path='video' element={<VideoContentManagement />} />
                    </Route>

                    <Route path='/accountManagement' element={
                        <ProtectedComponent rolesRequired={["ROLE_ADMIN"]} userRole={userRole}>
                            <Outlet />
                        </ProtectedComponent>}>                        
                        <Route index element={<AccountManagement />} />                        
                        <Route path='modifyMember/:num' element={<ModifyMember />} />
                    </Route>
                </Routes>
            </div>
        </div>
        </>
    )
}

function ProtectedComponent({ rolesRequired, userRole, children }) {

    if (!rolesRequired.includes(userRole)) {
        alert('권한이 없습니다. 관리자에게 문의해주세요.');
        return <Navigate to="/admin" replace />;
    }

    return children;
}

export default Admin;