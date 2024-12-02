import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import secureLocalStorage from "react-secure-storage";


const Completed_maches = () => {
    let navigate = useNavigate();
    let coordinator_userid = secureLocalStorage.getItem("coordinator_userid")
    const [opacity, setOpacity] = useState(1);

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


    return (
        <>

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
                                                <span className="fs-5 fw-bold">Completed Maches List</span>
                                            </div>
                                            {/* my booking section */}
                                            <div className="p-0 p-lg-3">
                                                <div className="tble_wrap">
                                                    <div className="table-responsive theme-border-radius">
                                                        {/* booking table */}
                                                        <table className="table">
                                                            <tbody>
                                                                <tr>
                                                                    <th>SR</th>
                                                                    <th>Teams</th>
                                                                    <th>Category</th>
                                                                    <th>Date/Time</th>
                                                                    <th>Type</th>
                                                                    <th>Total Amount</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Indore vs Bhopal</td>
                                                                    <td>kabbdi</td>
                                                                    <td>2023-01-05 15:33:53</td>
                                                                    <td className="text-success">Completed match</td>
                                                                    <td>
                                                                        <img
                                                                            src="assets/images/icons/btc.png"
                                                                            alt="icon"
                                                                        />{" "}
                                                                        10,000
                                                                    </td>
                                                                    <td style={{ display: "flex" }}>
                                                                        <button className="btn btn-danger">Delete</button>
                                                                        <button style={{ marginLeft: "5px" }} className="btn btn-info">Edit</button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Indore vs Bhopal</td>
                                                                    <td>kabbdi</td>
                                                                    <td>2023-01-05 15:33:53</td>
                                                                    <td className="text-success">Completed match</td>
                                                                    <td>
                                                                        <img
                                                                            src="assets/images/icons/btc.png"
                                                                            alt="icon"
                                                                        />{" "}
                                                                        10,000
                                                                    </td>
                                                                    <td style={{ display: "flex" }}>
                                                                        <button className="btn btn-danger">Delete</button>
                                                                        <button style={{ marginLeft: "5px" }} className="btn btn-info">Edit</button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Indore vs Bhopal</td>
                                                                    <td>kabbdi</td>
                                                                    <td>2023-01-05 15:33:53</td>
                                                                    <td className="text-success">Completed match</td>
                                                                    <td>
                                                                        <img
                                                                            src="assets/images/icons/btc.png"
                                                                            alt="icon"
                                                                        />{" "}
                                                                        10,000
                                                                    </td>
                                                                    <td style={{ display: "flex" }}>
                                                                        <button className="btn btn-danger">Delete</button>
                                                                        <button style={{ marginLeft: "5px" }} className="btn btn-info">Edit</button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Indore vs Bhopal</td>
                                                                    <td>kabbdi</td>
                                                                    <td>2023-01-05 15:33:53</td>
                                                                    <td className="text-success">Completed match</td>
                                                                    <td>
                                                                        <img
                                                                            src="assets/images/icons/btc.png"
                                                                            alt="icon"
                                                                        />{" "}
                                                                        10,000
                                                                    </td>
                                                                    <td style={{ display: "flex" }}>
                                                                        <button className="btn btn-danger">Delete</button>
                                                                        <button style={{ marginLeft: "5px" }} className="btn btn-info">Edit</button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Indore vs Bhopal</td>
                                                                    <td>kabbdi</td>
                                                                    <td>2023-01-05 15:33:53</td>
                                                                    <td className="text-success">Completed match</td>
                                                                    <td>
                                                                        <img
                                                                            src="assets/images/icons/btc.png"
                                                                            alt="icon"
                                                                        />{" "}
                                                                        10,000
                                                                    </td>
                                                                    <td style={{ display: "flex" }}>
                                                                        <button className="btn btn-danger">Delete</button>
                                                                        <button style={{ marginLeft: "5px" }} className="btn btn-info">Edit</button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Indore vs Bhopal</td>
                                                                    <td>kabbdi</td>
                                                                    <td>2023-01-05 15:33:53</td>
                                                                    <td className="text-success">Completed match</td>
                                                                    <td>
                                                                        <img
                                                                            src="assets/images/icons/btc.png"
                                                                            alt="icon"
                                                                        />{" "}
                                                                        10,000
                                                                    </td>
                                                                    <td style={{ display: "flex" }}>
                                                                        <button className="btn btn-danger">Delete</button>
                                                                        <button style={{ marginLeft: "5px" }} className="btn btn-info">Edit</button>
                                                                    </td>
                                                                </tr>
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

export default Completed_maches;
