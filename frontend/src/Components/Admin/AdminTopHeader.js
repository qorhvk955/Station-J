import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const AdminTopHeader = () => {
    let navigate = useNavigate();
    return(
        <>
            <div className="top-header">
                    <div className="header-bar d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            <a href="/admin" className="logo-icon me-3">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/logo-icon.png`} height="30" className="small" alt="" />
                                <span className="big">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/logo-small.png`} height="24" className="logo-light-mode" alt="" />
                                </span>
                            </a>
                            {/* 사이드바 열고 닫기 버튼 */}
                            <a id="close-sidebar" className="btn btn-icon btn-soft-light" onClick={()=>navigate('/admin')}>
                                <i className="ti ti-menu-2"></i>
                            </a>
                            <div className="search-bar p-0 d-none d-md-block ms-2">
                            </div>
                        </div>

                        <ul className="list-unstyled mb-0">         
                            <li className="list-inline-item mb-0 ms-1">
                                <Link to='/' className="btn btn-primary"  style={{ marginRight: '5px' }}>홈페이지</Link>
                                <Link to='/logout' className="btn btn-primary"  style={{ marginRight: '5px' }}>로그아웃</Link>
                            </li>
                        </ul>
                    </div>
                </div>
        </>
    )
}
export default AdminTopHeader