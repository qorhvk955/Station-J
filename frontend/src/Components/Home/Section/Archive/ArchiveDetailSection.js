import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";

const ArchiveDetailSection = () => {
    let {boardNo} = useParams();

    const [board, setBoard] = useState({
        boardNo: 0,
        boardTitle: "",
        boardContent: "",
        boardFile: ""
    });

    useEffect(() => {
        if (boardNo) {
            fetch(`http://localhost:8080/archive/detail/${boardNo}`)
                .then(response => response.json())
                .then(data => {
                    setBoard({
                        boardNo: data.board.boardNo,
                        boardTitle: data.board.boardTitle,
                        boardContent: data.board.boardContent,
                        boardFile: data.board.boardFile
                    });
                })
                .catch(error => console.log('Error fetching data:', error));
        }
    }, [boardNo]); // boardNo를 종속성 배열에 추가

    return(
        <>
            <section className="bg-half">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <div className="section-title">
                                <div className="text-center">
                                    <h4 className="title mb-4">{board.boardTitle}</h4> 
                                    <div id="panorama" 
                                        style={{
                                            width:"100%", 
                                            height: 'auto',
                                            aspectRatio: '356 / 267',                                      
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundImage: board.boardFile ? `url(/asset/${board.boardFile})` : `url(/asset/noimage.jpg)`
                                        }}></div>
                                </div>
                                <p className="text-muted mb-0 mt-4">{board.boardContent}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ArchiveDetailSection;
