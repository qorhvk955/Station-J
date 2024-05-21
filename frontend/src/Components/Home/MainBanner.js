import React from "react";

const Hero = () => {

    return(
        <>
            {/* <!-- Hero Start --> */}
            <section className="home-slider position-relative">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="3000">
                            <div className="bg-home-75vh d-flex align-items-center"
                                style={{ background: "url('/assets/images/blog/bg1.jpg') center center" }}>
                                <div className="bg-overlay"></div>
                                <div className="container">
                                    <div className="row mt-5 justify-content-center">
                                        <div className="col-12">
                                            <div className="title-heading text-center">
                                                <h2 className="text-white title-dark mb-3">INCHEON SMART Station-J</h2>
                                                <ul className="list-unstyled">
                                                    <li className="list-inline-item small user text-white-50 me-2">모바일 다운로드</li>
                                                </ul>
                                                <p className="para-desc mx-auto text-white-50 mb-0">
                                                    법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 
                                                    의하여 이를 제한하거나 인정하지 아니할 수 있다. 대통령-국무총리-국무위원</p>
                                                <div className="mt-4">
                                                    <a href=" " className="btn btn-primary">바로가기</a>
                                                </div>
                                            </div>
                                        </div>{/* <!--end col--> */}
                                    </div>{/* <!--end row--> */}
                                </div>
                            </div>{/* <!--end slide--> */}
                        </div>

                        <div className="carousel-item" data-bs-interval="3000">
                            <div className="bg-home-75vh d-flex align-items-center"
                                style={{background: "url('/assets/images/blog/bg2.jpg') center center"}}>
                                <div className="bg-overlay"></div>
                                <div className="container">
                                    <div className="row mt-5 justify-content-center">
                                        <div className="col-12">
                                            <div className="title-heading text-center">
                                                <h2 className="text-white title-dark mb-3">INCHEON SMART Station-J</h2>
                                                <ul className="list-unstyled">
                                                    <li className="list-inline-item small user text-white-50 me-2">모바일 다운로드</li>
                                                </ul>
                                                <p className="para-desc mx-auto text-white-50 mb-0">
                                                    법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 
                                                    의하여 이를 제한하거나 인정하지 아니할 수 있다. 대통령-국무총리-국무위원</p>
                                                <div className="mt-4">
                                                    <a href=" " className="btn btn-primary">바로가기</a>
                                                </div>
                                            </div>
                                        </div>{/* <!--end col--> */}
                                    </div>{/* <!--end row--> */}
                                </div>
                            </div>{/* <!--end slide--> */}
                            
                        </div>

                        <div className="carousel-item" data-bs-interval="3000">
                            <div className="bg-home-75vh d-flex align-items-center"
                                style={{background: "url('/assets/images/blog/bg3.jpg') center center"}}>
                                <div className="bg-overlay"></div>
                                <div className="container">
                                    <div className="row mt-5 justify-content-center">
                                        <div className="col-12">
                                            <div className="title-heading text-center">
                                                <h2 className="text-white title-dark mb-3">INCHEON SMART Station-J</h2>
                                                <ul className="list-unstyled">
                                                    <li className="list-inline-item small user text-white-50 me-2">모바일 다운로드</li>
                                                </ul>
                                                <p className="para-desc mx-auto text-white-50 mb-0">
                                                    법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 
                                                    의하여 이를 제한하거나 인정하지 아니할 수 있다. 대통령-국무총리-국무위원</p>
                                                <div className="mt-4">
                                                    <a href=" " className="btn btn-primary">바로가기</a>
                                                </div>
                                            </div>
                                        </div>{/* <!--end col--> */}
                                    </div>{/* <!--end row--> */}
                                </div>
                            </div>{/* <!--end slide--> */}
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleInterval" role="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleInterval" role="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </a>
                </div>
            </section>{/* <!--end section--> */}
            {/* <!-- Hero End --> */}
        
        </>
    );
}

export default Hero;
