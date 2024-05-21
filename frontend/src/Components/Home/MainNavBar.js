import React from 'react';
import { useNavigate } from 'react-router-dom';


function MainNavbar({userRole, userData}){
    let navigate = useNavigate();

    const handleNavLinkClick = (event, targetId) => {
        event.preventDefault(); // 페이지 리로드 방지
        const element = document.getElementById(targetId);
        if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100; // 보정값 적용
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        } else {
            console.log("Element not found:", targetId); // 요소가 없을 경우 콘솔에 로그 출력
        }
    }

    return (
        <>
        <header id="topnav" className="defaultscroll sticky navbar-white-bg">
            <div className="container">
                <a style={{ cursor: 'pointer' }} className="logo" onClick={()=>{navigate('/'); window.scrollTo(0, 0);}}>
                    <img src="./assets/images/logo-small.png" height="32" className="logo-light-mode" alt="" />
                </a>
                <ul className="buy-button list-inline mb-0">
                    {!userData &&<a onClick={()=>navigate('/login')} className="btn btn-primary"  style={{ marginRight: '5px' }}> 로그인 </a>}
                    {!userData && <a onClick={()=>navigate('/signup')} className="btn btn-primary" style={{ marginRight: '5px' }}> 회원가입 </a>}
                    {userData && <span style={{marginRight : '15px'}}><span style={{fontWeight:'900'}}>{userData.nickName}</span>님</span>}
                    {userData && userData.roleSet.some(role => ["ROLE_ADMIN", "ROLE_SUBADMIN", "ROLE_STAFF"].includes(role)) && (
                    <a onClick={() => navigate('/admin')} className="btn btn-primary" style={{ marginRight: '5px' }}>어드민 페이지</a>
                    )}
                    {userData && <a onClick={()=>navigate('/logout')} className="btn btn-primary" style={{ marginRight: '5px' }}> 로그아웃 </a>}
                </ul>
    
                <div id="navigation">
                    <ul className="navigation-menu">
                        <li><a href="#" onClick={(e) => handleNavLinkClick(e, 'carouselExampleInterval')} className="sub-menu-item">Home</a></li>
                        <li><a href="#" onClick={(e) => handleNavLinkClick(e, 'VR')} className="sub-menu-item">VR 아카이빙</a></li>
                        <li><a href="#" onClick={(e) => handleNavLinkClick(e, 'VIDEO')} className="sub-menu-item">영상 게시판</a></li>
                        <li><a href="#" onClick={(e) => handleNavLinkClick(e, 'VIEW_MAP')} className="sub-menu-item">디지털 조감도</a></li>
                    </ul>
                </div>
            </div>
        </header>
        </>
    );
};

export default MainNavbar;
