import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function SignUpSocialForm(){
    let [nickName, setNickName] = useState(null);
    let [agreement, setAgreement] = useState(false);

    let handleNickNameChange = (e) => setNickName(e.target.value);
    let handleAgreementChange = (e) => setAgreement(e.target.checked);

    let [errorMsg, setErrorMsg] = useState({
        nickNameErrorMsg : '',
        agreementErrorMsg : '',
    });


    function register(){
        let memberInfo = {
            'nickName' : nickName,
            'agreement' : agreement,
        };
        axios.post('/info/editinfo', memberInfo, {withCredentials : true})
        .then(response => {
            if(response.data.success){
                window.location.href=response.data.redirectUrl;
            }else{
                console.log(response.data.messages);
                setErrorMsg('');
                setErrorMsg(response.data.messages);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
    return(
        <div>
            <section className="bg-auth-home d-table w-100">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-7 col-md-6">
                                    <div className="me-lg-5">   
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/user/signup.svg`} className="img-fluid d-block mx-auto" alt=""/>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-6">
                                    <div className="card shadow rounded border-0">
                                        <div className="card-body">
                                            <h4 className="card-title text-center">추가정보입력</h4>  
                                            <form className="login-form mt-4">
                                                <div className="row">

                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">닉네임 <span className="text-danger">*</span></label>
                                                            <div className="form-icon position-relative">
                                                                <input type="text" id='nickName' onChange={handleNickNameChange} className="form-control ps-5" placeholder="닉네임을 입력해주세요." name="text" required=""/>
                                                                {errorMsg.nickNameErrorMsg && (<span style={{ color: 'red', fontSize:'12px', display:'inline-block' }}>{errorMsg.nickNameErrorMsg}</span>)}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <div className="form-check">
                                                                <input className="form-check-input" onChange={handleAgreementChange} type="checkbox" value="" id="agreement"/>
                                                                <label className="form-check-label" ><a href="#" className="text-primary">약관 </a>확인 및 동의. </label>
                                                                <br/>                                                                
                                                                {errorMsg.agreementErrorMsg && (<span style={{ color: 'red', fontSize:'12px', display:'inline-block' }}>{errorMsg.agreementErrorMsg}</span>)}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <div className="d-grid">
                                                            <button type='button' onClick={register} className="btn btn-primary">가입하기</button>
                                                            <p className="mb-0 mt-3 text-center"><Link to='/'className="text-dark fw-bold">메인으로 돌아가기</Link></p>
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

export default SignUpSocialForm;