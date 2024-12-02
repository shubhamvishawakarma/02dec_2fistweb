import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import secureLocalStorage from "react-secure-storage";
const Commission_List = () => {
    let navigate = useNavigate();
    let coordinator_userid = secureLocalStorage.getItem("coordinator_userid")
    let [ComissionList, setComissionList] = useState([])

    let logout_handel = () => {
        swal({
            title: "Are you sure?",
            text: "You want to logout",
            icon: "warning",
            buttons: true,
            dangerMode: true,

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

    // coordinatorComissionList get list 
    useEffect(() => {
        let objdata = {
            "coordinatorId": coordinator_userid
        }
        axios.post("http://157.66.191.24:3051/user/api/coordinatorComissionList", objdata).then((res) => {

            if (res.data.result == "true") {
                setComissionList(res?.data?.data)
            } else {

            }
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
            } else {
            }
        })
    }, [])


    console.log("ComissionList", ComissionList)



    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });


    console.log(windowSize?.width)

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>

            {/* dashboard content section */}
            <section className="dashboard-section">
                {/* dashboard tab content */}
                <div className="container">
                    <div className="row justify-content-center">
                        {windowSize?.width < 991 ? (
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
                                                    className="nav-link "
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
                                                    className="nav-link "
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
                                                    My Commission
                                                </button>
                                            </Link>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <Link to="/all_Matches_List">
                                                <button
                                                    className="nav-link "
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
                                                <span className="fs-5 fw-bold">Commission List</span>
                                            </div>
                                            {/* my booking section */}
                                            <div className="p-0 p-lg-3">
                                                <div className="tble_wrap">
                                                    <div className="table-responsive theme-border-radius">
                                                        {/* booking table */}
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>SR</th>
                                                                    <th>Teams</th>
                                                                    <th>Date </th>
                                                                    <th>Time</th>
                                                                    <th>Type</th>
                                                                    <th>App Commission</th>
                                                                    <th>Total</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {ComissionList?.map((items, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{items?.teamName}</td>
                                                                            <td style={{ width: "16%" }}>{items?.createdAt}</td>
                                                                            <td>{items?.time}</td>
                                                                            <td>{items?.tranjectionType}</td>
                                                                            <td>{items?.appComission}</td>
                                                                            <td>{items?.totalPot}</td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
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

export default Commission_List;
