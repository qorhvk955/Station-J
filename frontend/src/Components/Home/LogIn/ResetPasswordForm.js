import React from "react";
import { useState } from "react";
import axios from "axios";

function SignUpForm(){

    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    
    let handlePasswordChange = (e) => setPassword(e.target.value);
    let handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    let [errorMsg, setErrorMsg] = useState({
        passwordErrorMsg : '',
        confirmPasswordErrorMsg : '',
    });
    

    // 비밀번호 유효성체크
    function pwCheck(){
        setErrorMsg((msg)=> ({
            ...msg,
            passwordErrorMsg : ''
        }));
        if(password === ""){
            setErrorMsg((msg)=> ({
                ...msg,
                passwordErrorMsg : '비밀번호는 필수정보입니다.'
            }));
            return false;
        }

        // let regex = new RegExp('^[a-z]+[a-z0-9]{1,12}');
        // if(!regex.test(id)){
        //     setIdErrorMsg('아이디는 영소문자, 숫자로만 입력해주세요.');
        //     return false;
        // }
    }

    // 비밀번호 유효성체크
    function pwConfirmCheck(){
        setErrorMsg((msg)=> ({
            ...msg,
            confirmPasswordErrorMsg : ''
        }));
        if(confirmPassword !== password){
            setErrorMsg((msg)=> ({
                ...msg,
                confirmPasswordErrorMsg : '비밀번호가 일치하지 않습니다.'
            }));
            return false;
        }
    }


    // 회원가입 데이터 유효성체크
    function register(){
        if(password !== confirmPassword){
            setErrorMsg((msg)=> ({
                ...msg,
                confirmPasswordErrorMsg : '비밀번호가 일치하지 않습니다.'
            }));
            return false;
        }

        axios.post('/recover/resetPassword', null, {
            params : {
                'password' : password
            }})
        .then(response=>{
            if(response.data.success){
                alert(response.data.messages.result);
                window.location.href=response.data.redirectUrl;
            }else{
                alert(response.data.messages.result);
                window.location.href=response.data.redirectUrl;
            }
        })
        .catch(error =>{
            alert('잘못된 접근입니다.');
        });
    }

    return(
        <div>   

        <section className="bg-auth-home d-table w-100">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7 col-md-6">
                        <div className="me-lg-5">   
                            <img src="../assets/images/user/signup.svg" className="img-fluid d-block mx-auto" alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6">
                        <div className="card shadow rounded border-0">
                            <div className="card-body">
                                <h4 className="card-title text-center">비밀번호수정</h4>  
                                <form className="login-form mt-4">
                                    <div className="row">
                                    <p className="text-muted">새로 변경할 비밀번호를 입력해주세요.</p>
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">비밀번호 <span className="text-danger">*</span></label>
                                                <div className="form-icon position-relative">
                                                    <i data-feather="key" className="fea icon-sm icons"></i>
                                                    <input type="password" id='password' onChange={handlePasswordChange} onBlur={pwCheck} className="form-control ps-5" placeholder="비밀번호를 입력해주세요." required=""/>
                                                    {errorMsg.passwordErrorMsg && (<span style={{ color: 'red', fontSize:'12px', display:'inline-block' }}>{errorMsg.passwordErrorMsg}</span>)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">비밀번호 확인 <span className="text-danger">*</span></label>
                                                <div className="form-icon position-relative">
                                                    <i data-feather="key" className="fea icon-sm icons"></i>
                                                    <input type="password" id='confirmPassword' onChange={handleConfirmPasswordChange} onBlur={pwConfirmCheck} className="form-control ps-5" placeholder="비밀번호를 한번 더 입력해주세요." required=""/>
                                                    {errorMsg.confirmPasswordErrorMsg && (<span style={{ color: 'red', fontSize:'12px', display:'inline-block' }}>{errorMsg.confirmPasswordErrorMsg}</span>)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="d-grid">
                                                <button type='button' onClick={register} className="btn btn-primary">수정하기</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>

        <script src="assets/libs/feather-icons/feather.min.js"></script>
        <script src="assets/js/plugins.init.js"></script>
        <script src="assets/js/app.js"></script>
        </div>
    );
}

export default SignUpForm;