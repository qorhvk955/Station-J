import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const LoginForm = ({csrfToken}) => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [rememberOption, setRememberOption] = useState(false);

    // let getChangeOnUsername = (e)=>{e.target.value};
    // let getChangeOnPassword = (e)=>{e.target.value};

    useEffect(()=>{
        let rememberUsername = Cookies.get('rememberedUsername');
        if(rememberUsername){
            setUsername(rememberUsername);
            setRememberOption(true);
        }
    }, []);
    
    let handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };

    let handleRememberUsernameChange = (event) => {
        setRememberOption(event.target.checked);
      };

    function submitSignIn(){
        let params = new URLSearchParams();
        params.append('username', document.getElementById('username').value);
        params.append('password', document.getElementById('password').value);
        params.append('rememberUsername', document.getElementById('rememberUsername').checked);
        params.append('_csrf', csrfToken);

        axios.post('/signin', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        })
        .then(response=>{
            if(response.data.success){
                window.location.href=response.data.redirectUrl;
            }else{
                alert(response.data.message);
            }
        })
        .catch(error => console.log(error));

    }

    function oAuthUser(serviceName){
        window.location.href='http://localhost:8080/oauth2/authorization/' + serviceName;
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        submitSignIn();
    }
    return(
        <>

            <section className="bg-home d-flex align-items-center" style={{backgroundImage : "url('assets/images/bg-form.jpg')"}}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-7 col-md-6">
                                    <div className="me-lg-5" >   
                                    <img src="assets/images/logo-big.png" className="img-fluid d-block mx-auto" alt=""/>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-6">
                                    <div className="card login-page shadow rounded border-0">
                                        <div className="card-body">
                                            <h4 className="card-title text-center">로그인</h4>  
                                            <form className="login-form mt-4" onSubmit={handleFormSubmit}>
                                                <input type="hidden" name="_csrf" value={`${csrfToken}`}/>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">아이디 <span className="text-danger">*</span></label>                                
                                                            <div className="form-icon position-relative">
                                                                <i data-feather="user" className="fea icon-sm icons"></i>
                                                                <input type="text" value={username} onChange={handleUsernameChange} className="form-control ps-5" placeholder="아이디를 입력해주세요" name="username" id="username" required="" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">비밀번호 <span className="text-danger">*</span></label>
                                                            <div className="form-icon position-relative">
                                                                <i data-feather="key" className="fea icon-sm icons"></i>
                                                                <input type="password" className="form-control ps-5" placeholder="비밀번호를 입력해주세요" id="password" required="" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="mb-3">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" id="rememberUsername" checked={rememberOption} onChange={handleRememberUsernameChange} />
                                                                    <label className="form-check-label">아이디 기억하기</label>
                                                                </div>
                                                            </div>
                                                            <p className="forgot-pass mb-0"><Link to='/recoverPassword' className="text-dark fw-bold">비밀번호 찾기</Link></p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 mb-0">
                                                        <div className="d-grid">
                                                            <button type="submit" className="btn btn-primary">로그인</button>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 mt-4 text-center">
                                                        <h6>이미 아이디가 있으신가요?</h6>
                                                        <div className="row">
                                                            <div className="col-6 mt-3">
                                                                <div className="d-grid">
                                                                    <a onClick={()=>{oAuthUser('google')}} className="btn btn-light"><i className="mdi mdi-google text-danger"></i> Google</a>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 mt-3">
                                                                <div className="d-grid">
                                                                    <a onClick={()=>{oAuthUser('kakao')}} className="btn btn-light"><img src="./assets/images/client/kakao-logo.png" height="15" className="logo-light-mode" alt=""/> Kakao</a>
                                                                </div>
                                                            </div>                           
                                                        </div>
                                                    </div>

                                                    <div className="col-12 text-center">
                                                        <p className="mb-0 mt-3"><small className="text-dark me-2">아이디가 없으신가요?</small> <Link to='/signup' className="text-dark fw-bold">가입하기</Link></p>
                                                        <p className="mb-0 mt-3"><Link to='/'className="text-dark fw-bold">메인으로 돌아가기</Link></p>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        
                    </section>
        </>
    );
}

export default LoginForm;