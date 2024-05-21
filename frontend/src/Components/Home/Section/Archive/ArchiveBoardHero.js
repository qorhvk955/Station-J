import React from "react";

const ArchiveBoardHero = () => {
    return(
        <>
            <section className="bg-half-170 d-table w-100" style={{background: `url('${process.env.PUBLIC_URL}/assets/images/bg2.jpg') center center`}}>
                <div className="bg-overlay"></div>
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-lg-12 text-center">
                            <div className="pages-heading">
                                <h4 className="title text-white title-dark mb-0"> VR 아카이빙 </h4>
                                <p className="para-desc mx-auto text-white-50 mb-0">헌법재판소의 장은 국회의 동의를 얻어 재판관중에서 대통령이 임명한다. 헌법재판소 재판관은 정당에 가입하거나 정치에 관여할 수 없다.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="position-breadcrumb">
                        <nav aria-label="breadcrumb" className="d-inline-block">
                            <ul className="breadcrumb rounded shadow mb-0 px-4 py-2">
                                <li className="breadcrumb-item active" aria-current="page">VR 아카이빙</li>
                            </ul>
                        </nav>
                    </div>
                </div> 
            </section>
            {/* <!--end section--> */}
            <div className="position-relative">
                <div className="shape overflow-hidden text-color-white">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
        </>
    );
}
export default ArchiveBoardHero;