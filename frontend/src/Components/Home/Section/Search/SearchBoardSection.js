import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; 
import { useParams } from 'react-router-dom';

const SearchBoardSection = (searchInfo, pageNum) => {
    const navigate = useNavigate();
    let [boardList, setBoardList] = useState({list:[]});

    let {searchQuery} = useParams();

    const boardDetailClick = (board) => {
        let boardNo = board.boardNo;
        switch(board.sectionNo){
            case 2 : 
                navigate(`/board/archive/detail/${ boardNo }`, { state: { boardNo } });
                break;
            case 3 : 
                navigate(`/board/video/detail/${ boardNo }`, { state: { boardNo } });
                break;
        }
    }

    const imgSpy = (sectionNo) => {
        switch(sectionNo){
            case 2 : 
                return true;
            case 3 : 
                return false;
        }
    }

    function getYouTubeEmbedUrl(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
      
        if (match && match[2].length === 11) {          
          return `https://img.youtube.com/vi/${match[2]}/0.jpg`;
        }
        return url; 
    }

    let [page, setPage] = useState({
        startPage: 1,
        endPage: 0,
        prev: false,
        next: false,
        total: 0,
        pagingInfo: {
          pageNum: 1,
          amount: 9
        }
      });

    useEffect(() => {
        axiosPageData(page.pagingInfo.pageNum);
    }, []);

    const axiosPageData = (pageNum) => {

        const amount = 9;

        axios.get('/search', {
            params : {
                searchQuery : searchQuery,
                pageNum : pageNum,
                amount : amount
            }
        })
            .then(response => {
                console.log(response.data);
                setPage({
                    startPage: response.data.page.startPage,
                    endPage: response.data.page.endPage,
                    prev: response.data.page.prev,
                    next: response.data.page.next,
                    total: response.data.page.total,
                    pagingInfo: {
                        pageNum: response.data.page.pagingInfo.pageNum,
                        amount: response.data.page.pagingInfo.amount
                    }
                });
                setBoardList({list : response.data.board});
            })
            .catch(error => {
                console.log('Error data:', error);
            });
    };

    return(
        <>
            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 filters-group-wrap">
                            <div className="filters-group">
                            </div>
                        </div>
                    </div>
                    <div id="grid" className="row">
                        {page.total!=0 ? boardList.list.map(board => (
                            <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2 picture-item" key={board.boardNo}>
                                <div className="card blog border-0 work-container work-primary work-classic shadow rounded-md overflow-hidden">             

                                { imgSpy(board.sectionNo) ? (
                                    <img src={board.boardFile ? `/asset/${board.boardFile}` : `/asset/noimage.jpg`} className="img-fluid work-image" alt="" style={{ width: '100%', height: 'auto', aspectRatio: '356 / 267' }}/>
                                ) : (
                                    <img
                                        width="100%"
                                        src={getYouTubeEmbedUrl(board.boardFile)}
                                    ></img>                                    
                                )
                                }
                                    <div className="card-body" style={{margin:0}}>
                                        <div className="content">
                                            <a href=" " className="badge badge-link bg">{board.boardWriteYear}</a>
                                            <h5 className="mt-3"><a className="text-dark title">{board.boardTitle}</a></h5>
                                            <p className="text-muted" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', maxWidth: '100%' }}>{board.boardContent}</p>
                                            <a className="text-muted readmore" 
                                                style={{ cursor: 'pointer' }} 
                                                onClick={() => boardDetailClick(board)}>
                                                Read More <i className="uil uil-angle-right-b align-middle"></i>
                                            </a>
                                            {/* <button onClick={()=>{boardDetailClick(board)}}>더보기</button> */}
                                       </div>
                                    </div>
                                </div>
                            </div>
                        )):<div className="text-center" style={{fontWeight:'900'}}>검색결과가 없습니다.</div>}
                    </div>
                </div>
                
                <div className="col-12 mt-4">
                <ul className="pagination justify-content-center mb-0">
                    {page.prev && (
                        <li className="page-item"><a className="page-link" style={{ cursor: 'pointer' }} onClick={()=>{ page.prev && axiosPageData(page.startPage-1)}} aria-label="Previous">Prev</a></li>
                    )}
                        {Array.from({ length: (page.endPage - page.startPage + 1) }, (_, i) => page.startPage + i).map(pageNum => (
                        <li className={`page-item ${pageNum === page.pagingInfo.pageNum ? 'active' : ''}`} style={{ cursor: 'pointer' }} key={pageNum}><a className="page-link" onClick={() => {axiosPageData(pageNum)}}>{pageNum}</a></li>
                        ))}
                    {page.next && (
                        <li className="page-item"><a style={{ cursor: 'pointer' }} className="page-link" onClick={()=>{ page.next && axiosPageData(page.endPage+1)}} aria-label="Next">Next</a></li>
                    )}    
                    
                </ul>
            </div>


            </section>
        </>
    )
}
export default SearchBoardSection;