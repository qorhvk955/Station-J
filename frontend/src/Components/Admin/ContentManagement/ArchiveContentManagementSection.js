import React, { useState, useEffect } from "react";
import axios from "axios";



const ArchiveContentManagementSection = () => {
  const [csrfToken, setCsrfToken] = useState('');
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [boardFile, setBoardFile] = useState(null);
  const [file, setFile] = useState(null); 
  const [currentBoardNo, setcurrentBoardNo] = useState(null);
  const [modify, setModify] = useState(false);
  const [writeYear, setWriteYear] = useState('');
  const [archiveList, setarchiveList] = useState({list:[]});

  const [modalTitle, setModalTitle] = useState('글 작성하기');
  const [modalBtn, setModalBtn] = useState('업로드');
  const [modalFileText, setModalFileText] = useState('')

  const [page, setPage] = useState({
    startPage: 1,
    endPage: 0,
    prev: false,
    next: false,
    total: 0,
    pagingInfo: {
      pageNum: 1,
      amount: 8
    }
  });


  useEffect(() => {
    axios.get('/api/csrf-token', { withCredentials: true })
    .then(response => {
      setCsrfToken(response.data.token); // 서버로부터 받은 CSRF 토큰
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken; // 모든 요청에 CSRF 토큰 설정
    })
    .catch(error => console.error('Error fetching CSRF token', error));

    const modalElement = document.getElementById('compose-mail');
    const handleModalClose = () => {
      // 모달이 닫힐 때 실행할 로직

      const fileInput = document.getElementById('fileUpload');
      if (fileInput) {
        fileInput.value = '';
        setFile(null);
        setModalFileText('');     
      }
      setModalTitle("글쓰기");
      setModalBtn("업로드");
      setModalFileText("");
      setTitle('');
      setContent('');
      setBoardFile(null);
      setModify(false);
    };  
  
    // Bootstrap 5의 이벤트 리스너 등록
    modalElement.addEventListener('hidden.bs.modal', handleModalClose);
  
    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
    };
  },[]);

  useEffect(() => {
    axiosPageData(page.pagingInfo.pageNum);
  },[]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);  
  };    

  // 글쓰기 버튼 누를 시 동작
  const handleModalOpen = (event) => {

    event.stopPropagation();

    const composeButton = document.querySelector('[data-bs-target="#compose-mail"]');
      if (composeButton) {
        composeButton.click();
      }
  };

  const handleContentChange = (event) => {

    // input 태그: input 태그의 maxLength 속성은 키보드로 입력된 모든 문자를 개별 유닛으로 계산합니다. 
    // 여기서는 일반적으로 유니코드 문자 하나를 하나의 글자로 간주합니다.

    // textarea 태그: textarea 태그 역시 대부분의 경우 input과 유사하게 작동하지만, 
    // 일부 브라우저나 특정 문자 입력(특히 복합 문자)에 있어서는 다르게 처리될 수 있습니다. 
    // 예를 들어, 한글 입력 시 자음과 모음이 별개로 입력되고 조합되는 과정에서 임시 문자가 발생할 수 있습니다. 
    // 이러한 임시 문자들이 maxLength 계산에 포함되어 실제 보이는 글자 수와 다르게 측정될 수 있습니다.
    const composedValue = event.target.value.normalize('NFC'); // 조합형 문자를 완성형으로 변환
    if (composedValue.length <= 500) {
      setContent(composedValue);
    }


  };

  function sendData(){

    console.log("sendData");
    console.log("file : " + file);
    console.log("title : " + title);
    console.log("content : " + content);

    if (!title.trim()) {
      alert('제목을 입력하세요');
      return; 
    } else if (title.length > 100) {
      alert('제목은 100자 이내로 제한됩니다.');
      return;
    } else if (!content.trim()) {
      alert('내용을 입력하세요');
      return;
    } else if (content.length > 500) {
      alert('내용은 500자 이내로 제한됩니다.');
      return;
    }
    

    if(modify){
      modifyData({
        boardNo : currentBoardNo,
        boardFile : boardFile,
        file : file,
        boardTitle : title, 
        boardContent : content,
        boardWriteYear : writeYear,
        sectionNo : 2
      })

    }else{
      writeData2({
        boardTitle : title, 
        boardContent : content,
        file : file,
        sectionNo : 2
      })
    }

  }

  
  const writeData2 = (writeData) => {

    const formData = new FormData();

    if((file != null)){
      formData.append('file', file);
    }

    formData.append('_csrf', csrfToken); // CSRF 토큰 추가
    formData.append('boardTitle', writeData.boardTitle); // 제목 추가
    formData.append('boardContent', writeData.boardContent); // 내용 추가
    formData.append('sectionNo', 2); // 섹션 번호 추가

      axios.post('/archive/write', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
      .then(response => { 
        setTitle('');        
        document.getElementById('close-modal').click();
          axiosPageData(1);
      })
      .catch(error => console.log(error));

    }

    //글 수정
    // const modifyData = (modifyData) => {
  async function modifyData(modifyData){
    const formData = new FormData();
      if((file != null)){
        formData.append('file', file);
      }
      formData.append('boardFile', modifyData.boardFile);
      formData.append('_csrf', csrfToken); // CSRF 토큰 추가
      formData.append('boardTitle', modifyData.boardTitle); // 제목 추가
      formData.append('boardContent', modifyData.boardContent); // 내용 추가
      formData.append('boardWriteYear', modifyData.boardWriteYear);
      formData.append('boardNo', modifyData.boardNo);
      formData.append('sectionNo', 2); // 섹션 번호 추가

      axios.put('/archive/modify', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
      .then((response) => { 
        setTitle('');        
        document.getElementById('close-modal').click();
        axiosPageData(page.pagingInfo.pageNum);
      })
      .catch(error => console.log(error));

    }

  const axiosPageData = (pageNum) => {

    const amount = 8;

    axios.get('/archive/archiveAllList', {
      params : {
        amount : amount,
        pageNum : pageNum
      }
    })
      .then(response => {
          setarchiveList({list : response.data.list});
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
      })
      .catch(error => console.log('Error fetching data:', error));
  }

  
  // 글 수정
  const modifyBoard = (archive, event) => {
    setModify(true);
    setTitle(archive.boardTitle);
    setContent(archive.boardContent);
    setBoardFile(archive.boardFile);
    setcurrentBoardNo(archive.boardNo);
    setWriteYear(archive.boardWriteYear);
    setModalTitle('수정하기');    
    setModalBtn('수정')
    setModalFileText(archive.boardFile);
    event.stopPropagation();
    
    const composeButton = document.querySelector('[data-bs-target="#compose-mail"]');


    if (composeButton) {
      composeButton.click();
      console.log("수정하기 통해 모달창 진입");
      console.log(content);

    }


  }
  
  const removeBoard = (archive) => {

    console.log(archive.boardNo);
    
    let removeCheck = window.confirm('삭제하시겠습니까?');
    
    if(removeCheck){
      axios.delete('/archive/remove', {
        withCredentials: true,
        params : {
           boardNo : archive.boardNo
        }
       })
       .then(response => { 
        axiosPageData(page.pagingInfo.pageNum);
      })
      .catch(error => console.log(error));
      }
    }

    const fileUpload = (e) => {
      const files = e.target.files;
      if (files.length === 0) {
        alert('파일을 선택해주세요.');
      } else if (files[0].name.length > 255) {
        alert('파일 이름이 너무 깁니다. 255자 이내로 제한됩니다.');
      } else {
        setFile(files[0]);
      }
    }

  
  return(
        <>
        <div className="container-fluid">
            <div className="layout-specing">
                <div className="d-md-flex justify-content-between" >
                    <div>
                        <h5 className="mb-0">VR 콘텐츠</h5>

                        <nav aria-label="breadcrumb" className="d-inline-block mt-1">
                            <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                                <li className="breadcrumb-item text-capitalize">콘텐츠 관리</li>
                                <li className="breadcrumb-item text-capitalize active" aria-current="page">VR 콘텐츠</li>
                            </ul>
                        </nav>
                    </div>


                 <div className="modal fade" id="compose-mail" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-lg modal-dialog-centered" >
                        <div className="modal-content" >
                            <div className="modal-header border-bottom p-3">
                                <h5 className="modal-title" id="exampleModalLabel">{ modalTitle }</h5>
                                <button type="button" className="btn btn-icon btn-close" data-bs-dismiss="modal" id="close-modal" ><i className="uil uil-times fs-4 text-dark"></i></button>
                            </div>
                            <div className="modal-body p-3 pt-4">

                                <div className="mb-3">

                                <label htmlFor="fileUpload" className="form-label">첨부파일
                                {" " + modalFileText}                                                           
                                </label>
                                
                                <input
                                        type="file"
                                        className="form-control"
                                        id="fileUpload"
                                        onChange={e => fileUpload(e)}      
                                />
                                  
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">제목</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="제목을 입력하세요"
                                        value={title}
                                        onChange={handleTitleChange}   
                                        maxLength="100"                                                                              
                                    />

                                  <div className="text-muted">
                                    글자수 : {title.length}/{100}
                                  </div>

                                  {title.length === 100 && (
                                      <div className="text-warning">
                                          최대 문자 수에 도달했습니다!
                                      </div>
                                  )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">내용</label>
                                    <textarea
                                        className="form-control"
                                        id="content"
                                        placeholder="내용을 입력하세요"
                                        value={content}
                                        onChange={handleContentChange}
                                        maxLength="500"                                    
                                    />

                                  <div className="text-muted">
                                    글자수 : {content.length}/{500}
                                  </div>

                                  {content.length === 500 && (
                                      <div className="text-warning">
                                          최대 문자 수에 도달했습니다!
                                      </div>
                                  )}





                                </div>    

                                <div className="col-12 mt-4">
                                    <button type="button" onClick={sendData} className="btn btn-primary">{modalBtn}</button>
                                </div>                   
                            </div>

                       
                        </div>
                    </div> 
                </div>
            
                <div className="mt-4 mt-sm-0">
                    <a className="btn btn-primary" onClick={handleModalOpen} data-bs-toggle="modal" data-bs-target="#compose-mail"><i className="uil uil-plus me-1"></i> 글 쓰기</a>
                </div>                            
            </div>
            <div className="row">
                {archiveList.list.map(archive => (
                    <div className="col-xl-3 col-lg-4 col-md-6 mt-4" key={archive.boardNo}>
                    <div className="card blog blog-primary rounded border-0 shadow overflow-hidden">
                        <div className="position-relative">
                            <img src={archive.boardFile ? `/asset/${archive.boardFile}` : `/asset/noimage.jpg`} style={{ width: '100%', height: 'auto', aspectRatio: '356 / 267' }} className="card-img-top" alt="..." />
                            <div className="overlay rounded-top"></div>
                        </div>
                        <div className="card-body content" style={{margin: '0px'}}>
                            <h5><a target="_blank" href={`/board/archive/detail/${archive.boardNo}`} className="card-title title text-dark" style={{ display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', maxWidth: '100%' }}>{archive.boardTitle}</a></h5>

                            <div className="post-meta d-flex justify-content-between mt-3" style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <a onClick={(e)=>modifyBoard(archive, e)} className="btn btn-primary " style={{width: `90px`, height: `40px`, fontSize: `12px`}}> 수정</a>
                                    <a onClick={()=>removeBoard(archive)} className="btn btn-primary" style={{width: `90px`, height: `40px`, fontSize: `12px`}}>삭제</a>
                            </div>
                        </div>
                        <div className="author">
                            <small className="text-white date"><i className="uil uil-calendar-alt"></i>{new Date(archive.regDate).toLocaleDateString()}</small>
                        </div>
                    </div>
                </div>          
                ))}                       
            </div>

            <div className="row">
            <div className="col-12 mt-4">
                <ul className="pagination justify-content-center mb-0">
                    {page.prev && (
                      <li className="page-item"><a className="page-link" onClick={()=>{ page.prev && axiosPageData(page.startPage-1)}} aria-label="Previous">Prev</a></li>
                    )}
                        {Array.from({ length: (page.endPage - page.startPage + 1) }, (_, i) => page.startPage + i).map(pageNum => (
                        <li className={`page-item ${pageNum === page.pagingInfo.pageNum ? 'active' : ''}`} key={pageNum}><a className="page-link" onClick={() => {axiosPageData(pageNum)}}>{pageNum}</a></li>
                        ))}
                    {page.next && (
                      <li className="page-item"><a className="page-link" onClick={()=>{ page.next && axiosPageData(page.endPage+1)}} aria-label="Next">Next</a></li>
                    )}
                    
                </ul>
            </div>
        </div>

        </div>

    </div>
    </>
    )
}
export default ArchiveContentManagementSection