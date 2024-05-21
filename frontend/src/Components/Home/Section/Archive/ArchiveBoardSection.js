import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";

const ArchiveBoardSection = () => {
    const navigate = useNavigate();

    const [vrList, setVrList] = useState([]);
    const [maxDate, setMaxDate] = useState(0);
    const [minDate, setMinDate] = useState(0);

    const [yearsRange, setYearsRange] = useState([]);
    const [selectYear, setSelectYear] = useState(2020);
    const [activeFilter, setActiveFilter] = useState('all');


    const [page, setPage] = useState({
        startPage: 1,
        endPage: 0,
        prev: false,
        next: false,
        total: 0,
        pagingInfo : {
            pageNum: 1,
            amount: 9
        }
        
    });

    useEffect(() => {
        fetchData(1);
    }, [selectYear,activeFilter]);

    // 연도 범위 생성
    useEffect(() => {
        const years = [];
        for (let i = minDate; i <= maxDate; i++) {
            years.push(i.toString());
        }
        setYearsRange(years);
    }, [maxDate]);
    

    // 데이터 로드 
    const fetchData = (pageNum) => {
        let url = activeFilter === 'all'
            ? '/archive/archiveAllList'
            : `/archive/getArchiveListByYear?thisYear=${selectYear}`;
        axios.get(url, { params: { pageNum } })
            .then(response => {
                const { data } = response;
                updatePageData(data, pageNum);              
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // 페이지 데이터 업데이트
    const updatePageData = (data, pageNum) => {

        setPage({
            startPage: data.page.startPage,
            endPage: data.page.endPage,
            prev: data.page.prev,
            next: data.page.next,
            total: data.page.total,
            pagingInfo:{
                pageNum: pageNum,
                amount: 9
            }
        });
        setVrList(data.list);
        setMaxDate(data.maxDate);
        setMinDate(data.minDate);
    };

    // 연도 선택 핸들러
    const handleYearClick = (yearClicked) => {
        setSelectYear(yearClicked);
        setActiveFilter('year');
        setPage(prevState => ({
            ...prevState,
            pagingInfo: {
                ...prevState.pagingInfo,
                pageNum: 1
            }
        }));          
    };

    // 아카이브 상세 페이지로 이동
    const archiveDetailClick = (boardNo) => {
        navigate(`/board/archive/detail/${boardNo}`, { state: { boardNo } });
    };

    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 filters-group-wrap">
                            <div className="filters-group">
                                <ul className="container-filter list-inline mb-0 filter-options text-center">
                                    <li className={`list-inline-item categories-name border text-dark rounded ${activeFilter === 'all' ? 'active' : ''}`}
                                        onClick={() => { setActiveFilter('all') }} data-group="all">All</li>
                                    {yearsRange.map(year => (
                                        <li className={`list-inline-item categories-name border text-dark rounded ${selectYear === year && activeFilter === 'year' ? 'active' : ''}`}
                                            onClick={() => {handleYearClick(year)}}
                                            key={year}>{year}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="grid" className="row">
                        {vrList.map(vr => (
                            <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2 picture-item" key={vr.boardNo}>
                                <div className="card blog border-0 work-container work-primary work-classic shadow rounded-md overflow-hidden">
                                    <img src={vr.boardFile ? `/asset/${vr.boardFile}` : `/asset/noimage.jpg`} className="img-fluid work-image" alt="" style={{ width: '100%', height: 'auto', aspectRatio: '356 / 267' }}/>
                                    <div className="card-body" style={{margin:0}}>
                                        <div className="content">
                                            <a href="#" className="badge badge-link bg">{vr.boardWriteYear}</a>
                                            <h5 className="mt-3"><a href="#" className="text-dark title"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: '1',
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'normal',
                                                maxWidth: '100%',
                                                textAlign: 'left'                                                                                    
                                                }}>{vr.boardTitle}</a></h5>
                                            <p className="text-muted" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', maxWidth: '100%' }}>{vr.boardContent}</p>
                                            <a className="link h6" 
                                                style={{ cursor: 'pointer' }} 
                                                onClick={() => archiveDetailClick(vr.boardNo)}>
                                                Read More <i className="uil uil-angle-right-b align-middle"></i>
                                            </a>
                                        </div>                                        
                                    </div>

                                       <div className="author">
                                        <small className="date"><i className="uil uil-calendar-alt"></i> {new Date(vr.regDate).toLocaleDateString()}</small>
                                    </div>                                 
                                </div>
                            </div>                            
                        ))}
                    </div>
                </div>
                
                <div className="col-12 mt-4">
                    <ul className="pagination justify-content-center mb-0">
                        {page.prev && (
                            <li className="page-item"><button className="page-link" onClick={() => page.prev && fetchData(page.startPage - 1)} aria-label="Previous">Prev</button></li>
                        )}
                        {Array.from({ length: (page.endPage - page.startPage + 1) }, (_, i) => page.startPage + i).map(pageNum => (
                            <li className={`page-item ${pageNum === page.pagingInfo.pageNum ? 'active' : ''}`} key={pageNum}>
                                <button className="page-link" onClick={() => fetchData(pageNum)}>{pageNum}</button>
                            </li>
                        ))}
                        {page.next && (
                            <li className="page-item"><button className="page-link" onClick={() => page.next && fetchData(page.endPage + 1)} aria-label="Next">Next</button></li>
                        )}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default ArchiveBoardSection;

