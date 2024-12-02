import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { MdEditDocument } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { ProgressSpinner } from "primereact/progressspinner";

const All_Teamsmatch_list = () => {
    let navigate = useNavigate();
    let coordinator_userid = secureLocalStorage.getItem("coordinator_userid")

    const [opacity, setOpacity] = useState(1);
    const [width, setWidth] = useState(window.innerWidth);
    const [visible, setVisible] = useState(false);

    let [show_teamlist, setshow_teamlist] = useState([])
    let [matchid, setmatchid] = useState("")

    // daynamicwidth get
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup function to remove the event listener when component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [width]);

    // logout hadnel
    let logout_handel = () => {
        swal({
            title: "Are you sure?",
            text: "You want to logout",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            // content: {
            //     element: "input",
            //     attributes: {
            //         placeholder: "Enter your reason for deletion",
            //         type: "text",
            //     },
            // },
        }).then((willDelete) => {
            if (willDelete) {
                userlogout();
            } else {
            }
        });
        let userlogout = () => {
            navigate("/");
            localStorage.removeItem("loginstatus");
        };
    };

    useEffect(() => {
        const animate = () => {
            setOpacity((prev) => (prev === 1 ? 0.5 : 1));
        };

        const intervalId = setInterval(animate, 500);

        return () => clearInterval(intervalId);
    }, []);

    const style = {
        lineHeight: "12px",
        color: "red",
        display: "inline-flex",
        alignItems: "center",
        opacity: opacity,
        transition: "opacity 0.5s ease-in-out"
    };

    // get coordinatorTeamList list data 
    useEffect(() => {
        getcoordinaitorlist()
    }, [])
    let getcoordinaitorlist = () => {
        let objdata = {
            "coordinatorId": coordinator_userid
        }
        axios.post(`${process.env.REACT_APP_API_KEY}coordinatorTeamList`, objdata).then((res) => {
            if (res.data.result == "true") {
                // setshow_teamlist(res.data.data)
            } else {
            }
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
            } else {
            }
        })
    }

    let objdata = {
        coordinatorId: coordinator_userid
    };

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['coordinatorTeamList'],
        queryFn: async () =>
            fetch(`${process.env.REACT_APP_API_KEY}coordinatorTeamList`, {
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


    // date formate coordinatorTeamList
    let formatDate = (dateString) => {
        let date = new Date(dateString);

        // Get the day with ordinal suffix
        let day = date.getDate();
        let suffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        // Get the month
        let month = date.toLocaleString('default', { month: 'long' });

        // Get the year
        let year = date.getFullYear();

        // Format the date in the desired format
        return `${day}${suffix(day)} ${month}, ${year}`;
    };

    // update match handel
    let updatematch = (event, matchid) => {
        let dataobj = {
            "coordinatorId": coordinator_userid,
            "matchId": matchid,
            "matchStatus": event.target.value
        }
        axios.post(`${process.env.REACT_APP_API_KEY}updateMatcheStatus`, dataobj).then((res) => {
            if (res?.data?.result == "true") {
                refetch()
                toast.success(res.data.message)
            } else {

            }
        }).catch((err) => {
            console.log(err)
            toast.error("Something Went Wrong")
        })
    };

    // update win match handel
    let update_win_march = (event, matchid) => {
        let dataobj = {
            "coordinatorId": coordinator_userid,
            "matchId": matchid,
            "winnerTeam": event.target.value
        }
        console.log("dataobj", dataobj)

        axios.post(`${process.env.REACT_APP_API_KEY}updateMatcheResult`, dataobj).then((res) => {
            if (res?.data?.result == "true") {
                getcoordinaitorlist()
                toast.success(res.data.message)
            } else {

            }
        }).catch((err) => {
            console.log(err)
            toast.error("Something Went Wrong")
        })
    };

    return (
        <>

            <Toaster />
            <Dialog
                header="Match Update"
                visible={visible}
                style={{ width: `${width < 1024 ? "90%" : "50vw"}` }}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}
            >
                <p className="m-0">
                    {/* login page section */}
                    <div className="">
                        <div className="theme-box-shadow theme-border-radius theme-transparent-bg p-4 p-lg-5">
                            {/* login content */}
                            <div className="row">
                                <div className="col-12">
                                    <form className="needs-validation" >
                                        <div className="mb-3">
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <div className="select-wrap">
                                                        <select name="matchStatus" style={{ width: "100%", height: "50px", backgroundColor: "#000849", borderRadius: "30px", color: "#fb2576" }}>
                                                            <option style={{ color: "white" }} hidden value={1}>Select Status</option>
                                                            <option style={{ color: "white" }} value={"Upcoming"}>Upcoming</option>
                                                            <option style={{ color: "white" }} value={"Live"}>Live</option>
                                                            <option style={{ color: "white" }} value={"Abandon"}>Abandon</option>
                                                            <option style={{ color: "white" }} value={"Completed"}>Completed</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="my-3">
                                            <button
                                                type="submit"
                                                className="rounded-pill btn custom-btn-primary  d-flex w-100 justify-content-center align-items-center "
                                            >
                                                Update Match
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </p>
            </Dialog>
            {/* dashboard content section */}
            <section className="dashboard-section">
                {/* dashboard tab content */}
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-3">
                            {/* dashboard sidebar tabs */}
                            <div className="dashboard-tab">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <Link to="/coordinator_dashboard">
                                            <button
                                                className="nav-link"
                                                id="deposit-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#deposit-tab-pane"
                                                type="button"
                                                role="tab"
                                                aria-controls="deposit-tab-pane"
                                                aria-selected="false"
                                            >
                                                <i className="bi bi-cash-coin fs-5 me-2 align-middle" />
                                                Dashboard
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <Link to="/addTeams">
                                            <button
                                                className="nav-link"
                                                id="dashboard-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#dashboard-tab-pane"
                                                type="button"
                                                role="tab"
                                                aria-controls="dashboard-tab-pane"
                                                aria-selected="true"
                                            >
                                                <i className="bi bi-speedometer fs-5 me-2 align-middle" />
                                                Add Teams
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <Link to="/coordinator_Teams_list">
                                            <button
                                                className="nav-link"
                                                id="myBets-tab"
                                                type="button"
                                                role="tab"
                                                aria-controls="myBets-tab-pane"
                                                aria-selected="false"
                                            >
                                                <i className="bi bi-box-seam fs-5 me-2 align-middle" />
                                                My All Teams
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <Link to="/commission_List">
                                            <button
                                                className="nav-link"
                                                id="withdraw-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#withdraw-tab-pane"
                                                type="button"
                                                role="tab"
                                                aria-controls="withdraw-tab-pane"
                                                aria-selected="false"
                                            >
                                                <i className="bi bi-wallet fs-5 me-2 align-middle" />
                                                My Commission
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <Link to="/all_Matches_List">
                                            <button
                                                className="nav-link active"
                                                id="withdraw-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#withdraw-tab-pane"
                                                type="button"
                                                role="tab"
                                                aria-controls="withdraw-tab-pane"
                                                aria-selected="false"
                                            >
                                                <i className="bi bi-wallet fs-5 me-2 align-middle" />
                                                My All Maches
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <Link to="/transactions_history">
                                            <button
                                                className="nav-link"
                                                id="buyCrypto-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#buyCrypto-tab-pane"
                                                type="button"
                                                role="tab"
                                                aria-controls="buyCrypto-tab-pane"
                                                aria-selected="false"
                                            >
                                                <i className="bi bi-coin fs-5 me-2 align-middle" />
                                                Transactions History
                                            </button>
                                        </Link>
                                    </li>

                                    <li onClick={logout_handel} className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            type="button"
                                            role="tab"
                                            aria-controls="password-tab-pane"
                                        >
                                            <i className="bi bi-person-check fs-5 me-2 align-middle" />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-12 col-lg-9">
                            <div className="d-flex justify-content-between p-3 wallet-head">
                                <span className="fs-5 fw-bold">All Maches List</span>
                            </div>
                            {isLoading == true ? (
                                <div className='text-center mt-5'>
                                    <ProgressSpinner style={{ width: '100px', height: '100px' }} strokeWidth="4" animationDuration=".5s" />
                                </div>
                            ) : (
                                <>

                                    {data?.data?.length > 0 ? (
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>SR</th>
                                                        <th style={{ width: "130px" }}>Images</th>
                                                        <th style={{ width: "130px" }}>Teams Name</th>
                                                        <th style={{ width: "130px" }}>Short Name </th>
                                                        <th style={{ width: "130px" }}>Category</th>
                                                        <th style={{ width: "130px" }}>Start Date</th>
                                                        <th style={{ width: "130px" }}>Start Time</th>
                                                        <th style={{ width: "130px" }}>League Name</th>
                                                        <th style={{ width: "130px" }}>Match Status</th>
                                                        <th style={{ width: "130px" }}>Win Status</th>
                                                        <th style={{ width: "130px" }}>Match Update</th>
                                                        <th style={{ width: "130px" }}>Update Win Teams</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {data?.data?.map((items, index) => {
                                                        return (
                                                            <tr className="text-center" key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>
                                                                    <figure className="mb-0 icon-bg">
                                                                        {
                                                                            items?.logo2
                                                                                === " " || items?.logo1
                                                                                === null || items?.logo1
                                                                                === undefined ? (
                                                                                <img
                                                                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                                                    className="img-fluid"
                                                                                    alt="Games team"
                                                                                    src="./logo/newlogo.png"
                                                                                />
                                                                            ) : items?.logo1
                                                                                ?.startsWith("https://") ? (
                                                                                <img
                                                                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                                                    className="img-fluid"
                                                                                    alt="Games team"
                                                                                    src={`http://157.66.191.24:3051/uploads/${items?.logo1
                                                                                        }`}
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                                                    className="img-fluid"
                                                                                    alt="Games team"
                                                                                    src={`http://157.66.191.24:3051/uploads/${items?.logo1
                                                                                        }`}
                                                                                />
                                                                            )
                                                                        }

                                                                    </figure>
                                                                    VS <br />
                                                                    <figure className="mb-0 icon-bg">
                                                                        {
                                                                            items?.logo2
                                                                                === " " || items?.logo2
                                                                                === null || items?.logo2
                                                                                === undefined ? (
                                                                                <img
                                                                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                                                    className="img-fluid"
                                                                                    alt="Games team"
                                                                                    src="./logo/newlogo.png"
                                                                                />
                                                                            ) : items?.logo2
                                                                                ?.startsWith("https://") ? (
                                                                                <img
                                                                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                                                    className="img-fluid"
                                                                                    alt="Games team"
                                                                                    src={`http://157.66.191.24:3051/uploads/${items?.logo2
                                                                                        }`}
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                                                    className="img-fluid"
                                                                                    alt="Games team"
                                                                                    src={`http://157.66.191.24:3051/uploads/${items?.logo2
                                                                                        }`}
                                                                                />
                                                                            )
                                                                        }

                                                                    </figure>
                                                                </td>
                                                                <td >{items?.teamName1} <br /> VS <br /> {items?.teamName2} </td>
                                                                <td >{items?.sortName1} <br /> VS <br /> {items?.sortName2} </td>
                                                                <td>{items?.categoryId?.categoryName}</td>
                                                                <td>{formatDate(items?.createdAt)}</td>
                                                                <td>{items?.start_time}</td>
                                                                <td>{items?.leagueName}</td>
                                                                <td>{items?.matchStatus}</td>
                                                                <td>Team ({items?.winnerTeam})</td>
                                                                {/* <td>  <span style={{ lineHeight: "12px", color: "red", border: "1px solid red", padding: "5px" }} className="d-inline-flex ">Live <GoDotFill style={style} /></span></td> */}
                                                                <td>
                                                                    <select name="matchStatus" onChange={(event) => updatematch(event, items?._id)}>
                                                                        <option hidden value={1}>Select Status</option>
                                                                        <option value={"Upcoming"}>Upcoming</option>
                                                                        <option value={"Live"}>Live</option>
                                                                        <option value={"Abandon"}>Abandon</option>
                                                                        <option value={"Completed"}>Completed</option>
                                                                    </select>
                                                                </td>
                                                                <td>
                                                                    <select name="matchStatus" onChange={(event) => update_win_march(event, items?._id)}>
                                                                        <option hidden value={1}>Select Status</option>
                                                                        <option value={"A"}>A</option>
                                                                        <option value={"B"}>B</option>
                                                                    </select>
                                                                </td>

                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
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

                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default All_Teamsmatch_list;
