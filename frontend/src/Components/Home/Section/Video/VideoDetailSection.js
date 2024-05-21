import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const VideoDetailSection = () => {
    let {boardNo} = useParams();

    const [board, setBoard] = useState({
        boardNo: 0,
        boardTitle: "",
        boardContent: "",
        boardFile: ""
    });

    useEffect(() => {
        if (boardNo) {
            fetch(`http://localhost:8080/video/detail/${boardNo}`)
                .then(response => response.json())
                .then(data => {

                    const videoId = new URL(data.board.boardFile).searchParams.get("v");
                    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

                    setBoard({
                        boardNo: data.board.boardNo,
                        boardTitle: data.board.boardTitle,
                        boardContent: data.board.boardContent,
                        boardFile: embedUrl
                    });
                })
                .catch(error => console.log('Error fetching data:', error));
        }
    }, []); 


    return(
        <section className="bg-half">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="section-title">
                            <div className="text-center">
                                <h4 className="title mb-4">{board.boardTitle}</h4>
                                <iframe width="100%" height="500px" src={board.boardFile} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </div>
                            <p className="text-muted mb-0 mt-4">{board.boardContent}</p>
                        </div>
                    </div>
                </div>
            </div>                          
        </section>            
    )
}

export default VideoDetailSection;