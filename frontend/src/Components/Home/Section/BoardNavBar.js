import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainNavbar({userRole, userData}){
    let navigate = useNavigate();

    return (
        <>
        <header id="topnav" className="defaultscroll sticky navbar-white-bg">
            <div className="container">
                <a style={{ cursor: 'pointer' }} className="logo" onClick={()=>navigate('/')}>
                    <img src={`${process.env.PUBLIC_URL}/assets/images/logo-small.png`} height="32" className="logo-light-mode" alt=".." />
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
            </div>
        </header>
        </>
    );
};

export default MainNavbar;
