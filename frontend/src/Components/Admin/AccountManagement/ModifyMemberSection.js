import React, { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ModifyMemberSection = () => {
    let navigate = useNavigate();
    let { num } = useParams();
    let [roleSet, setRoleSet] = useState([]);
    let [userData, setUserData] = useState({
        id : '',
        nickName : '',
        email : '',
        role : '',
        regDate : ''
    });

    useEffect(()=>{
        getMemberDetail();
    }, [num]);

    function getMemberDetail(){
        axios.get('/admin/memberDetail/' + num, {withCredentials:true})
        .then(response => {
            console.log(response.data);
            setUserData(response.data.memberInfo);
            setRoleSet(response.data.memberInfo.roleSet);
        })
        .catch(error=>console.log(error));
    }

    function deleteMember(){
        axios.delete('/admin/deleteMember/' + num, {withCredentials:true})
        .then(response=>{
            if(response.data.success){
                alert(response.data.message);
                navigate('/admin/accountManagement');
            }else{
                alert(response.data.message);
            }
        })
        .catch(error=>console.log(error));
    }

    function modifyMember(){
        axios.put('/admin/modifyMember/' + num, {'selectedRole' : selectedRole}, {withCredentials:true})
        .then(response=>{
            if(response.data.success){
                alert(response.data.message);
                navigate('/admin/accountManagement');
            }else{
                alert(response.data.message);
            }
        })
        .catch(error=>console.log(error));
    }

    function formatDate(dateString) {
        const date = new Date(dateString); 
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}.${month}.${day}`; 
    }

    let [selectedRole, setSelectedRole] = useState('');
    // 권한 우선순위
    let permissions = [
        { key: 'USER', name: '일반 사용자', description: '게시글 조회 가능 (대시보드 접근 불가)', value: 3 },
        { key: 'STAFF', name: '게시판 관리자', description: '일부 게시판 관리', value: 2 },
        { key: 'SUBADMIN', name: '준 관리자', description: '모든 게시판 관리', value: 1 },
        { key: 'ADMIN', name: '최고 관리자', description: '모든 게시물 및 계정 권한 관리', value: 0 }
    ];

    // 최고 권한 계산 및 초기화
    useEffect(() => {
        // 최고 권한을 기본 선택으로 설정
        if (roleSet.length > 0 && !selectedRole) {
        let highestRole = roleSet.reduce((acc, role) => 
            (permissions.find(p => p.key === role).value < permissions.find(p => p.key === acc).value ? role : acc), 'USER');
            setSelectedRole(highestRole);
        }
        }, [roleSet, permissions]);

    // 권한 변경 핸들러
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    return (
       <>
                   <div className="container-fluid">
                       <div className="layout-specing">
                           <div className="d-md-flex justify-content-between align-items-center">
                               <h5 className="mb-0">프로필 설정</h5>

                               <nav aria-label="breadcrumb" className="d-inline-block mt-2 mt-sm-0">
                                   <ul className="breadcrumb bg-transparent rounded mb-0 p-0">
                                       <li className="breadcrumb-item text-capitalize">계정 관리</li>
                                       <li className="breadcrumb-item text-capitalize"><a href="/admin/accountManagement">계정 권한 관리</a></li>
                                       <li className="breadcrumb-item text-capitalize active" aria-current="page">프로필 설정</li>
                                   </ul>
                               </nav>
                           </div>

                           <div className="row">
                               <div className="col-lg-4 mt-4">
                                   <div className="card border-0 rounded shadow">
                                       <div className="card-body">
                                           <h5 className="text-md-start text-center mb-0">프로필</h5>
                                               <div className="row mt-4">
                                                   <div className="col-md-12">
                                                       <div className="mb-3">
                                                           <label className="form-label">닉네임</label>
                                                           <div className="form-icon position-relative">
                                                               <i data-feather="user" className="fea icon-sm icons"></i>
                                                               <input name="name" id="name" type="text" className="form-control ps-5" value={userData.nickName} readOnly/>
                                                           </div>
                                                       </div>
                                                   </div>
                                                   <div className="col-md-12">
                                                       <div className="mb-3">
                                                           <label className="form-label">아이디</label>
                                                           <div className="form-icon position-relative">
                                                               <i data-feather="user-check" className="fea icon-sm icons"></i>
                                                               <input name="id" id="id" type="text" className="form-control ps-5" value={userData.id} readOnly/>
                                                           </div>
                                                       </div>
                                                   </div>
                                                   <div className="col-md-12">
                                                       <div className="mb-3">
                                                           <label className="form-label">이메일</label>
                                                           <div className="form-icon position-relative">
                                                               <i data-feather="mail" className="fea icon-sm icons"></i>
                                                               <input name="email" id="email" type="email" className="form-control ps-5" value={userData.email} readOnly/>
                                                           </div>
                                                       </div>
                                                   </div>
                                                   <div className="col-md-12">
                                                       <div className="mb-3">
                                                           <label className="form-label">가입일</label>
                                                           <div className="form-icon position-relative">
                                                               <i data-feather="mail" className="fea icon-sm icons"></i>
                                                               <input name="email" id="email" type="email" className="form-control ps-5" value={formatDate(userData.regDate)} readOnly/>
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                       </div>
                                   </div>
                               </div>


                               <div className="col-lg-4 mt-4">
                                   <div className="card border-0 rounded shadow p-4">
                                       <h5 className="mb-0">권한 설정</h5>
                                       {permissions.map((perm) => (
                                            <div key={perm.key} className="d-flex justify-content-between py-4 border-top">
                                                <h6 className="mb-0">{perm.name}</h6>
                                                <p>{perm.description}</p>
                                                <div className="form-check">
                                                    <input 
                                                    className="form-check-input" 
                                                    type="radio" 
                                                    name="role"
                                                    value={perm.key} 
                                                    checked={selectedRole === perm.key} 
                                                    onChange={handleRoleChange} 
                                                    id={`noti${perm.value}`} 
                                                    disabled={selectedRole === 'ADMIN' ? perm.key !== 'ADMIN' : perm.key === 'ADMIN'}
                                                    />
                                                    <label className="form-check-label" htmlFor={`noti${perm.value}`}></label>
                                                </div>
                                                
                                            </div>
                                            
                                        ))}
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <button type="button" onClick={modifyMember} className="btn btn-primary">수정하기</button>
                                                </div>
                                            </div>
                                   </div>

                                   <div className="card border-0 rounded shadow p-4 mt-4">
                                       <h5 className="mb-0 text-danger">계정 삭제하기</h5>

                                       <div className="mt-4">
                                           <h6 className="mb-0">계정을 삭제하려면 Delete 버튼을 눌러주세요, 이전 정보는 복구되지 않습니다.</h6>
                                           <div className="mt-4">
                                               <button type="button" onClick={deleteMember} className="btn btn-danger">삭제하기</button>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
       </>
    );
}
export default ModifyMemberSection;