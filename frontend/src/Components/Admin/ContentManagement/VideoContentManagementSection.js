import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

const VideoContentManagementSection = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [boardWriteYear, setBoardWriteYear] = useState('');
  const [viewCount, setViewCount] = useState(0);
  const [youtubeLink, setYoutubeLink] = useState(''); 
  const [editorInstance, setEditorInstance] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentBoardNo, setcurrentBoardNo] = useState(null);
  const [modify, setModify] = useState(false);
  const [videoList, setVideoList] = useState({list:[]});

  const [modalTitle, setModalTitle] = useState('글 작성하기');
  const [modalBtn, setModalBtn] = useState('업로드');


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
    axiosPageData(page.pagingInfo.pageNum);
  },[]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);  
  };    

  // 글쓰기 시 초기화 
  const handleModalOpen = () => {
    const composeButton = document.querySelector('[data-bs-target="#compose-mail"]');
      if (composeButton) {
        composeButton.click();
        console.log("글 쓰기 통해 모달창 진입");
      }
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);     
  };  


  const handleMediaChange = (e, editor) => {
    const data = editor.getData();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    const oembedElement = doc.querySelector('oembed');
    if (oembedElement) {
        const url = oembedElement.getAttribute('url');
        setYoutubeLink(url);
    }
  };  

  const handleModalClose = () => {
    setTitle('');
    setContent('');
    setModify(false);
    setYoutubeLink('');
    setModalTitle('글 작성하기');
    setModalBtn('업로드');
  
    // CKEditor 초기화
    if (editorInstance) {
      editorInstance.setData('');
    }
  };
  
  useEffect(() => {
    const modalElement = document.getElementById('compose-mail');
    modalElement.addEventListener('hidden.bs.modal', handleModalClose);
    
    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
    };
  }, [editorInstance]); 
  
  

  function sendData(){
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
    } else if ( !youtubeLink.trim()){
      alert('동영상을 입력하세요');
      return; 
    }
    

    if(modify){
      modifyData({
        boardNo : currentBoardNo,
        boardWriteYear : boardWriteYear,
        viewCount : viewCount,
        boardTitle : title, 
        boardContent : content,
        boardFile : youtubeLink,
        sectionNo : 3
      })

    }else{
      writeData2({
        boardTitle : title, 
        boardContent : content,
        boardFile : youtubeLink,
        sectionNo : 3
      })
    }

  }



  
  const writeData2 = (writeData) => {
      axios.post('/video/write', null, {
        withCredentials: true,
        params : {
          boardTitle : writeData.boardTitle,
          boardContent : writeData.boardContent,
          boardFile : writeData.boardFile, 

          sectionNo : 3
        }

      })
      .then(response => { 
        setTitle('');
        console.log("글쓰기 완료!!");
        if (editorInstance) {
          editorInstance.setData(''); 
        }
        setYoutubeLink('');
        document.getElementById('close-modal').click();
        axiosPageData(page.pagingInfo.pageNum);
      })
      .catch(error => console.log(error));

    }

    const modifyData = (modifyData) => {

      axios.put('/video/modify', null, {
        withCredentials: true,
        params : {
          boardNo : modifyData.boardNo,
          boardTitle : modifyData.boardTitle,
          boardContent : modifyData.boardContent,
          boardWriteYear : modifyData.boardWriteYear,
          viewCount : modifyData.viewCount,
          boardFile : modifyData.boardFile,
          sectionNo : 3
        }
      })
      .then(response => { 
        setTitle('');
        console.log("수정완료!!");
        if (editorInstance) {
          editorInstance.setData('');
        }
        setYoutubeLink('');
        document.getElementById('close-modal').click();
        axiosPageData(page.pagingInfo.pageNum);
      })
      .catch(error => console.log(error));

    }

  const axiosPageData = (pageNum) => {

    const amount = 9;

    axios.get('/video/videoAllList', {
      params : {
        amount : amount,
        pageNum : pageNum
      }
    })
      .then(response => {
          setVideoList({list : response.data.list});
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

  function getYouTubeEmbedUrl(url) {


    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
  
    if (match && match[2].length === 11) {          
      return `https://img.youtube.com/vi/${match[2]}/0.jpg`;
    }
  
    return url; 
  }
  
  const modifyBoard = (video) => {

    setModalTitle('수정하기');    
    setModalBtn('수정');
    setTitle(video.boardTitle);
    setContent(video.boardContent);
    setBoardWriteYear(video.boardWriteYear);
    setViewCount(video.viewCount);
    setcurrentBoardNo(video.boardNo);
    setModify(true);
    setYoutubeLink(video.boardFile); 

    const composeButton = document.querySelector('[data-bs-target="#compose-mail"]');

    if (composeButton) {
        composeButton.click();
            
      } else {
        console.log('글 쓰기 버튼을 찾을 수 없습니다.');
    }    

    if (editorInstance) {
      editorInstance.setData(`<figure className="media"><oembed url="${video.boardFile}"></oembed></figure>`);
    }
  }
  
  const removeBoard = (video) => {

    console.log(video.boardNo);
    
    let removeCheck = window.confirm('삭제하시겠습니까?');
    
    if(removeCheck){
      axios.delete('/video/remove', {
        withCredentials: true,
        params : {
           boardNo : video.boardNo
        }
       })
       .then(response => { 
        axiosPageData(page.pagingInfo.pageNum);
      })
      .catch(error => console.log(error));
      }
    }
   

  useEffect(() => {
    if (editorInstance && currentVideo) {
      editorInstance.setData(currentVideo.boardContent);
    }
  }, [editorInstance, currentVideo]); 
  


  
  return(
        <>
        <div className="container-fluid">
            <div className="layout-specing">
                <div className="d-md-flex justify-content-between" >
                    <div>
                        <h5 className="mb-0">동영상 콘텐츠</h5>

                        <nav aria-label="breadcrumb" className="d-inline-block mt-1">
                            <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                                <li className="breadcrumb-item text-capitalize">콘텐츠 관리</li>
                                <li className="breadcrumb-item text-capitalize active" aria-current="page">동영상 콘텐츠</li>
                            </ul>
                        </nav>
                    </div>


                 <div className="modal fade" id="compose-mail" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-lg modal-dialog-centered" >
                        <div className="modal-content" >
                            <div className="modal-header border-bottom p-3">
                                <h5 className="modal-title" id="exampleModalLabel">{modalTitle}</h5>
                                <button type="button" className="btn btn-icon btn-close" data-bs-dismiss="modal" id="close-modal" ><i className="uil uil-times fs-4 text-dark"></i></button>
                            </div>
                            <div className="modal-body p-3 pt-4">
                                    <div className="col-12">
                                      <div className="mb-3">
                                      < label htmlFor="title" className="form-label">제목</label>
                                        <input
                                          className="form-control" 
                                          onChange={handleTitleChange}
                                          placeholder="제목을 입력하세요"
                                          value={title}
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
                                    </div>

                                    <div className="col-12">
                                      <div className="mb-3">
                                      < label htmlFor="content" className="form-label">내용</label>

                                        <input
                                          className="form-control" 
                                          onChange={handleContentChange}
                                          placeholder="내용을 입력하세요"
                                          value={content}
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
                                    </div>
                   

                                    <div className="col-12">
                                    < label htmlFor="title" className="form-label">동영상</label>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      onReady={editor => {
                                        setEditorInstance(editor);
                                      }}

                                      config={{                                        
                                      toolbar: ['undo', 'redo','|','MediaEmbed'],                                                                             
                                      }}
                                      onChange={(e, editor) => handleMediaChange(e, editor)}                                    


                                    />
                                      <div className="col-12 mt-4">
                                        <button type="button" onClick={sendData} className="btn btn-primary">{modalBtn}</button>
                                      </div>
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
                {videoList.list.map(video => (
                    <div className="col-xl-3 col-lg-4 col-md-6 mt-4" key={video.boardNo}>
                    <div className="card blog blog-primary rounded border-0 shadow overflow-hidden">
                        <div className="position-relative">
                            <img src={getYouTubeEmbedUrl(video.boardFile)} className="card-img-top" alt="..." />
                            <div className="overlay rounded-top"></div>
                        </div>
                        <div className="card-body content" style={{margin: '0px'}}>
                            <h5><a target="_blank" href={`/board/video/detail/${video.boardNo}`} className="card-title title text-dark" style={{ display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', maxWidth: '100%' }}>{video.boardTitle}</a></h5>

                            <div className="post-meta d-flex justify-content-between mt-3" style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <a onClick={()=>modifyBoard(video)} className="btn btn-primary " style={{width: `90px`, height: `40px`, fontSize: `12px`}}> 수정</a>
                                    <a onClick={()=>removeBoard(video)} className="btn btn-primary" style={{width: `90px`, height: `40px`, fontSize: `12px`}}>삭제</a>
                            </div>
                        </div>
                        <div className="author">
                            {/* <small className="text-white user d-block"><i className="uil uil-user"></i> Calvin Carlo</small> */}
                            <small className="text-white date"><i className="uil uil-calendar-alt"></i>{new Date(video.regDate).toLocaleDateString()}</small>
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
export default VideoContentManagementSection