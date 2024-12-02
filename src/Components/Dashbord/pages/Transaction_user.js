import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Transaction_user = () => {
    let navigate = useNavigate();

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


    const [width, setWidth] = useState(window.innerWidth);
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
                                            <Link to="/dashboard">
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
                                                    Dashboard
                                                </button>
                                            </Link>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <Link to="/mybets">
                                                <button
                                                    className="nav-link "
                                                    id="myBets-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#myBets-tab-pane"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="myBets-tab-pane"
                                                    aria-selected="false"
                                                >
                                                    <i className="bi bi-box-seam fs-5 me-2 align-middle" />
                                                    My Bets
                                                </button>
                                            </Link>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <Link to="/bat_history">
                                                <button
                                                    className="nav-link "
                                                    id="myBets-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#myBets-tab-pane"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="myBets-tab-pane"
                                                    aria-selected="false"
                                                >
                                                    <i className="bi bi-box-seam fs-5 me-2 align-middle" />
                                                    Bet History
                                                </button>
                                            </Link>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <Link to="/deposit">
                                                <button
                                                    className="nav-link "
                                                    id="deposit-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#deposit-tab-pane"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="deposit-tab-pane"
                                                    aria-selected="false"
                                                >
                                                    <i className="bi bi-cash-coin fs-5 me-2 align-middle" />
                                                    Deposit
                                                </button>
                                            </Link>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <Link to="/withdrawal">
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
                                                    Withdraw
                                                </button>
                                            </Link>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <Link to="/transaction_user">
                                                <button
                                                    className="nav-link active"
                                                    id="transactions-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#transactions-tab-pane"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="transactions-tab-pane"
                                                    aria-selected="false"
                                                >
                                                    <i className="bi bi-receipt fs-5 me-2 align-middle" />
                                                    Transactions
                                                </button>
                                            </Link>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <Link to="/manage_Login_Password">
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
                        )}

                        <div className="col-12 col-lg-9">
                            {/* tab content */}
                            <div className="tab-content" id="myTabContent">
                                <div
                                >
                                    <div className="d-flex flex-column theme-border-radius theme-bg-white theme-box-shadow">
                                        {/* my wallet section */}
                                        <div className="d-flex justify-content-between p-3 wallet-head">
                                            <span className="fs-5 fw-bold">Recent Transaction</span>
                                            <span className="font-small">Total 11 Transaction</span>
                                        </div>
                                        {/* my transaction section */}
                                        <div className="mt-2">
                                            <div className="table-responsive theme-border-radius">
                                                {/* transaction table */}
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Sl no.</th>
                                                            <th>Transaction ID</th>
                                                            <th>Transaction Type</th>
                                                            <th>Transaction amount</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>01</td>
                                                            <td>#LT2906HM475F</td>
                                                            <td>Deposit</td>
                                                            <td>
                                                                <img
                                                                    src="assets/images/icons/btc.png"
                                                                    alt="icon"
                                                                />
                                                                0.00016556
                                                            </td>
                                                            <td>
                                                                <span className="text-success">
                                                                    CONFIRMED
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="theme-text-secondary">
                                                                    <i className="bi bi-eye-fill" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>02</td>
                                                            <td>#LT2906HM475F</td>
                                                            <td>Commision</td>
                                                            <td>
                                                                <img
                                                                    src="assets/images/icons/btc.png"
                                                                    alt="icon"
                                                                />
                                                                0.00016556
                                                            </td>
                                                            <td>
                                                                <span className="text-success">
                                                                    CONFIRMED
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="theme-text-secondary">
                                                                    <i className="bi bi-eye-fill" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>03</td>
                                                            <td>#LT2906HM475F</td>
                                                            <td>Deposit</td>
                                                            <td>
                                                                <img
                                                                    src="assets/images/icons/btc.png"
                                                                    alt="icon"
                                                                />
                                                                0.00016556
                                                            </td>
                                                            <td>
                                                                <span className="text-success">
                                                                    CONFIRMED
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="theme-text-secondary">
                                                                    <i className="bi bi-eye-fill" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>04</td>
                                                            <td>#LT2906HM475F</td>
                                                            <td>Commision</td>
                                                            <td>
                                                                <img
                                                                    src="assets/images/icons/btc.png"
                                                                    alt="icon"
                                                                />
                                                                0.00016556
                                                            </td>
                                                            <td>
                                                                <span className="text-danger">Canceled</span>
                                                            </td>
                                                            <td>
                                                                <span className="theme-text-secondary">
                                                                    <i className="bi bi-eye-fill" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>05</td>
                                                            <td>#LT2906HM475F</td>
                                                            <td>Deposit</td>
                                                            <td>
                                                                <img
                                                                    src="assets/images/icons/btc.png"
                                                                    alt="icon"
                                                                />
                                                                0.00016556
                                                            </td>
                                                            <td>
                                                                <span className="text-success">
                                                                    CONFIRMED
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="theme-text-secondary">
                                                                    <i className="bi bi-eye-fill" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>06</td>
                                                            <td>#LT2906HM475F</td>
                                                            <td>Commision</td>
                                                            <td>
                                                                <img
                                                                    src="assets/images/icons/btc.png"
                                                                    alt="icon"
                                                                />
                                                                0.00016556
                                                            </td>
                                                            <td>
                                                                <span className="text-success">
                                                                    CONFIRMED
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="theme-text-secondary">
                                                                    <i className="bi bi-eye-fill" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>07</td>
                                                            <td>#LT2906HM475F</td>
                                                            <td>Withdrawal</td>
                                                            <td>
                                                                <img
                                                                    src="assets/images/icons/btc.png"
                                                                    alt="icon"
                                                                />
                                                                0.00016556
                                                            </td>
                                                            <td>
                                                                <span className="text-success">
                                                                    CONFIRMED
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="theme-text-secondary">
                                                                    <i className="bi bi-eye-fill" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>08</td>
                                                            <td>#LT2906HM475F</td>
                                                            <td>Commision</td>
                                                            <td>
                                                                <img
                                                                    src="assets/images/icons/btc.png"
                                                                    alt="icon"
                                                                />
                                                                0.00016556
                                                            </td>
                                                            <td>
                                                                <span className="text-danger">Canceled</span>
                                                            </td>
                                                            <td>
                                                                <span className="theme-text-secondary">
                                                                    <i className="bi bi-eye-fill" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>09</td>
                                                            <td>#LT2906HM475F</td>
                                                            <td>Commision</td>
                                                            <td>
                                                                <img
                                                                    src="assets/images/icons/btc.png"
                                                                    alt="icon"
                                                                />
                                                                0.00016556
                                                            </td>
                                                            <td>
                                                                <span className="text-success">
                                                                    CONFIRMED
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="theme-text-secondary">
                                                                    <i className="bi bi-eye-fill" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>10</td>
                                                            <td>#LT2906HM475F</td>
                                                            <td>Commision</td>
                                                            <td>
                                                                <img
                                                                    src="assets/images/icons/btc.png"
                                                                    alt="icon"
                                                                />
                                                                0.00016556
                                                            </td>
                                                            <td>
                                                                <span className="text-success">
                                                                    CONFIRMED
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="theme-text-secondary">
                                                                    <i className="bi bi-eye-fill" />
                                                                </span>
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
            </section>
        </>
    );
};

export default Transaction_user;
