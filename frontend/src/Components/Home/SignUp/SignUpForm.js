import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignUpForm(){
    let [id, setId] = useState("");
    let [password, setPassword] = useState("");
    let [nickName, setNickName] = useState("");
    let [email, setEmail] = useState("");
    let [agreement, setAgreement] = useState(false);

    let [checkedId, setCheckedId] = useState("");
    let [isIdChecked, setIsIdChecked] = useState(false);
    let [checkedEmail, setCheckedEmail] = useState("");
    let [isEmailChecked, setIsEmailChecked] = useState(false);
    let [isEmailVerificated, setIsEmailVerificated] = useState(false);
    let [authCode, setAuthCode] = useState('');

    let handleIdChange = (e) => setId(e.target.value);
    let handlePasswordChange = (e) => setPassword(e.target.value);
    let handleNickNameChange = (e) => setNickName(e.target.value);
    let handleEmailChange = (e) => setEmail(e.target.value);
    let handleAuthCodeChange = (e) => setAuthCode(e.target.value);
    let handleAgreementChange = (e) => setAgreement(e.target.checked);

    let [errorMsg, setErrorMsg] = useState({
        idErrorMsg : '',
        passwordErrorMsg : '',
        nickNameErrorMsg : '',
        emailErrorMsg : '',
        isEmailVerificatedErrorMsg : '',
        agreementErrorMsg : '',
    });

    // 아이디 유효성체크 & 중복체크
    function idCheck(){
        errorMsg.idErrorMsg = '';
        if(id === ""){
            setErrorMsg((msg)=> ({
                ...msg,
                idErrorMsg : '아이디는 필수정보입니다.'
            }));
            return false;
        }

        let regex = new RegExp('^[a-z][a-z0-9]{1,12}$');
        if(!regex.test(id)){
            setErrorMsg((msg)=> ({
                ...msg,
                idErrorMsg : '아이디는 영소문자, 숫자로만 입력해주세요.'
            }));
            return false;
        }

        axios.get('/signup/idcheck/' + id)
        .then(response => {
            if(response.data.success){
                setCheckedId(response.data.payload);
                setIsIdChecked(true);
                return true;
            }else{
                setErrorMsg((msg)=> ({
                    ...msg,
                    idErrorMsg : response.data.message
                }));
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

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

    // 닉네임 유효성체크 & 중복체크
    function nickNameCheck(){
        setErrorMsg((msg)=> ({
            ...msg,
            nickNameErrorMsg : ''
        }));
        if(nickName === ""){
            setErrorMsg((msg)=> ({
                ...msg,
                nickNameErrorMsg : '닉네임은 필수정보입니다.'
            }));
            return false;
        }

        let regex = new RegExp('^[가-힣a-zA-Z0-9]+$');
        if(!regex.test(nickName)){
            setErrorMsg((msg)=> ({
                ...msg,
                nickNameErrorMsg : '닉네임은 한글, 영문자, 숫자로만 구성해주세요.'
            }));
            return false;
        }
    }

    // 이메일 유효성체크 & 중복체크
    function emailCheck(){
        setErrorMsg((msg)=> ({
            ...msg,
            emailErrorMsg : ''
        }));
        if(email === ""){
            setErrorMsg((msg)=> ({
                ...msg,
                emailErrorMsg : '이메일은 필수정보입니다.'
            }));
            return false;
        }

        let regex = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$');
        if(!regex.test(email)){
            setErrorMsg((msg)=> ({
                ...msg,
                emailErrorMsg : '올바른 이메일 형식이 아닙니다.'
            }));
            return false;
        }

        axios.get('/signup/emailcheck/' + email)
        .then(response => {
            if(response.data.success){
                setCheckedEmail(response.data.payload);
                setIsEmailChecked(true);
                return true;
            }else{
                setErrorMsg((msg)=> ({
                    ...msg,
                    emailErrorMsg : response.data.message
                }));
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    // 이메일 인증 코드 전송
    function emailVerificate(){
        console.log('checkedEmail : ' + checkedEmail);
        console.log('inputEmail : ' + email);
        if(!isEmailChecked || checkedEmail == ''){
            setErrorMsg((msg)=> ({
                ...msg,
                emailVerificatedErrorMsg : '이메일 입력을 확인해주세요.'
            }));
        }else{
            alert('이메일로 전송된 인증코드를 입력해주세요.');
            axios.post('/signup/email/verification-requests', null,{
                params : {
                    'checkedEmail' : checkedEmail
                }
            })
            .catch(error=>{
                console.log(error);
            });
        }
    }

    // 이메일 인증 코드 확인
    function codeVerificate(){
        if(checkedEmail != email){
            alert('올바른 접근이 아닙니다.');
        }else if(authCode === ''){
            alert('이메일로 전송된 인증코드를 입력해주세요.');
        }else{
            axios.post('/signup/email/verifications', null, {
                params : {
                    'checkedEmail' : checkedEmail,
                    'authCode' : authCode
                }
            })
            .then(response=>{
                if(response.data.success){
                    alert(response.data.message);
                    setIsEmailVerificated(true);
                }else{
                    alert(response.data.message);
                }
            })
            .catch(error=>{
                console.log(error);
            });
        }
    }

    // 회원가입 데이터 유효성체크
    function register(){
        let memberInfo = {
            'id' : id,
            'password' : password,
            'nickName' : nickName,
            'email' : email,
            'agreement' : agreement,
            'isEmailVerificated' : isEmailVerificated
        };
        console.log(memberInfo);
        if(checkedId != id){
            alert('아이디 중복체크를 완료해주세요.');
        }else if(checkedEmail != email){
            alert('이메일 중복체크를 완료해주세요.');
        }else{
            axios.post('/signup/submit', memberInfo)
            .then(response=>{
                if(response.data.success){
                    alert(response.data.messages.result);
                    window.location.href=response.data.redirectUrl;
                }else{
                    console.log(response.data.messages);
                    setErrorMsg('');
                    setErrorMsg(response.data.messages);
                }
            })
            .catch(error =>{
                console.log('error');
            });
        }
    }

    // 소셜로그인 연결
    function oAuthUser(serviceName){
        window.location.href='http://localhost:8080/oauth2/authorization/' + serviceName;
    }

    return(
        <div>   

        <section className="bg-auth-home d-table w-100" style={{backgroundImage : "url('assets/images/bg-form.jpg')"}}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7 col-md-6">
                        <div className="me-lg-5">   
                            <img src="assets/images/logo-big.png" className="img-fluid d-block mx-auto" alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6">
                        <div className="card shadow rounded border-0">
                            <div className="card-body">
                                <h4 className="card-title text-center">회원가입</h4>  
                                <form className="login-form mt-4">
                                    <div className="row">

                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">아이디 <span className="text-danger">*</span></label>
                                                <div className="form-icon position-relative">
                                                    <input type="text" id='id' onChange={handleIdChange} onBlur={idCheck} className="form-control ps-5" placeholder="아이디를 입력해주세요." name="username" required=""/>
                                                    {errorMsg.idErrorMsg && (<span style={{ color: 'red', fontSize:'12px', display:'inline-block' }}>{errorMsg.idErrorMsg}</span>)}
                                                </div>
                                            </div>
                                        </div>

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
                                                <label className="form-label">닉네임 <span className="text-danger">*</span></label>
                                                <div className="form-icon position-relative">
                                                    <input type="text" id='nickName' onChange={handleNickNameChange} onBlur={nickNameCheck} className="form-control ps-5" placeholder="닉네임을 입력해주세요." name="text" required=""/>
                                                    {errorMsg.nickNameErrorMsg && (<span style={{ color: 'red', fontSize:'12px', display:'inline-block' }}>{errorMsg.nickNameErrorMsg}</span>)}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">이메일 <span className="text-danger">*</span></label>
                                                <div className="form-icon position-relative">
                                                    <input type="email" id="email" onChange={handleEmailChange} onBlur={emailCheck} className="form-control ps-5" placeholder="이메일을 입력해주세요." name="email" required=""/>
                                                    {errorMsg.emailErrorMsg && (<span style={{ color: 'red', fontSize:'12px', display:'inline-block' }}>{errorMsg.emailErrorMsg}</span>)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">이메일인증 <span className="text-danger">*</span></label>
                                                <div className="form-icon position-relative">
                                                    <input type="email" id="emailVerification" onChange={handleAuthCodeChange} className="form-control form-with2btn ps-4" placeholder="인증코드를 입력해주세요." name="emailVerification" required=""/>
                                                    <button type="button" onClick={emailVerificate} className="btn btn-primary btn-2">코드전송</button>
                                                    <button type="button" onClick={codeVerificate} className="btn btn-primary btn-2">인증하기</button>
                                                    {errorMsg.emailVerificatedErrorMsg && (<span style={{ color: 'red', fontSize:'12px', display:'inline-block' }}>{errorMsg.emailVerificatedErrorMsg}</span>)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <div className="form-check">
                                                    <input className="form-check-input" onChange={handleAgreementChange} type="checkbox" value="" id="agreement"/>
                                                    <label className="form-check-label" ><a href="#" className="text-primary">약관 </a>확인 및 동의. </label><br/>
                                                    {errorMsg.agreementErrorMsg && (<span style={{ color: 'red', fontSize:'12px', display:'inline-block' }}>{errorMsg.agreementErrorMsg}</span>)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="d-grid">
                                                <button type='button' onClick={register} className="btn btn-primary">가입하기</button>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mt-4 text-center">
                                            <h6>또는 소셜로 가입하기</h6>
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

                                        <div className="mx-auto text-center">
                                            <p className="mb-0 mt-3"><small className="text-dark me-2">이미 아이디가 있으신가요 ?</small> <Link to='/login'className="text-dark fw-bold">로그인</Link></p>
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

        <script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>

        <script src="assets/libs/feather-icons/feather.min.js"></script>
        <script src="assets/js/plugins.init.js"></script>
        <script src="assets/js/app.js"></script>
        </div>
    );
}

export default SignUpForm;