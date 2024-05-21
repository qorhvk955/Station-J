import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


const AccountManagementSection = () => {
    const navigate = useNavigate();
    let [userList, setUserList] = useState([]);
    let [pageData, setPageData] = useState({});
    let [pageNum, setPageNum] = useState(1);
    let [startPage, setStartPage] = useState(1);
    let sectionAmount = 5;

    useEffect(()=>{
        getMemberList(pageNum);
    }, []);

    function getMemberList(pageNum){
        axios.get('/admin/getMemberList', {withCredentials:true, params : {'pageNum' : pageNum}})
            .then(response => {
                console.log(response.data);
                setUserList(response.data.members);
                setPageData(response.data);
                setPageNum(pageNum);
            })
            .catch(error=>console.log(error));
    }

    let [searchQuery, setSearchQuery] = useState();
    let handleSearchQuery = (e) => setSearchQuery(e.target.value);
    function getMemberBySearch(pageNum){
        axios.get('/admin/searchMemberList', {withCredentials:true,
                params : {
                    'searchQuery' : searchQuery,
                    'pageNum' : 1
                }})
            .then(response=>{
                console.log(response.data);
                setUserList(response.data.members);
                setPageData(response.data);
                setPageNum(pageNum);
            })
            .catch(error=>console.log(error));
    }

    let handleNextSection = () => {
        let nextPage = pageData.num + sectionAmount;
        if(nextPage > pageData.totalPages){
            nextPage = pageData.totalPages;
        }
        setStartPage(nextPage - ((nextPage - 1) % sectionAmount));
        setPageNum(nextPage);
        if(searchQuery){
            getMemberBySearch(nextPage);
        }else{
            getMemberList(nextPage);
        }
        
    };

    function handlePrevSection (){
        let prevPage = pageData.num - sectionAmount;
        if(prevPage < 1){
            prevPage = 1;
        }
        setStartPage(prevPage - ((prevPage - 1) % sectionAmount));
        setPageNum(prevPage);
        if(searchQuery){
            getMemberBySearch(prevPage);
        }else{
            getMemberList(prevPage);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);  // ISO 형식의 문자열을 Date 객체로 변환
        const year = date.getFullYear();  // 연도
        const month = (date.getMonth() + 1).toString().padStart(2, '0');  // 월 (0부터 시작하므로 1을 더함)
        const day = date.getDate().toString().padStart(2, '0');  // 일
        return `${year}.${month}.${day}`;  // 형식에 맞게 조합
    }

    function getBadgeDetails(roleSet) {
        const rolePriority = {
            "ADMIN": 4,
            "SUBADMIN": 3,
            "STAFF": 2,
            "USER": 1
        };
    
        // 배열 내 가장 높은 우선 순위의 권한 찾기
        let highestRole = "권한 없음";  // 기본값 설정
        let maxPriority = 0;
    
        for (let role of roleSet) {
            if (rolePriority[role] && rolePriority[role] > maxPriority) {
                highestRole = role;
                maxPriority = rolePriority[role];
            }
        }
    
        // 최고 권한에 따라 뱃지 세부 정보 반환
        switch (highestRole) {
            case 'ADMIN':
                return { className: "badge bg-soft-primary px-3 py-1", roleName: "최고 관리자" };
            case 'SUBADMIN':
                return { className: "badge bg-soft-success rounded px-3 py-1", roleName: "준 관리자" };
            case 'STAFF':
                return { className: "badge bg-soft-warning rounded px-3 py-1", roleName: "게시판 관리자" };
            case 'USER':
                return { className: "badge bg-soft-danger rounded px-3 py-1", roleName: "일반 사용자" };
            default:
                return { className: "", roleName: "권한 없음" };
        }
    }

    return (
        <>
        {/*Top Header*/}
        <div className="container-fluid">
            <div className="layout-specing">
                <div className="d-md-flex justify-content-between align-items-center">
                    <h5 className="mb-0">계정 권한 관리</h5>
                    <div style={{display:'flex',flexDirection:'row', marginLeft:'100px'}}>
                        <input onChange={handleSearchQuery} className="form-control" type="search" placeholder="닉네임/이메일 검색" style={{marginRight:'10px'}}/>
                        <button type="button" onClick={()=>{getMemberBySearch(pageNum)}} className="btn btn-primary" style={{fontSize:'px', width:'80px'}}>검색</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 mt-4">
                        <div className="table-responsive shadow rounded">
                            <table className="table table-center bg-white mb-0">
                                <thead>
                                <tr>
                                    <th className="border-bottom p-3">계정 번호</th>
                                    <th className="border-bottom p-3" style={{minWidth: '220px'}}>닉네임</th>
                                    <th className="text-center border-bottom p-3"
                                        style={{minWidth: '200px'}}>이메일
                                    </th>
                                    <th className="text-center border-bottom p-3"></th>
                                    <th className="text-center border-bottom p-3">가입날짜</th>
                                    <th className="text-center border-bottom p-3">권한</th>
                                    <th className="text-center border-bottom p-3">권한수정</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/*Start*/}
                                {userList.map(user => (
                                    <tr key={user.num}>
                                        <th className="p-3">{user.num}</th>
                                        <td className="p-3">
                                            <div className="d-flex align-items-center">
                                                <span className="ms-2">{user.nickName}</span>
                                            </div>
                                        </td>
                                        <td className="text-center p-3">{user.email}</td>
                                        <td className="text-center p-3"></td>
                                        <td className="text-center p-3">{formatDate(user.regDate)}</td>
                                        <td className="text-center p-3">
                                            <div className={getBadgeDetails(user.roleSet).className}>
                                                {getBadgeDetails(user.roleSet).roleName}
                                            </div>
                                        </td>
                                        <td className="text-end p-3">
                                            <button  style={{color: 'white', fontSize:'12px'}} onClick={()=>{navigate(`modifyMember/${user.num}`)}}
                                                    className="btn btn-sm btn-primary">권한수정
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row text-center">
                    <div className="col-12 mt-4">
                        <div className="d-md-flex align-items-center text-center justify-content-between">
                            <span className="text-muted me-3">총 회원 수{pageData.totalElements}명 (가입일자 순)</span>
                            <ul className="pagination mb-0 justify-content-center mt-4 mt-sm-0">
                                {!pageData.first && <li className="page-item">
                                                    <button type="button" className="page-link" aria-label="Previous" onClick={handlePrevSection} > ≪ </button></li>}
                                {
                                    Array.from({length: Math.min(sectionAmount, pageData.totalPages - startPage + 1)}, (_, i) => startPage + i)
                                    .map(i => (<li className={`page-item ${pageData.num ===  i ? 'active' : ''}`} key={i}>
                                                    <button type="button" className="page-link" onClick={() => {getMemberList(i)}}>{i}</button>
                                                </li>))
                                }
                                {!pageData.last && <li className="page-item">
                                                    <button type="button" className="page-link" onClick={handleNextSection} aria-label="Next">≫</button></li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default AccountManagementSection;