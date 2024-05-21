import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const VideoSection = () => {

    const navigate = useNavigate();


    const videoDetailClick = (boardNo) => {
        navigate(`/board/video/detail/${ boardNo }`, { state: { boardNo } });
    };

    const [page, setPage] = useState({
        startPage: 1,
        endPage: 0,
        prev: false,
        next: false,
        total: 0,
        pagingInfo: {
            pageNum: 1,
            amount: 0
        }
    });


    const [VideoList, setVideoList] = useState([]);

    useEffect(() => {
        axiosPageData(page.pagingInfo.pageNum);
    }, []);

    const axiosPageData = (pageNum) => {

        const amount = 9;

        axios.get('/video/videoAllList?', {
            params : {
                pageNum : pageNum,
                amount : amount
            }
        })
            .then(response => {
                const { data } = response;
                setPage({
                    startPage: data.page.startPage,
                    endPage: data.page.endPage,
                    prev: data.page.prev,
                    next: data.page.next,
                    total: data.page.total,
                    pagingInfo: {
                        pageNum: data.page.pagingInfo.pageNum,
                        amount: data.page.pagingInfo.amount
                    }
                });
                setVideoList(data.list);
            })
            .catch(error => {
                console.log('Error fetching data:', error);
                console.error(error.response);
            });
    };






    function getYouTubeEmbedUrl(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
      
        if (match && match[2].length === 11) {          
          return `https://img.youtube.com/vi/${match[2]}/0.jpg`;
        }
      
        return url; 
    }


    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    {VideoList.map(videoList => (
                        <div className="col-lg-6 col-12 mb-4 pb-2" key={videoList.boardNo}>
                            <div className="card blog blog-primary rounded border-0 shadow overflow-hidden">
                                <div className="row align-items-center g-0">
                                    <div className="col-md-6">
                                        <img className="img-fluid" alt=""
                                            width="100%"
                                            src={getYouTubeEmbedUrl(videoList.boardFile)}
                                        ></img>
                                        <div className="overlay"></div>
                                        <div className="author">
                                            <small className="date"><i className="uil uil-calendar-alt"></i> {new Date(videoList.regDate).toLocaleDateString()}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body content">
                                            <h5><a href="" className="card-title title text-dark" 

                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: '1',
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'normal',
                                                maxWidth: '100%' 
                                            }}                                                                                      
                                            onClick={()=> videoDetailClick(videoList.boardNo)}>{videoList.boardTitle}</a></h5>
                                            <p className="text-muted mb-0"                                            
                                                style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: '1',
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'normal',
                                                    maxWidth: '100%' 
                                                }}>                                           
                                            
                                            {videoList.boardContent}</p>
                                            <div className="post-meta d-flex justify-content-between mt-3">
                                                <ul className="list-unstyled mb-0">
                                                    <li className="list-inline-item me-2 mb-0"><a className="text-muted like"><i className="uil uil-eye me-1"></i>{videoList.viewCount}</a></li>
                                                </ul>
                                                <a className="text-muted readmore" style={{cursor: "pointer"}} onClick={()=> videoDetailClick(videoList.boardNo)}>Read More <i className="uil uil-angle-right-b align-middle"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    ))}
                </div>

                {/* <!-- PAGINATION START --> */}
                <div className="col-12">
                    <ul className="pagination justify-content-center mb-0">
                        <li className="page-item"><a className="page-link" onClick={()=>{ page.prev && axiosPageData(page.startPage-1)}} style={{ cursor: 'pointer' }} aria-label="Previous">Prev</a></li>
                            {Array.from({ length: (page.endPage - page.startPage + 1) }, (_, i) => page.startPage + i).map(pageNum => (
                            <li className={`page-item ${pageNum === page.pagingInfo.pageNum ? 'active' : ''}`} key={pageNum}><a className="page-link" style={{ cursor: 'pointer' }} onClick={() => {axiosPageData(pageNum)}}>{pageNum}</a></li>
                            ))}
                        <li className="page-item"><a className="page-link" onClick={()=>{ page.next && axiosPageData(page.endPage+1)}} style={{ cursor: 'pointer' }} aria-label="Next">Next</a></li>
                    </ul>
                </div>{/* <!--end col--> */}
                {/* <!-- PAGINATION END -- */}



            </div>{/* container */}
      </section> //section
    );
}
export default VideoSection;
