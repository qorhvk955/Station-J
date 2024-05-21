import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProtectedRoute from './Service/ProtectedRoute';

import Home from './Pages/Home';
import Admin from './Pages/Admin'
import ScrollToTop from './Components/Home/ScrollToTop';

import Login from './Components/Home/LogIn/Login';
import Logout from './Components/Home/LogIn/Logout';
import SignUp from './Components/Home/SignUp/SignUp'
import SignUpSocialForm from './Components/Home/SignUp/SignUpSocialForm';
import RecoverPassword from './Components/Home/LogIn/RecoverPassword';
import ResetPassword from './Components/Home/LogIn/ResetPasswordForm'





function App() {
    let navigate = useNavigate();

    let [csrfToken, setCsrfToken] = useState(null);
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

    let [userRole, setUserRole] = useState('');
    let [userData, setUserData] = useState(null);
    useEffect(()=>{
        axios.get('/api/csrf-token', { withCredentials: true })
        .then(response => {
            setCsrfToken(response.data.token); // 서버로부터 받은 CSRF 토큰
          axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken; // 모든 요청에 CSRF 토큰 설정
        })
        .catch(error => console.error('Error fetching CSRF token', error));

        axios.get('/userAuthentication', {withCredentials:true})
              .then(response => {
                  if(response.data !== ""){
                      if(!response.data.success){
                        alert(response.data.message);
                        navigate('/info/editinfo');
                    }else{
                        setUserRole(response.data.memberInfo.roleSet[response.data.memberInfo.roleSet.length-1]);
                        setUserData(response.data.memberInfo);
                    }
                }else{
                    setUserData(null);
                }
    })
  .catch();
  }, []);

  return (
    <div className="App">
        <Routes>
            <Route path="/*" element={<Home userRole={userRole} userData={userData}/>} />

            {/* 유저관련 컴포넌트 */}
            <Route path="/login" csrfToken={csrfToken} element={<Login/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/info/editinfo" element={<SignUpSocialForm/>}/>
            <Route path="/recoverPassword" element={<RecoverPassword/>}/>
            <Route path="/resetPassword" element={<ResetPassword/>}/>

            <Route path='/admin/*' element={
                userRole ? (
                    <ProtectedRoute userRole={userRole}>
                        <Admin userRole={userRole} userData={userData}/>
                    </ProtectedRoute>
                ) : (<></>)
            }/>
            </Routes>
        <ScrollToTop />
    </div>
  );
}

export default App;
