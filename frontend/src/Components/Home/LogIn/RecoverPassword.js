import React from "react";
import { useState } from "react";
import axios from "axios";

function RecoverPassword(){
    let [id, setId] = useState("");
    let [email, setEmail] = useState("");
    let [authCode, setAuthCode] = useState('');

    let handleIdChange = (e) => setId(e.target.value);
    let handleEmailChange = (e) => setEmail(e.target.value);
    let handleAuthCodeChange = (e) => setAuthCode(e.target.value);

    let [errorMsg, setErrorMsg] = useState();
    let [codeErrorMsg, setCodeErrorMsg] = useState();

    // 이메일 인증 코드 전송
    function emailVerificate(){
        if(id === '' || email === ''){
            setErrorMsg('아이디와 이메일을 입력해주세요.');
        }else{
            axios.post('/recover/verification-requests', null,{
                params : {
                    'id' : id,
                    'email' : email
                }
            })
            .then(response=>{
                setErrorMsg('');
                alert(response.data.message);
            })
            .catch(error=>{
                console.log(error);
            });
        }
    }

    // 이메일 인증 코드 확인
    function codeVerificate(){
        if(authCode === ''){
            setCodeErrorMsg('인증코드를 입력해주세요.');
        }else{
            axios.post('/recover/verifications', null, {
                params : {
                    'email' : email,
                    'authCode' : authCode
                }
            })
            .then(response=>{
                if(response.data.success){
                    alert(response.data.messages.result);
                    window.location.href=response.data.redirectUrl;
                }else{
                    setCodeErrorMsg(response.data.messages.result);
                }
            })
            .catch(error=>{
                console.log(error);
            });
        }
    }


    return(
        <div>
        <section className="cover-user">
            <div className="container-fluid px-0">
                <div className="row g-0 position-relative">
                    <div className="col-lg-4 cover-my-30 order-2">
                        <div className="cover-user-img d-flex align-items-center">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card border-0" style={{zIndex : 1}}>
                                        <div className="card-body p-0">
                                            <h4 className="card-title text-center">비밀번호 찾기</h4>  
                                            <form className="login-form mt-4">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <p className="text-muted">회원가입시 입력했던 아이디와 이메일이 일치해야 인증코드를 받을 수 있습니다.</p>
                                                        <div className="mb-3">
                                                            <label className="form-label">아이디<span className="text-danger">*</span></label>
                                                            <div className="form-icon position-relative">
                                                                <i data-feather="mail" className="fea icon-sm icons"></i>
                                                                <input type="id" onChange={handleIdChange} className="form-control ps-5" placeholder="아이디를 입력해주세요." name="id" required=""/>
                                                            </div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">이메일<span className="text-danger">*</span></label>
                                                            <div className="form-icon position-relative">
                                                                <i data-feather="mail" className="fea icon-sm icons"></i>
                                                                <input type="email" onChange={handleEmailChange} className="form-control ps-5" placeholder="이메일을 입력해주세요." name="email" required=""/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {errorMsg && (<span style={{ color: 'red', fontSize:'12px', display:'inline-block' }}>{errorMsg}</span>)}
                                                    <div className="mb-3">                                                    
                                                        <div className="d-grid">
                                                            <button type="button" onClick={emailVerificate} className="btn btn-primary ">전송</button>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">코드입력 <span className="text-danger">*</span></label>
                                                        <div className="form-icon position-relative">
                                                        <input type="email" onChange={handleAuthCodeChange} id="emailVerification" className="form-control ps-5" placeholder="인증코드를 입력해주세요." name="emailVerification" required=""/>                                                   
                                                        {codeErrorMsg && (<span style={{ color: 'red', fontSize:'12px', display:'inline-block' }}>{codeErrorMsg}</span>)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="d-grid">                                                            
                                                            <button type="button" onClick={codeVerificate} className="btn btn-primary ">인증</button>
                                                        </div>
                                                    </div>
                                                    <div className="mx-auto">
                                                        <p className="mb-0 mt-3"><small className="text-dark me-2">비밀번호를 기억하시나요?</small> <a href="/login" className="text-dark fw-bold">로그인</a></p>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 offset-lg-4 padding-less img order-1 jarallax" data-jarallax data-speed="0.5" style={{backgroundImage : "url('assets/images/bg-passwordrecover.jpg')"}}></div> 
                </div>
            </div>
        </section>

        <script src="assets/libs/feather-icons/feather.min.js"></script>
        <script src="assets/js/plugins.init.js"></script>
        <script src="assets/js/app.js"></script>
        </div>
    );
}
export default RecoverPassword;