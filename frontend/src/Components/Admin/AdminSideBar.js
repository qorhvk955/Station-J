import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const DashSidebar = () => {

    const navigate = useNavigate();

    const [contentOpen, setContentOpen] = useState(false);
    const [masterDataOpen, setMasterDataOpen] = useState(false);
    const [accountManagement, setAccountManagement] = useState(false);


    const toggleDropdown = (toggleMenu) => {
        switch(toggleMenu){
            case 'content':
                setContentOpen(!contentOpen);
                break;
            case 'masterData':
                setMasterDataOpen(!masterDataOpen);
                break;
            case 'accountManagement':
                setAccountManagement(!accountManagement);
                break;
            default:
                break;
        }
    }

    return(
        <nav id="sidebar" className="sidebar-wrapper sidebar-dark">
            <div className="sidebar-content" data-simplebar style={{height: `calc(100% - 60px)`}}>
                <div className="sidebar-brand">
                    <a>
                        <span className="sidebar-colored">
                            <img style={{cursor:'pointer'}} onClick={()=>navigate('/admin')} src={`${process.env.PUBLIC_URL}/assets/images/logo-small-white.png`} height="35" alt="" />
                        </span>
                    </a>
                </div>
    
                <ul className="sidebar-menu">
                    <li className="sidebar-dropdown">
                        <Link to=''><i className="ti ti-home me-2"></i>대시보드</Link>
                        <div className="sidebar-submenu">
                            <ul>
                                <li><a href="index.html">통계데이터</a></li>
                            </ul>
                        </div>
                    </li>

                    <li className="sidebar-dropdown">
                        <Link onClick={() => toggleDropdown('content')}>
                            <i className="ti ti-brand-youtube me-2"></i>콘텐츠 관리
                        </Link>
                        {contentOpen && (
                            <div className="sidebar-submenu" style={{ all: "unset" }}>
                                <ul>
                                    {/* <li><a>아카이브 콘텐츠</a></li> */}
                                    <li><a style={{ cursor: 'pointer' }} onClick={()=>navigate('contentManagement/archive')}>VR 콘텐츠</a></li>
                                    {/* <li><a href="blog(AR).html">AR 콘텐츠</a></li> */}
                                    <li><a style={{ cursor: 'pointer' }} onClick={()=>navigate('contentManagement/video')}>동영상 콘텐츠</a></li>

                                    
                                </ul>
                            </div>
                        )}
                    </li>
                   
                    <li className="sidebar-dropdown">
                        <Link onClick={() => toggleDropdown('masterData')}>
                            <i className="ti ti-address-book me-2"></i>기준정보 관리</Link>
                        {masterDataOpen && (
                            <div className="sidebar-submenu" style={{ all: "unset" }}>
                                <ul>
                                    <li><a>내용을 추가하세요</a></li>
                                    <li><a>내용을 추가하세요</a></li>
                                    <li><a>내용을 추가하세요</a></li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li className="sidebar-dropdown">
                    <Link onClick={() => toggleDropdown('accountManagement')}>
                        <i className="ti ti-users me-2"></i>계정 관리</Link>
                        {accountManagement && (
                                <div className="sidebar-submenu" style={{ all: "unset" }}>
                                    <ul>
                                        <li><a style={{ cursor: 'pointer' }} onClick={()=>navigate('accountManagement')}>권한 콘텐츠</a></li>
                                    </ul>
                                </div>
                            )}





                        <div className="sidebar-submenu">
                            <ul>
                                <li><a href="invoice-list.html">계정 권한 관리</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>              
            </div>                  
        </nav>  
    )
}

export default DashSidebar;
