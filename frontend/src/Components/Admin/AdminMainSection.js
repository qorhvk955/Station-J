import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminMainSection = ({userData}) => {
    let [siteData, setSiteData] = useState();

    useEffect(()=>{
        getSiteInfo();
    }, []);

    function getSiteInfo(){
        axios.get('/admin/getSiteInfo',{withCredentials:true})
        .then(response => {
            setSiteData(response.data);
        })
        .catch(error=>console.log(error));
    }


    return(
        <>
                <div className="container-fluid">
                    <div className="layout-specing">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-muted mb-1">안녕하세요 {userData.nickName}님</h6>
                                <h5 className="mb-0">대시보드</h5>
                            </div>

                            <div className="mb-0 position-relative">
                             
                            </div>
                        </div>
                    
                        <div className="row row-cols-xl-5 row-cols-md-2 row-cols-1">
                            <div className="col mt-4">
                                <a href="#!" className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3">
                                    <div className="d-flex align-items-center">
                                        <div className="icon text-center rounded-pill">
                                            <i className="uil uil-user-circle fs-4 mb-0"></i>
                                        </div>
                                        <div className="flex-1 ms-3">
                                            <h6 className="mb-0 text-muted">전체 컨텐츠 수</h6>
                                            <p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="4589">{siteData && siteData.totalContents}</span></p>
                                        </div>
                                    </div>

                                </a>
                            </div>

                            <div className="col mt-4">
                                <a href="#!" className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3">
                                    <div className="d-flex align-items-center">
                                        <div className="icon text-center rounded-pill">
                                            <i className="uil uil-usd-circle fs-4 mb-0"></i>
                                        </div>
                                        <div className="flex-1 ms-3">
                                            <h6 className="mb-0 text-muted">아카이빙 콘텐츠 수</h6>
                                            <p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="100">{siteData && siteData.totalArchiveContents}</span></p>
                                        </div>
                                    </div>


                                </a>
                            </div>
                            <div className="col mt-4">
                                <a href="#!" className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3">
                                    <div className="d-flex align-items-center">
                                        <div className="icon text-center rounded-pill">
                                            <i className="uil uil-shopping-bag fs-4 mb-0"></i>
                                        </div>
                                        <div className="flex-1 ms-3">
                                            <h6 className="mb-0 text-muted">동영상 콘텐츠 수</h6>
                                            <p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="100">{siteData && siteData.totalVideoContents}</span></p>
                                        </div>
                                    </div>

        
                                </a>
                            </div>
                            <div className="col mt-4">
                                <a href="#!" className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3">
                                    <div className="d-flex align-items-center">
                                        <div className="icon text-center rounded-pill">
                                            <i className="uil uil-store fs-4 mb-0"></i>
                                        </div>
                                        <div className="flex-1 ms-3">
                                            <h6 className="mb-0 text-muted">전체 가입자 수</h6>
                                            <p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="145">{siteData && siteData.totalMembers}</span></p>
                                        </div>
                                    </div>


                                </a>
                            </div>
                            
                            <div className="col mt-4">
                                <a href="#!" className="features feature-primary d-flex justify-content-between align-items-center rounded shadow p-3">
                                    <div className="d-flex align-items-center">
                                        <div className="icon text-center rounded-pill">
                                            <i className="uil uil-users-alt fs-4 mb-0"></i>
                                        </div>
                                        <div className="flex-1 ms-3">
                                            <h6 className="mb-0 text-muted">소셜 가입자 수</h6>
                                            <p className="fs-5 text-dark fw-bold mb-0"><span className="counter-value" data-target="145">{siteData && siteData.totalMembersFromSocial}</span></p>
                                        </div>
                                    </div>


                                </a>
                            </div>
                        </div>
                    </div>
                </div>              
        </>
    )
}
export default AdminMainSection