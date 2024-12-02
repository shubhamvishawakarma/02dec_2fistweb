import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";

const All_Matches_List = () => {
    let navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    let coordinator_userid = secureLocalStorage.getItem("coordinator_userid")
    const [width, setWidth] = useState(window.innerWidth);
    const [amaunt, getamaunt] = useState(1000);
    let [showprofiledata, setshowprofiledata] = useState({})
    const [preview, setPreview] = useState(null);
    const [preview2, setPreview2] = useState(null);
    const [show_teamlist, setshow_teamlist] = useState([]);

    // frist teams images Handle file input change
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // Generate local preview URL
        }
    };
    // secound teams images Handle file input change
    const handleImageChange2 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreview2(URL.createObjectURL(file)); // Generate local preview URL
        }
    };


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
            navigate("/coordinatorLogin");
            secureLocalStorage.removeItem("coordinator_loginstatus")
            secureLocalStorage.removeItem("coordinator_userid")
            localStorage.removeItem("loginstatus");
        };
    };

    let setamounthandel = (event) => {
        event.preventDefault();
        toast.success("Amaunt Add Successfully");
        localStorage.setItem("amount_store", amaunt);
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
                setshow_teamlist(res.data.data)
            } else {
            }
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
            } else {
            }
        })
    }


    // all match counts
    let livematch_count = show_teamlist.filter((items) => { return items.matchStatus === "Live" })
    let upcomingmatch_count = show_teamlist.filter((items) => { return items.matchStatus === "Upcoming" })
    let abandonmatch_count = show_teamlist.filter((items) => { return items.matchStatus === "Abandon" })
    let completedmatch_count = show_teamlist.filter((items) => { return items.matchStatus === "Completed" })


    return (
        <>

            {/* dashboard content section */}
            <section className="dashboard-section">
                {/* dashboard tab content */}
                <div className="container">
                    <div className="row justify-content-center">
                        {width < 991 ? (
                            ""
                        ) : (
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
                                                    My All Games
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
                                        {/* <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="affiliate-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#affiliate-tab-pane"
                                            type="button"
                                            role="tab"
                                            aria-controls="affiliate-tab-pane"
                                            aria-selected="false"
                                        >
                                            <i className="bi bi-file-person fs-5 me-2 align-middle" />
                                            Affiliate
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="transactions-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#transactions-tab-pane"
                                            type="button"
                                            role="tab"
                                            aria-controls="transactions-tab-pane"
                                            aria-selected="false"
                                        >
                                            <i className="bi bi-receipt fs-5 me-2 align-middle" />
                                            transactions
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="setting-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#setting-tab-pane"
                                            type="button"
                                            role="tab"
                                            aria-controls="setting-tab-pane"
                                            aria-selected="false"
                                        >
                                            <i className="bi bi-gear fs-5 me-2 align-middle" />
                                            Setting
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="password-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#password-tab-pane"
                                            type="button"
                                            role="tab"
                                            aria-controls="password-tab-pane"
                                            aria-selected="false"
                                        >
                                            <i className="bi bi-person-check fs-5 me-2 align-middle" />
                                            Password
                                        </button>
                                    </li> */}
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
                        )}

                        <div className="col-12 col-lg-9">
                            <div className="tab-content" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="dashboard-tab-pane"
                                    role="tabpanel"
                                    aria-labelledby="dashboard-tab"
                                    tabIndex={0}>
                                    <div className="p-3">
                                        <div className="d-flex flex-column theme-border-radius theme-bg-white theme-box-shadow mb-4">
                                            {/* my wallet section */}
                                            <div className="d-flex justify-content-between p-3 wallet-head">
                                                <span className="fs-5 fw-bold">Maches List</span>
                                            </div>
                                            {/* my booking section */}
                                            <div className="p-0 p-lg-3 row">
                                                <div className="col-12 col-md-6 col-lg-4 mb-4">
                                                    <Link to="/all_Teamsmatch_list">
                                                        <div className="p-4 theme-transparent-bg theme-border-radius text-center">
                                                            <img
                                                                src="assets/images/icons/dashboard-icon01.png"
                                                                alt="images"
                                                                className="rounded-circle"
                                                            />
                                                            <div className="d-flex justify-content-between mt-3">
                                                                <p className="mb-0">All Maches</p>
                                                                <h5 className="my-0">
                                                                    {show_teamlist?.length ? show_teamlist.length : 0}
                                                                </h5>
                                                            </div>

                                                        </div>
                                                    </Link>
                                                </div>


                                                <div className="col-12 col-md-6 col-lg-4 mb-4">
                                                    <Link to="/live_maches">
                                                        <div className="p-4 theme-transparent-bg theme-border-radius text-center">
                                                            <img
                                                                src="assets/images/icons/dashboard-icon03.png"
                                                                alt="images"
                                                                className="rounded-circle"
                                                            />
                                                            <div className="d-flex justify-content-between mt-3">
                                                                <p className="mb-0">Live Maches</p>
                                                                <h5 className="my-0">
                                                                    {livematch_count?.length ? livematch_count.length : 0}
                                                                </h5>
                                                            </div>

                                                        </div>
                                                    </Link>
                                                </div>

                                                <div className="col-12 col-md-6 col-lg-4 mb-4">
                                                    <Link to="/today_maches">
                                                        <div className="p-4 theme-transparent-bg theme-border-radius text-center">
                                                            <img
                                                                width={"80px"}
                                                                height={"80px"}
                                                                src="assets/images/icons/dashboard-icon01.png"
                                                                alt="images"
                                                                className="rounded-circle"
                                                            />
                                                            <div className="d-flex justify-content-between mt-3">
                                                                <p className="mb-0">Today  Maches</p>
                                                                <h5 className="my-0">
                                                                    30
                                                                </h5>
                                                            </div>

                                                        </div>
                                                    </Link>
                                                </div>

                                                <div className="col-12 col-md-6 col-lg-4 mb-4">

                                                    <Link to="/tomorrowMaches">
                                                        <div className="p-4 theme-transparent-bg theme-border-radius text-center">
                                                            <img
                                                                width={"80px"}
                                                                height={"80px"}
                                                                src="assets/images/icons/dashboard-icon01.png"
                                                                alt="images"
                                                                className="rounded-circle"
                                                            />
                                                            <div className="d-flex justify-content-between mt-3">
                                                                <p className="mb-0">UpComing  Maches</p>
                                                                <h5 className="my-0">
                                                                    {upcomingmatch_count?.length ? upcomingmatch_count.length : 0}
                                                                </h5>
                                                            </div>

                                                        </div>
                                                    </Link>
                                                </div>


                                                {/* <div className="col-12 col-md-6 col-lg-4 mb-4">
                                                    <div className="p-4 theme-transparent-bg theme-border-radius text-center">
                                                        <img
                                                            width={"100px"}
                                                            height={"80px"}
                                                            src="assets/images/icons/dashboard-icon02.png"
                                                            alt="images"
                                                        // className="rounded-circle"
                                                        />
                                                        <div className="d-flex justify-content-between mt-3">
                                                            <p className="mb-0">Win Maches</p>
                                                            <h5 className="my-0">
                                                                30
                                                            </h5>
                                                        </div>

                                                    </div>
                                                </div> */}

                                                <div className="col-12 col-md-6 col-lg-4 mb-4">
                                                    <Link to="/completed_maches">
                                                        <div className="p-4 theme-transparent-bg theme-border-radius text-center">
                                                            <img
                                                                width={"80px"}
                                                                height={"80px"}
                                                                src="./logo/Completed-PNG-File.png"
                                                                alt="images"
                                                                className="rounded-circle"
                                                            />
                                                            <div className="d-flex justify-content-between mt-3">
                                                                <p className="mb-0">Completed Maches</p>
                                                                <h5 className="my-0">

                                                                    {completedmatch_count?.length ? completedmatch_count.length : 0}

                                                                </h5>
                                                            </div>

                                                        </div>
                                                    </Link>
                                                </div>



                                                <div className="col-12 col-md-6 col-lg-4 mb-4">
                                                    <Link to="/canceled_maches">
                                                        <div className="p-4 theme-transparent-bg theme-border-radius text-center">
                                                            <img
                                                                width={"100px"}
                                                                height={"80px"}
                                                                src="./logo/cancelled-png.png"
                                                                alt="images"
                                                            // className="rounded-circle"
                                                            />
                                                            <div className="d-flex justify-content-between mt-3">
                                                                <p className="mb-0">Canceled Maches</p>
                                                                <h5 className="my-0">
                                                                    30
                                                                </h5>
                                                            </div>

                                                        </div>
                                                    </Link>
                                                </div>




                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default All_Matches_List;
