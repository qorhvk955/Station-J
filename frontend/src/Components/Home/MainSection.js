import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import MainBanner from './MainBanner'
import MainNavBar from './MainNavBar';
import axios from "axios";


const MainSection = ({userRole, userData}) => {

    const navigate = useNavigate();

    const archiveSeeMoreClick = () => {
	    navigate('/board/archive');     
     };

     const videoSeeMoreClick = () => {
	    navigate('/board/video');     
     };

    const archiveDetailClick = (boardNo) => {
        navigate(`/board/archive/detail/${ boardNo }`, { state: { boardNo } });
    };
    
    const videoDetailClick = (boardNo) => {
        navigate(`/board/video/detail/${ boardNo }`, { state: { boardNo } });
    };

    const handleSearch = () => {
        const searchQuery = document.getElementById('help').value;
        if(!searchQuery){
            alert('검색어를 입력해주세요');
            return false;
        }
        searchBoard(searchQuery);
    }

    const searchBoard = (searchQuery) => {
        navigate(`/board/search/${searchQuery}`, { state: { searchQuery } });
    };


    const [data, setData] = useState({ archiveList : [], videoList : [] });
    const [videoList, setVideoList] = useState([]);


    const [archiveList, setArchiveList] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/archive/mainArchive')
            .then(response => {
                setArchiveList(response.data.archiveList)
            })
            .catch(error => console.log('Error fetching data:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/video/mainVideo')
            .then(response => {
                setVideoList(response.data.videoList)
            })
            .catch(error => console.log('Error fetching data:', error));
    }, []);



    function getYouTubeEmbedUrl(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
      
        if (match && match[2].length === 11) {          
          return `https://img.youtube.com/vi/${match[2]}/0.jpg`;
        }
      
        return url; 
    }
    const handleFormSubmit = (event) => {
        event.preventDefault(); 
        handleSearch();
    }


    return(
        <>
        <MainNavBar userRole={userRole} userData={userData}/>
        <MainBanner/>

        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="features-absolute blog-search">
                            <div className="row justify-content-center">
                                <div className="col-md-10">
                                    <div className="text-center subcribe-form">
                                        <form style={{maxWidth: "800px"}} onSubmit={handleFormSubmit}>
                                            <div className="mb-0">
                                                <input type="text" id="help" name="name"
                                                    className="border shadow rounded-pill bg-white-color" required=""
                                                    placeholder="게시글 검색"/>
                                                <button type="button" onClick={handleSearch} className="btn btn-pills btn-primary">검색</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="VR"className="container mt-4 mt-lg-0">
                <div className="row align-items-center mb-4 pb-2">
                    <div className="col-md-8">
                        <div className="section-title text-center text-md-start">
                            <h4 className="mb-4">VR 아카이빙</h4>
                            <p className="text-muted mb-0 para-desc">외국인은 국제법과 <span className="text-primary fw-bold">조약이 정하는</span>
                                바에 의하여 그 지위가 보장된다. 국민의 모든 자유와 권리는 국가안전보장·질서유지 또는 공공복리를 위하여 필요한 경우에 한하여 법률로</p>
                        </div>
                    </div>

                    <div className="col-md-4 mt-4 mt-sm-0">
                        <div className="text-center text-md-end">
                            <a onClick={archiveSeeMoreClick} className="btn btn-soft-primary">더 보기 <i data-feather="arrow-right" 
                                    className="fea icon-sm"></i></a>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {archiveList.map(archiveList => (
                        <div className="col-lg-4 col-md-6 mt-4 pt-2" key={archiveList.boardNo}>
                            <div className="card blog blog-primary rounded border-0 shadow overflow-hidden">
                                <div className="position-relative">
                                    <img src={archiveList.boardFile ? `/asset/${archiveList.boardFile}` : `/asset/noimage.jpg`} className="card-img-top" alt="..." 
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            aspectRatio: '356 / 267'                                        
                                        }}
                                  />
                                    <div className="overlay rounded-top"></div>
                                </div>
                                <div className="card-body content" style={{margin:0}}>
                                    <h5>
                                        <a className="card-title title text-dark"
                                            style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: '1',
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            maxWidth: '100%',
                                            textAlign: 'left'                                                                                    
                                            }}>
                                            {archiveList.boardTitle}
                                        </a>
                                    </h5>        
                                    <div className="post-meta d-flex justify-content-between mt-3">
                                        <ul className="list-unstyled mb-0">
                                            <li className="list-inline-item me-2 mb-0">
                                                <a className="text-muted like" >
                                                    <i className="uil uil-eye me-1"></i>{archiveList.viewCount}
                                                </a>
                                            </li>
                                        </ul>
                                        <a className="text-muted readmore" 
                                            style={{ cursor: 'pointer' }} 
                                            onClick={() => archiveDetailClick(archiveList.boardNo)}>
                                            Read More <i className="uil uil-angle-right-b align-middle"></i>
                                        </a>

                                    </div>
                                </div>
                                <div className="author">
                                    <small className="date"><i className="uil uil-calendar-alt"></i> {new Date(archiveList.regDate).toLocaleDateString()}</small>
                                </div>
                            </div>
                        </div>
                    ))}    
                </div>         


                </div>

            <div id="VIDEO"className="container mt-100 mt-60">
                <div className="row align-items-center mb-4 pb-2">
                    <div className="col-md-8">
                        <div className="section-title text-center text-md-start">
                            <h4 className="mb-4">영상 게시판</h4>
                            <p className="text-muted mb-0 para-desc">이 헌법시행 당시의<span className="text-primary fw-bold">대법원장</span>
                                대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다.</p>
                        </div>
                    </div>

                    <div className="col-md-4 mt-4 mt-sm-0">
                        <div className="text-center text-md-end">
                            <a onClick={videoSeeMoreClick} className="btn btn-soft-primary">더 보기 <i data-feather="arrow-right"
                                    className="fea icon-sm"></i></a>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {videoList.map(videoList => (
                        <div className="col-lg-4 col-md-6 mt-4 pt-2" key={videoList.boardNo}>
                            <div className="card blog blog-primary rounded border-0 shadow overflow-hidden">
                                <div className="position-relative">

                                    <div className="card-img-top">
                                    <img
                                        width="100%"
                                        src={getYouTubeEmbedUrl(videoList.boardFile)}
                                    ></img>
                                    </div>

                                    <div className="overlay rounded-top"></div>
                                </div>
                                <div className="card-body content" style={{margin:0}}>
                                    <h5>
                                        <a className="card-title title text-dark"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: '1',
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'normal',
                                                maxWidth: '100%',
                                                textAlign: 'left',
                                            }}>
                                            {videoList.boardTitle}
                                        </a>
                                    </h5>        
                                    <div className="post-meta d-flex justify-content-between mt-3">
                                        <ul className="list-unstyled mb-0">
                                            <li className="list-inline-item me-2 mb-0">
                                                <a className="text-muted like"><i className="uil uil-eye me-1"></i>{videoList.viewCount}</a>
                                            </li>                              
                                                   
                                        </ul>

                                        <a className="text-muted readmore" 
                                            style={{ cursor: 'pointer' }} 
                                            onClick={() => videoDetailClick(videoList.boardNo)}>
                                            Read More <i className="uil uil-angle-right-b align-middle"></i>
                                        </a>
                    
                                    </div>
                                </div>
                                <div className="author">
                                    <small className="date"><i className="uil uil-calendar-alt"></i> {new Date(videoList.regDate).toLocaleDateString()}</small>
                                </div>
                            </div>
                        </div>
                    ))}    
                </div>   


 
            </div>{/* <!--end container--> */}      
            <div id="VIEW_MAP" className="container mt-100 mt-60">
                <div className="row align-items-center mb-4 pb-2">
                    <div className="col-md-8">
                        <div className="section-title text-center text-md-start">
                            <h4 className="mb-4">디지털 조감도</h4>
                            <p className="text-muted mb-0 para-desc">이 헌법시행 당시의<span className="text-primary fw-bold">대법원장</span>
                                대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다.</p>
                        </div>
                    </div>
                    {/* <!--end col--> */}
                </div>
                {/* <!--end row--> */}
                <div style={{ background: '#000', width: '100%', height: '500px', margin: 'auto', marginBottom: '100px', marginTop: '50px' }}></div>
            </div>
            {/* <!--end container--> */}
            </section>
        </>
    );
}

export default MainSection;
