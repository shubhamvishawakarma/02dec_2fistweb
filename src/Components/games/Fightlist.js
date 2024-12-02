import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GoDotFill } from "react-icons/go";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ProgressSpinner } from 'primereact/progressspinner';

const Fightlist = () => {
    let navigate = useNavigate()
    let uid = useParams();
    let [loader, setloader] = useState(true)
    let [showbatlist, setshowbatlist] = useState([])

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        let dataobj = {
            "categoryId": uid?.uid,
            "currentDate": formattedDate
        }
        axios.post(`${process.env.REACT_APP_API_KEY}MatchList`, dataobj).then((res) => {
            if (res.data.result == "true") {
                setshowbatlist(res.data.data)
            } else {
            }
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
                navigate(`*`)
            } else {
            }
        })
    }, [uid?.uid])



    /// get data from match list 
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    let objdata = {
        "categoryId": uid?.uid,
        "currentDate": formattedDate
    }
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['MatchList'],
        queryFn: async () =>
            fetch(`${process.env.REACT_APP_API_KEY}MatchList`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objdata),
            }).then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            }),
    });


    // go to team bet details 
    let team_details = (obj) => {
        navigate(`/teambet/${obj?._id}`)
    }



    return (
        <>
            {/* tournaments section */}
            <section className="tournaments py-5">
                <div className="container">
                    <div className="row animate__animated wow animate__fadeInUp">
                        <div className="col-12 text-center">
                            <p className="mt-5 mb-3 theme-text-secondary fs-4 fw-bold highlight">Live
                                Tournament  Events</p>
                            <h2 className="display-5 mb-3 font-black max">Bets in the Championship Games</h2>
                        </div>
                    </div>


                    {isLoading == true ? (
                        <div className='text-center mt-5'>
                            <ProgressSpinner style={{ width: '100px', height: '100px' }} strokeWidth="4" animationDuration=".5s" />
                        </div>
                    ) : (
                        <div className="row my-5">
                            {data?.data?.length > 0 ? (
                                <>
                                    {data?.data?.map((items, index) => {
                                        return (
                                            <div onClick={() => team_details(items)} key={index} className="col-12 col-lg-6 animate__animated wow animate__fadeInUp" >
                                                <div className="tournament-card theme-border-radius theme-border mb-4 theme-bg-white">
                                                    <div className="head-sec py-3 px-3 pb-0">
                                                        <span className="d-inline-flex rounded-pill py-2 tag"> {items?.leagueName}</span>
                                                        <span style={{ lineHeight: "12px", color: "red" }} className="d-inline-flex small">Live <GoDotFill /></span>
                                                    </div>
                                                    <div className="body-sec py-3 px-3">
                                                        <div className="d-flex align-self-center align-items-center">
                                                            <div className="me-3">
                                                                <h3 className="fs-6 fw-bold mb-2"> {items?.teamName1}</h3>
                                                                <span className="fs-5 fw-bold theme-text-secondary"> {items?.sortName1}</span>
                                                            </div>
                                                            <figure className="mb-0 icon-bg">
                                                                {
                                                                    items?.logo1
                                                                        === " " || items?.logo1
                                                                        === null || items?.logo1
                                                                        === undefined ? (
                                                                        <img
                                                                            style={{ width: "90px", height: "90px", borderRadius: "50%" }}
                                                                            className="img-fluid"
                                                                            alt="Games team"
                                                                            src="./logo/newlogo.png"
                                                                        />
                                                                    ) : items?.logo1
                                                                        ?.startsWith("https://") ? (
                                                                        <img
                                                                            style={{ width: "90px", height: "90px", borderRadius: "50%" }}
                                                                            className="img-fluid"
                                                                            alt="Games team"
                                                                            src={`http://157.66.191.24:3051/uploads/${items?.logo1
                                                                                }`}
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            style={{ width: "90px", height: "90px", borderRadius: "50%" }}
                                                                            className="img-fluid"
                                                                            alt="Games team"
                                                                            src={`http://157.66.191.24:3051/uploads/${items?.logo1
                                                                                }`}
                                                                        />
                                                                    )
                                                                }

                                                            </figure>
                                                        </div>
                                                        <div className="vs">VS</div>
                                                        <div className="d-flex align-self-center align-items-center text-end">
                                                            <figure className="mb-0 icon-bg">
                                                                {
                                                                    items?.logo2
                                                                        === " " || items?.logo2
                                                                        === null || items?.logo2
                                                                        === undefined ? (
                                                                        <img
                                                                            style={{ width: "90px", height: "90px", borderRadius: "50%" }}
                                                                            className="img-fluid"
                                                                            alt="Games team"
                                                                            src="./logo/newlogo.png"
                                                                        />
                                                                    ) : items?.logo2
                                                                        ?.startsWith("https://") ? (
                                                                        <img
                                                                            style={{ width: "90px", height: "90px", borderRadius: "50%" }}
                                                                            className="img-fluid"
                                                                            alt="Games team"
                                                                            src={`http://157.66.191.24:3051/uploads/${items?.logo2
                                                                                }`}
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            style={{ width: "90px", height: "90px", borderRadius: "50%" }}
                                                                            className="img-fluid"
                                                                            alt="Games team"
                                                                            src={`http://157.66.191.24:3051/uploads/${items?.logo2
                                                                                }`}
                                                                        />
                                                                    )
                                                                }

                                                            </figure>
                                                            <div className="ms-3">
                                                                <h3 className="fs-6 fw-bold mb-2"> {items?.teamName2}</h3>
                                                                <span className="fs-5 fw-bold theme-text-secondary"> {items?.sortName2}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="foot py-2 px-3">
                                                        <div className="text-center">
                                                            <p className="mb-0 fw-bold">Start at : {items?.start_time}<span id="countdown-timer-1" /></p>
                                                        </div>
                                                        <button className="rounded-pill btn custom-link font-small" type="button" onClick={() => team_details(items)}>Join Now</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            ) : (
                                <div className='wow animate__animated wow animate__fadeInUp' style={{ height: "400px" }}>
                                    <div className='text-center mt-5'>
                                        <img
                                            className="img-fluid"
                                            style={{ width: "100px", height: "100px" }}
                                            alt="Games team"
                                            src="./imglist/datanotfound_logo.png"
                                        />
                                    </div>
                                    <div className="group text-center">
                                        <h6 className="display-5 mb-3 font-black">Data Not Found</h6>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}


                    {/* <div className="row my-5">
                        <div className="col-12 col-lg-6 animate__animated wow animate__fadeInUp" onClick={() => team_details(items)}>
                            <div className="tournament-card theme-border-radius theme-border mb-4 theme-bg-white">
                                <div className="head-sec py-3 px-3 pb-0">
                                    <span className="d-inline-flex rounded-pill py-2 tag">International
                                        T20 Series</span>
                                    <span style={{ lineHeight: "12px", color: "red" }} className="d-inline-flex small">Live <GoDotFill /></span>
                                </div>
                                <div className="body-sec py-3 px-3">
                                    <div className="d-flex align-self-center align-items-center">
                                        <div className="me-3">
                                            <h3 className="fs-6 fw-bold mb-2">Gaming Team</h3>
                                            <span className="fs-5 fw-bold theme-text-secondary">GRD</span>
                                        </div>
                                        <figure className="mb-0 icon-bg">
                                            <img src="assets/images/teams/game-logo-01.png" className="img-fluid" alt="Games team" />
                                        </figure>
                                    </div>
                                    <div className="vs">VS</div>
                                    <div className="d-flex align-self-center align-items-center text-end">
                                        <figure className="mb-0 icon-bg">
                                            <img src="assets/images/teams/game-logo-02.png" className="img-fluid" alt="Games team" />
                                        </figure>
                                        <div className="ms-3">
                                            <h3 className="fs-6 fw-bold mb-2">Soccer Club</h3>
                                            <span className="fs-5 fw-bold theme-text-secondary">SCB</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="foot py-2 px-3">
                                    <div className="text-center">
                                        <p className="mb-0 fw-bold">Start at <span id="countdown-timer-1" /></p>
                                    </div>
                                    <button className="rounded-pill btn custom-link font-small" type="button" onClick={() => team_details(items)}>Join Now</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 animate__animated wow animate__fadeInUp" onClick={() => team_details(items)}>
                            <div className="tournament-card theme-border-radius theme-border mb-4 theme-bg-white">
                                <div className="head-sec py-3 px-3 pb-0">
                                    <span className="d-inline-flex rounded-pill py-2 tag">England, Premier League</span>
                                    <span style={{ lineHeight: "12px", color: "red" }} className="d-inline-flex small">Live <GoDotFill /></span>
                                </div>
                                <div className="body-sec py-3 px-3">
                                    <div className="d-flex align-self-center align-items-center">
                                        <div className="me-3">
                                            <h3 className="fs-6 fw-bold mb-2">West Ham</h3>
                                            <span className="fs-5 fw-bold theme-text-secondary">WHT</span>
                                        </div>
                                        <figure className="mb-0 icon-bg">
                                            <img src="assets/images/teams/game-logo-03.png" className="img-fluid" alt="Games team" />
                                        </figure>
                                    </div>
                                    <div className="vs">VS</div>
                                    <div className="d-flex align-self-center align-items-center text-end">
                                        <figure className="mb-0 icon-bg">
                                            <img src="assets/images/teams/game-logo-04.png" className="img-fluid" alt="Games team" />
                                        </figure>
                                        <div className="ms-3">
                                            <h3 className="fs-6 fw-bold mb-2">Barcelona FC</h3>
                                            <span className="fs-5 fw-bold theme-text-secondary">BFC</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="foot py-2 px-3">
                                    <div className="text-center">
                                        <p className="mb-0 fw-bold">Start at <span id="countdown-timer-2" /></p>
                                    </div>
                                    <button className="rounded-pill btn custom-link font-small" type="button" onClick={() => team_details(items)}>Join Now</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 animate__animated wow animate__fadeInUp" onClick={() => team_details(items)}>
                            <div className="tournament-card theme-border-radius theme-border mb-4 theme-bg-white">
                                <div className="head-sec py-3 px-3 pb-0">
                                    <span className="d-inline-flex rounded-pill py-2 tag">FEFA. Champions League</span>
                                    <span style={{ lineHeight: "12px", color: "red" }} className="d-inline-flex small">Live <GoDotFill /></span>
                                </div>
                                <div className="body-sec py-3 px-3">
                                    <div className="d-flex align-self-center align-items-center">
                                        <div className="me-3">
                                            <h3 className="fs-6 fw-bold mb-2">True Madrid</h3>
                                            <span className="fs-5 fw-bold theme-text-secondary">TMD</span>
                                        </div>
                                        <figure className="mb-0 icon-bg">
                                            <img src="assets/images/teams/game-logo-05.png" className="img-fluid" alt="Games team" />
                                        </figure>
                                    </div>
                                    <div className="vs">VS</div>
                                    <div className="d-flex align-self-center align-items-center text-end">
                                        <figure className="mb-0 icon-bg">
                                            <img src="assets/images/teams/game-logo-06.png" className="img-fluid" alt="Games team" />
                                        </figure>
                                        <div className="ms-3">
                                            <h3 className="fs-6 fw-bold mb-2">Manchester Club</h3>
                                            <span className="fs-5 fw-bold theme-text-secondary">MHC</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="foot py-2 px-3">
                                    <div className="text-center">
                                        <p className="mb-0 fw-bold">Start at <span id="countdown-timer-3" /></p>
                                    </div>
                                    <button className="rounded-pill btn custom-link font-small" type="button" onClick={() => team_details(items)}>Join Now</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 animate__animated wow animate__fadeInUp" onClick={() => team_details(items)}>
                            <div className="tournament-card theme-border-radius theme-border mb-4 theme-bg-white">
                                <div className="head-sec py-3 px-3 pb-0">
                                    <span className="d-inline-flex rounded-pill py-2 tag">International
                                        Coppa Italia</span>
                                    <span style={{ lineHeight: "12px", color: "red" }} className="d-inline-flex small">Live <GoDotFill /></span>
                                </div>
                                <div className="body-sec py-3 px-3">
                                    <div className="d-flex align-self-center align-items-center">
                                        <div className="me-3">
                                            <h3 className="fs-6 fw-bold mb-2">Inter Conta</h3>
                                            <span className="fs-5 fw-bold theme-text-secondary">ICT</span>
                                        </div>
                                        <figure className="mb-0 icon-bg">
                                            <img src="assets/images/teams/game-logo-07.png" className="img-fluid" alt="Games team" />
                                        </figure>
                                    </div>
                                    <div className="vs">VS</div>
                                    <div className="d-flex align-self-center align-items-center text-end">
                                        <figure className="mb-0 icon-bg">
                                            <img src="assets/images/teams/game-logo-08.png" className="img-fluid" alt="Games team" />
                                        </figure>
                                        <div className="ms-3">
                                            <h3 className="fs-6 fw-bold mb-2">Brentford United</h3>
                                            <span className="fs-5 fw-bold theme-text-secondary">BUD</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="foot py-2 px-3">
                                    <div className="text-center">
                                        <p className="mb-0 fw-bold">Start at <span id="countdown-timer-4" /></p>
                                    </div>
                                    <button className="rounded-pill btn custom-link font-small" type="button" onClick={() => team_details(items)}>Join Now</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 animate__animated wow animate__fadeInUp" onClick={() => team_details(items)}>
                            <div className="tournament-card theme-border-radius theme-border mb-4 theme-bg-white">
                                <div className="head-sec py-3 px-3 pb-0">
                                    <span className="d-inline-flex rounded-pill py-2 tag">International League Series</span>
                                    <span style={{ lineHeight: "12px", color: "red" }} className="d-inline-flex small">Live <GoDotFill /></span>
                                </div>
                                <div className="body-sec py-3 px-3">
                                    <div className="d-flex align-self-center align-items-center">
                                        <div className="me-3">
                                            <h3 className="fs-6 fw-bold mb-2">Leeds United</h3>
                                            <span className="fs-5 fw-bold theme-text-secondary">LUD</span>
                                        </div>
                                        <figure className="mb-0 icon-bg">
                                            <img src="assets/images/teams/game-logo-09.png" className="img-fluid" alt="Games team" />
                                        </figure>
                                    </div>
                                    <div className="vs">VS</div>
                                    <div className="d-flex align-self-center align-items-center text-end">
                                        <figure className="mb-0 icon-bg">
                                            <img src="assets/images/teams/game-logo-10.png" className="img-fluid" alt="Games team" />
                                        </figure>
                                        <div className="ms-3">
                                            <h3 className="fs-6 fw-bold mb-2">Crystal Palace</h3>
                                            <span className="fs-5 fw-bold theme-text-secondary">CPC</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="foot py-2 px-3">
                                    <div className="text-center">
                                        <p className="mb-0 fw-bold">Start at <span id="countdown-timer-5" /></p>
                                    </div>
                                    <button className="rounded-pill btn custom-link font-small" type="button" onClick={() => team_details(items)}>Join Now</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 animate__animated wow animate__fadeInUp" onClick={() => team_details(items)}>
                            <div className="tournament-card theme-border-radius theme-border mb-4 theme-bg-white">
                                <div className="head-sec py-3 px-3 pb-0">
                                    <span className="d-inline-flex rounded-pill py-2 tag">International League Series</span>
                                    <span style={{ lineHeight: "12px", color: "red" }} className="d-inline-flex small">Live <GoDotFill /></span>
                                </div>
                                <div className="body-sec py-3 px-3">
                                    <div className="d-flex align-self-center align-items-center">
                                        <div className="me-3">
                                            <h3 className="fs-6 fw-bold mb-2">Forest Nottingham</h3>
                                            <span className="fs-5 fw-bold theme-text-secondary">FNH</span>
                                        </div>
                                        <figure className="mb-0 icon-bg">
                                            <img src="assets/images/teams/game-logo-11.png" className="img-fluid" alt="Games team" />
                                        </figure>
                                    </div>
                                    <div className="vs">VS</div>
                                    <div className="d-flex align-self-center align-items-center text-end">
                                        <figure className="mb-0 icon-bg">
                                            <img src="assets/images/teams/game-logo-12.png" className="img-fluid" alt="Games team" />
                                        </figure>
                                        <div className="ms-3">
                                            <h3 className="fs-6 fw-bold mb-2">United Madrid</h3>
                                            <span className="fs-5 fw-bold theme-text-secondary">UMD</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="foot py-2 px-3">
                                    <div className="text-center">
                                        <p className="mb-0 fw-bold">Start at <span id="countdown-timer-6" /></p>
                                    </div>
                                    <button className="rounded-pill btn custom-link font-small" type="button" onClick={() => team_details(items)}>Join Now</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>
        </>
    )
}

export default Fightlist