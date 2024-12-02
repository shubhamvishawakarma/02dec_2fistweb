import React from 'react'

const Pagenotfound = () => {
    return (
        <>
            <section className="error">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 align-self-center text-center">
                            <figure className="mb-5 hero-image">
                                <img src="assets/images/breadcrumb/breadcrumb-error.png" className="img-fluid " alt="hero image" />
                            </figure>
                        </div>
                        <div className="col-12 col-lg-6 align-self-center">
                            <h4 className="display-5 mb-3 font-black">Data not found</h4>
                            <p className="mb-0">Oops.. Looks like you got lost :</p>
                            <div className="group mt-5">
                                <button className="rounded-pill btn custom-btn-primary font-small primary-btn-effect" type="submit">
                                    Go To Home</button>
                                {/* <span className="ms-3">
                                    <a href="#" className="btn custom-btn-secondary icon-wrapper video_model">
                                        <i className="bi bi-play-fill fs-4" />
                                    </a>
                                </span> */}
                                {/* <span className="ms-1 d-none d-md-inline-flex">Watch a Demo</span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Pagenotfound