import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
const Dashbord = () => {
  let navigate = useNavigate();
  let userid = secureLocalStorage.getItem("userid")
  const [visible, setVisible] = useState(false);
  let localamaunt = Number(localStorage.getItem("amount_store"));
  const [width, setWidth] = useState(window.innerWidth);
  const [amaunt, getamaunt] = useState(1000);
  let [showprofiledata, setshowprofiledata] = useState({})

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
      navigate("/");
      localStorage.removeItem("loginstatus");
    };
  };


  // add amount hadnel funcation
  let setamounthandel = (event) => {
    event.preventDefault();
    let objdata = {
      "userId": "userid",
      "amount": amaunt
    }
    console.log(objdata)
    axios.post("http://157.66.191.24:3051/user/api/addUserAmount", objdata).then((res) => {
      console.lol(res)
      if (res.data.result == "true") {
        toast.success(res.data.message)
        localStorage.setItem("amount_store", amaunt);
      } else {
      }
    }).catch((error) => {
      if (error.response && error.response.status === 400) {
      } else {
      }
    })
  };

  // get data getUser_profile
  useEffect(() => {
    let objdata = {
      "userId": userid
    }
    axios.post("http://157.66.191.24:3051/user/api/getUser_profile", objdata).then((res) => {
      if (res.data.result == "true") {
        // console.log(res.data.data[0])
        setshowprofiledata(res.data.data[0])
      } else {

      }
    }).catch((error) => {
      if (error.response && error.response.status === 400) {
      } else {
      }
    })
  }, [])

  return (
    <>
      <Dialog
        header="Deposit"
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
                  <form className="needs-validation" noValidate>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Amount</label>
                      <input
                        onChange={(event) => getamaunt(event.target.value)}
                        type="number"
                        className="form-control form-control-th rounded-pill form-control form-control-th rounded-pill-th rounded-pill"
                        id="exampleInputEmail1"
                        required
                      />
                    </div>
                    {/* <div className="mb-3">
                      <label className="form-label fw-bold">UTR Number</label>
                      <input
                        type="Number"
                        className="form-control form-control-th rounded-pill form-control form-control-th rounded-pill-th rounded-pill"
                        id="exampleInputPassword1"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Payment Screenshot
                      </label>
                      <input
                        type="file"
                        className="form-control form-control-th rounded-pill form-control form-control-th rounded-pill-th rounded-pill"
                        id="exampleInputPassword1"
                        required
                      />
                    </div> */}
                    <div className="my-3">
                      <button
                        onClick={setamounthandel}
                        className="rounded-pill btn custom-btn-primary primary-btn-effect d-flex w-100 justify-content-center align-items-center"
                      >
                        Submit
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
            {width < 991 ? (
              ""
            ) : (
              <div className="col-12 col-lg-3">
                {/* dashboard sidebar tabs */}
                <div className="dashboard-tab">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
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
                    </li>
                    <li className="nav-item" role="presentation">
                      <Link to="/mybets">
                        <button
                          className="nav-link"
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
                          className="nav-link"
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
                          Deposit
                        </button>
                      </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                      <Link to="/withdrawal">
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
                          Withdraw
                        </button>
                      </Link>
                    </li>

                    <li className="nav-item" role="presentation">
                      <Link to="/transaction_user">
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
                  className="tab-pane fade show active"
                  id="dashboard-tab-pane"
                  role="tabpanel"
                  aria-labelledby="dashboard-tab"
                  tabIndex={0}
                >
                  {/* 1. dashboard section */}
                  <div className="row mt-3 mt-lg-0">
                    <div className="col-12 col-md-6 col-lg-4 mb-4" onClick={() => navigate("/profile")}>
                      <div className="p-4 theme-transparent-bg theme-border-radius text-center">
                        {
                          showprofiledata?.userProfile === " " || showprofiledata?.userProfile === null || showprofiledata?.userProfile === undefined ? (
                            <img
                              style={{ width: "75px", height: "75px" }}
                              src="./logo/newlogo.png"
                              alt="images"
                              className="rounded-circle"
                            />
                          ) : showprofiledata?.userProfile?.startsWith("https://") ? (
                            <img
                              style={{ width: "75px", height: "75px" }}
                              src={`http://157.66.191.24:3051/uploads/${showprofiledata?.userProfile}`}
                              alt="images"
                              className="rounded-circle"
                            />
                          ) : (
                            <img
                              style={{ width: "75px", height: "75px" }}
                              src={`http://157.66.191.24:3051/uploads/${showprofiledata?.userProfile}`}
                              alt="images"
                              className="rounded-circle"
                            />
                          )
                        }
                        <h5 className="my-3">{showprofiledata?.userName || "user"}</h5>
                        <p className="mb-0">ID: {showprofiledata?.uniqueName || "user12345"}</p>
                      </div>
                    </div>
                    {/* repetable */}
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                      <div className="p-4 theme-transparent-bg theme-border-radius text-center">
                        <img
                          src="assets/images/icons/dashboard-sidebar-icon-1.png"
                          alt="images"
                          className="rounded-circle"
                        />
                        <div className="d-flex justify-content-between mt-3">
                          <p className="mb-0">Available Balance</p>
                          <h5 className="my-0">
                            {localamaunt > 0 ? localamaunt : "$00.00"}
                          </h5>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-3">
                          <a href="javascript:void(0)" className="btn btn-success mb-0">
                            Add Money
                          </a>
                          <a

                            onClick={() => setVisible(true)}
                            className="mb-0 btn btn-danger"
                          >
                            Withdraw
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* repetable */}
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                      <div className="p-4 theme-transparent-bg theme-border-radius text-center">
                        <figure className="mb-3 hero-image">
                          <img
                            src="assets/images/icons/dashboard-sidebar-icon-2.png"
                            alt="images"
                            className="rounded-circle"
                          />
                        </figure>
                        <h5 className="m-0">Need Help?</h5>
                        <p className="mt-3 mb-0">write at info@example.com</p>
                      </div>
                    </div>
                    {/* repetable */}
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12 col-md-6 col-lg-3 mb-4">
                          <div className="theme-box-shadow theme-border-radius p-2 theme-bg-white theme-transparent-bg">
                            <div className="row g-0">
                              <div className="col-4 overflow-hidden theme-border-radius">
                                <div className="overflow-hidden">
                                  <figure className="mb-0">
                                    <img
                                      src="assets/images/icons/dashboard-icon01.png"
                                      className="img-fluid"
                                      alt="dashboard icon 01"
                                      title="dashboard icon 01"
                                    />
                                  </figure>
                                </div>
                              </div>
                              <div className="col-8">
                                <Link to="/total_match">
                                  <div className="ps-md-0 ps-xxl-3 d-flex justify-content-between align-items-center h-100">
                                    <div className="d-flex flex-column">
                                      <span className="d-flex fw-bold">
                                        Total Match
                                      </span>
                                      <span className="fw-bold price theme-text-secondary">
                                        699
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* dashboard features */}
                        <div className="col-12 col-md-6 col-lg-3 mb-4">
                          <div className="theme-box-shadow theme-border-radius p-2 theme-bg-white theme-transparent-bg">
                            <div className="row g-0">
                              <div className="col-4 overflow-hidden theme-border-radius">
                                <div className="overflow-hidden">
                                  <figure className="mb-0">
                                    <img
                                      src="assets/images/icons/dashboard-icon02.png"
                                      className="img-fluid"
                                      alt="dashboard icon 01"
                                      title="dashboard icon 01"
                                    />
                                  </figure>
                                </div>
                              </div>
                              <div className="col-8">
                                <Link to="/win_match">
                                  <div className="ps-md-0 ps-xxl-3 d-flex justify-content-between align-items-center h-100">
                                    <div className="d-flex flex-column">
                                      <span className="d-flex fw-bold">
                                        Win Match
                                      </span>
                                      <span className="fw-bold price theme-text-secondary">
                                        34
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* dashboard features */}
                        <div className="col-12 col-md-6 col-lg-3 mb-4">
                          <div className="theme-box-shadow theme-border-radius p-2 theme-bg-white theme-transparent-bg">
                            <div className="row g-0">
                              <div className="col-4 overflow-hidden theme-border-radius">
                                <div className="overflow-hidden">
                                  <figure className="mb-0">
                                    <img
                                      src="assets/images/icons/dashboard-icon03.png"
                                      className="img-fluid"
                                      alt="dashboard icon 03"
                                      title="dashboard icon 03"
                                    />
                                  </figure>
                                </div>
                              </div>
                              <div className="col-8">
                                <div className="ps-md-0 ps-xxl-3 d-flex justify-content-between align-items-center h-100">
                                  <div className="d-flex flex-column">
                                    <span className="d-flex fw-bold">
                                      Prizes Pool
                                    </span>
                                    <span className="fw-bold price theme-text-secondary">
                                      210
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* dashboard features */}
                        <div className="col-12 col-md-6 col-lg-3 mb-4">
                          <div className="theme-box-shadow theme-border-radius p-2 theme-bg-white theme-transparent-bg">
                            <div className="row g-0">
                              <div className="col-4 overflow-hidden theme-border-radius">
                                <div className="overflow-hidden">
                                  <figure className="mb-0">
                                    <img
                                      src="assets/images/icons/dashboard-icon04.png"
                                      className="img-fluid"
                                      alt="dashboard icon 04"
                                      title="dashboard icon 04"
                                    />
                                  </figure>
                                </div>
                              </div>
                              <div className="col-8">
                                <div className="ps-md-0 ps-xxl-3 d-flex justify-content-between align-items-center h-100">
                                  <div className="d-flex flex-column">
                                    <span className="d-flex fw-bold">
                                      Offer Amount
                                    </span>
                                    <span className="fw-bold price theme-text-secondary">
                                      <i className="bi bi-currency-dollar" />
                                      10
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* dashboard features */}
                      </div>
                      {/* recent activity section */}
                      <div className="d-flex flex-column theme-border-radius theme-bg-white theme-box-shadow mb-4">
                        {/* my wallet section */}
                        <div className="d-flex justify-content-between p-3 wallet-head">
                          <span className="fs-5 fw-bold">Recent Activity</span>
                          <span className="font-small">Total 6 Activity</span>
                        </div>
                        {/* my booking section */}
                        <div className="p-0 p-lg-3">
                          <div className="tble_wrap">
                            <div className="table-responsive theme-border-radius">
                              {/* booking table */}
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <th>Date/Time</th>
                                    <th>Type</th>
                                    <th>Points</th>
                                    <th>Amount</th>
                                  </tr>
                                  <tr>
                                    <td>2023-01-05 15:33:53</td>
                                    <td>Deposit</td>
                                    <td>2500</td>
                                    <td>
                                      <img
                                        src="assets/images/icons/btc.png"
                                        alt="icon"
                                      />{" "}
                                      0.00016556
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2023-01-05 15:33:53</td>
                                    <td>Withdraw</td>
                                    <td>1500</td>
                                    <td>
                                      <img
                                        src="assets/images/icons/btc.png"
                                        alt="icon"
                                      />{" "}
                                      0.00016556
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2023-01-05 15:33:53</td>
                                    <td>Commision</td>
                                    <td>1700</td>
                                    <td>
                                      <img
                                        src="assets/images/icons/btc.png"
                                        alt="icon"
                                      />{" "}
                                      0.00016556
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2023-01-05 15:33:53</td>
                                    <td>Deposit</td>
                                    <td>2100</td>
                                    <td>
                                      <img
                                        src="assets/images/icons/btc.png"
                                        alt="icon"
                                      />{" "}
                                      0.00016556
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2023-01-05 15:33:53</td>
                                    <td>Withdraw</td>
                                    <td>1900</td>
                                    <td>
                                      <img
                                        src="assets/images/icons/btc.png"
                                        alt="icon"
                                      />{" "}
                                      0.00016556
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2023-01-05 15:33:53</td>
                                    <td>Commision</td>
                                    <td>1500</td>
                                    <td>
                                      <img
                                        src="assets/images/icons/btc.png"
                                        alt="icon"
                                      />{" "}
                                      0.00016556
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* recent transaction section */}
                      <div className="d-flex flex-column theme-border-radius theme-bg-white theme-box-shadow">
                        {/* my wallet section */}
                        <div className="d-flex justify-content-between p-3 wallet-head">
                          <span className="fs-5 fw-bold">
                            Recent Transaction
                          </span>
                          <span className="font-small">
                            Total 11 Transaction
                          </span>
                        </div>
                        {/* my transaction section */}
                        <div className="p-0 p-lg-3">
                          <div className="tble_wrap">
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
                                    <td>$754.00</td>
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
                                    <td>Refer com.</td>
                                    <td>$754.00</td>
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
                                    <td>$754.00</td>
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
                                    <td>Refer com.</td>
                                    <td>$754.00</td>
                                    <td>
                                      <span className="text-danger">
                                        Canceled
                                      </span>
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
                                    <td>$754.00</td>
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
                                    <td>Refer com.</td>
                                    <td>$754.00</td>
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
                                    <td>USDT</td>
                                    <td>$754.00</td>
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
                                    <td>USDT</td>
                                    <td>$754.00</td>
                                    <td>
                                      <span className="text-danger">
                                        Canceled
                                      </span>
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
                                    <td>USDT</td>
                                    <td>$754.00</td>
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
                                    <td>USDT</td>
                                    <td>$754.00</td>
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
                <div
                  className="tab-pane fade"
                  id="myBets-tab-pane"
                  role="tabpanel"
                  aria-labelledby="myBets-tab"
                  tabIndex={0}
                >
                  {/* 2. my bet content */}
                  <div className="px-0">
                    <div className="row">
                      {/* open play game */}
                      <div className="col-12">
                        <div className="d-flex justify-content-between py-3 wallet-head">
                          <span className="fs-5 fw-bold">Current Game</span>
                          <span className="font-small">Total 1 Activity</span>
                        </div>
                      </div>
                      {/* tournament card */}
                      <div className="col-12">
                        <div className="tournament-card theme-border-radius theme-border mb-4 theme-bg-white">
                          <div className="head-sec py-3 px-3 pb-0">
                            <span className="d-inline-flex rounded-pill py-2 tag">
                              International T20 Series
                            </span>
                            <span className="d-inline-flex small">
                              22nd Match, April 15, 2023
                            </span>
                          </div>
                          <div className="body-sec py-3 px-3">
                            <div className="d-flex align-self-center align-items-center">
                              <div className="me-3">
                                <h3 className="fs-6 fw-bold mb-2">
                                  Gaming Team
                                </h3>
                                <span className="fs-5 fw-bold theme-text-secondary">
                                  GRD
                                </span>
                              </div>
                              <figure className="mb-0 icon-bg">
                                <img
                                  src="assets/images/teams/game-logo-01.png"
                                  className="img-fluid"
                                  alt="Games team"
                                />
                              </figure>
                            </div>
                            <div className="vs p-4">VS</div>
                            <div className="d-flex align-self-center align-items-center text-end">
                              <figure className="mb-0 icon-bg">
                                <img
                                  src="assets/images/teams/game-logo-02.png"
                                  className="img-fluid"
                                  alt="Games team"
                                />
                              </figure>
                              <div className="ms-3">
                                <h3 className="fs-6 fw-bold mb-2">
                                  Soccer Club
                                </h3>
                                <span className="fs-5 fw-bold theme-text-secondary">
                                  SCB
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="foot py-2 px-3">
                            <p className="mb-0 fw-bold">
                              Teams Joined : 2777/40000
                            </p>
                            <button
                              className="rounded-pill btn custom-link font-small"
                              type="button"
                            >
                              Join Now
                            </button>
                          </div>
                        </div>
                        {/* repetable */}
                        <div className="col-12">
                          <div className="tournament-card theme-border-radius theme-border mb-4 theme-bg-white">
                            <div className="head-sec py-3 px-3 pb-0">
                              <span className="d-inline-flex rounded-pill py-2 tag">
                                England, Premier League
                              </span>
                              <span className="d-inline-flex small">
                                23rd Match, April 16, 2023
                              </span>
                            </div>
                            <div className="body-sec py-3 px-3">
                              <div className="d-flex align-self-center align-items-center">
                                <div className="me-3">
                                  <h3 className="fs-6 fw-bold mb-2">
                                    West Ham
                                  </h3>
                                  <span className="fs-5 fw-bold theme-text-secondary">
                                    WHT
                                  </span>
                                </div>
                                <figure className="mb-0 icon-bg">
                                  <img
                                    src="assets/images/teams/game-logo-03.png"
                                    className="img-fluid"
                                    alt="Games team"
                                  />
                                </figure>
                              </div>
                              <div className="vs p-4">VS</div>
                              <div className="d-flex align-self-center align-items-center text-end">
                                <figure className="mb-0 icon-bg">
                                  <img
                                    src="assets/images/teams/game-logo-04.png"
                                    className="img-fluid"
                                    alt="Games team"
                                  />
                                </figure>
                                <div className="ms-3">
                                  <h3 className="fs-6 fw-bold mb-2">
                                    Barcelona FC
                                  </h3>
                                  <span className="fs-5 fw-bold theme-text-secondary">
                                    BFC
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="foot py-2 px-3">
                              <p className="mb-0 fw-bold">
                                Teams Joined : 2777/40000
                              </p>
                              <button
                                className="rounded-pill btn custom-link font-small"
                                type="button"
                              >
                                Join Now
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* repetable */}
                      </div>
                    </div>
                    <div className="row">
                      {/* canceled play game */}
                      <div className="col-12">
                        <div className="d-flex justify-content-between py-3 wallet-head">
                          <span className="fs-5 fw-bold">Canceled Game</span>
                          <span className="font-small">Total 1 Activity</span>
                        </div>
                      </div>
                      {/* tournament card */}
                      <div className="col-12">
                        <div className="tournament-card theme-border-radius theme-border mb-4 theme-bg-white">
                          <div className="head-sec py-3 px-3 pb-0">
                            <span className="d-inline-flex rounded-pill py-2 tag">
                              FEFA. Champions League
                            </span>
                            <span className="d-inline-flex small">
                              12th Match, April 11, 2023
                            </span>
                          </div>
                          <div className="body-sec py-3 px-3">
                            <div className="d-flex align-self-center align-items-center">
                              <div className="me-3">
                                <h3 className="fs-6 fw-bold mb-2">
                                  True Madrid
                                </h3>
                                <span className="fs-5 fw-bold theme-text-secondary">
                                  TMD
                                </span>
                              </div>
                              <figure className="mb-0 icon-bg">
                                <img
                                  src="assets/images/teams/game-logo-05.png"
                                  className="img-fluid"
                                  alt="Games team"
                                />
                              </figure>
                            </div>
                            <div className="vs p-4">VS</div>
                            <div className="d-flex align-self-center align-items-center text-end">
                              <figure className="mb-0 icon-bg">
                                <img
                                  src="assets/images/teams/game-logo-06.png"
                                  className="img-fluid"
                                  alt="Games team"
                                />
                              </figure>
                              <div className="ms-3">
                                <h3 className="fs-6 fw-bold mb-2">
                                  Manchester Club
                                </h3>
                                <span className="fs-5 fw-bold theme-text-secondary">
                                  MHC
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="foot py-2 px-3">
                            <p className="mb-0 fw-bold">
                              Teams Joined : 2777/40000
                            </p>
                            <button
                              className="rounded-pill btn custom-link font-small"
                              type="button"
                            >
                              Join Now
                            </button>
                          </div>
                        </div>
                        {/* repetable */}
                      </div>
                    </div>
                    <div className="row">
                      {/* finished play game */}
                      <div className="col-12">
                        <div className="d-flex justify-content-between py-3 wallet-head">
                          <span className="fs-5 fw-bold">Finished Games</span>
                          <span className="font-small">Total 1 Activity</span>
                        </div>
                      </div>
                      {/* tournament card */}
                      <div className="col-12">
                        <div className="tournament-card theme-border-radius theme-border mb-4 theme-bg-white">
                          <div className="head-sec py-3 px-3 pb-0">
                            <span className="d-inline-flex rounded-pill py-2 tag">
                              International Coppa Italia
                            </span>
                            <span className="d-inline-flex small">
                              22nd Match, April 16, 2024
                            </span>
                          </div>
                          <div className="body-sec py-3 px-3">
                            <div className="d-flex align-self-center align-items-center">
                              <div className="me-3">
                                <h3 className="fs-6 fw-bold mb-2">
                                  Inter Conta
                                </h3>
                                <span className="fs-5 fw-bold theme-text-secondary">
                                  ICT
                                </span>
                              </div>
                              <figure className="mb-0 icon-bg">
                                <img
                                  src="assets/images/teams/game-logo-07.png"
                                  className="img-fluid"
                                  alt="Games team"
                                />
                              </figure>
                            </div>
                            <div className="vs p-4">VS</div>
                            <div className="d-flex align-self-center align-items-center text-end">
                              <figure className="mb-0 icon-bg">
                                <img
                                  src="assets/images/teams/game-logo-08.png"
                                  className="img-fluid"
                                  alt="Games team"
                                />
                              </figure>
                              <div className="ms-3">
                                <h3 className="fs-6 fw-bold mb-2">
                                  Brentford United
                                </h3>
                                <span className="fs-5 fw-bold theme-text-secondary">
                                  BUD
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="foot py-2 px-3">
                            <p className="mb-0 fw-bold">
                              Teams Joined : 2777/40000
                            </p>
                            <button
                              className="rounded-pill btn custom-link font-small"
                              type="button"
                            >
                              Join Now
                            </button>
                          </div>
                        </div>
                        {/* repetable */}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="deposit-tab-pane"
                  role="tabpanel"
                  aria-labelledby="deposit-tab"
                  tabIndex={0}
                >
                  {/* 3. deposit content */}
                  <div className="p-3">
                    <div className="row">
                      <div className="col-12 text-center">
                        <h5 className="fs-5 fw-bold mb-3">Deposit</h5>
                        <p className="mb-3">
                          Please choose your payment method
                        </p>
                      </div>
                      <div className="col-12 col-lg-8 offset-lg-2">
                        <div className="theme-border-radius theme-transparent-bg p-4">
                          <form action="#">
                            <div className="row">
                              <div className="col-12">
                                <div className="mb-3">
                                  <label>Choose Cryptocurrency</label>
                                  <div className="select-wrap">
                                    <select>
                                      <option value={1}>ADA</option>
                                      <option value={2}>BCH</option>
                                      <option value={3}>BNB</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="mb-3">
                                  <label>Deposit Amount</label>
                                  <div className="input-select-wrap d-flex align-items-center">
                                    <input type="text" placeholder="e.g. 100" />
                                    <select>
                                      <option value={1}>USD</option>
                                      <option value={2}>INR</option>
                                      <option value={3}>AUD</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12">
                                <ul className="currency-amount">
                                  <li>
                                    <a href="javascript:void(0)">$100</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">$200</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">$300</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">$400</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">$500</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">$600</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">$700</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">$800</a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-12 mt-3 text-center">
                                <button className="rounded-pill btn custom-btn-primary primary-btn-effect d-inline-flex justify-content-center align-items-center px-5">
                                  Deposit
                                </button>
                                <div className="mt-4">
                                  <h6 className="theme-text-accent-three">
                                    Processing fee:
                                  </h6>
                                  <p className="mb-0">
                                    Your deposit will also have 0.0006 BTC
                                    subtracted the transaction fee.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="withdraw-tab-pane"
                  role="tabpanel"
                  aria-labelledby="withdraw-tab"
                  tabIndex={0}
                >
                  {/* 4. withdraw content */}
                  <div className="p-3">
                    <div className="row">
                      <div className="col-12 text-center">
                        <h5 className="fs-5 fw-bold mb-3">Withdrawal</h5>
                        <p className="mb-3">
                          Maximum withdrawal amount is $100
                        </p>
                      </div>
                      <div className="col-12 col-lg-8 offset-lg-2">
                        <div className="theme-border-radius theme-transparent-bg p-4">
                          <form action="#">
                            <div className="row">
                              <div className="col-12">
                                <div className="mb-3">
                                  <label>Available to withdraw</label>
                                  <div className="balance">
                                    0.1018183873 <span>BTC</span>
                                  </div>
                                  <p className="mb-0 text-center">
                                    1BTC = 49,345.50 USD
                                  </p>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="mb-3">
                                  <label>Withdrawal Amount</label>
                                  <div className="input-select-wrap d-flex align-items-center">
                                    <input type="text" placeholder="e.g. 100" />
                                    <select>
                                      <option value={1}>USD</option>
                                      <option value={2}>INR</option>
                                      <option value={3}>AUD</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12">
                                <ul className="currency-amount">
                                  <li>
                                    <a href="javascript:void(0)">$100</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">$200</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">$300</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">$400</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">$500</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">$600</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">$700</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">$800</a>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-lg-12 mt-3 text-center">
                                <button className="rounded-pill btn custom-btn-primary primary-btn-effect d-inline-flex justify-content-center align-items-center px-5">
                                  Withdrawal
                                </button>
                                <div className="mt-4">
                                  <h6 className="theme-text-accent-three">
                                    Processing fee:
                                  </h6>
                                  <p className="mb-0">
                                    Your deposit will also have 0.0006 BTC
                                    subtracted the transaction fee.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className=" tab-pane fade"
                  id="buyCrypto-tab-pane"
                  role="tabpanel"
                  aria-labelledby="buyCrypto-tab"
                  tabIndex={0}
                >
                  {/* 5. buy crypto content */}
                  <div className="p-3">
                    <div className="row">
                      <div className="col-12 text-center">
                        <h5 className="fs-5 fw-bold mb-3">
                          Buy cryptocurrency directly to your Account
                        </h5>
                        <p className="mb-3">
                          Choose the crypto you want to buy, enter the below
                          details
                        </p>
                      </div>
                      <div className="col-12 col-lg-8 offset-lg-2">
                        <div className="theme-border-radius theme-transparent-bg p-4">
                          <form action="#">
                            <div className="row">
                              <div className="col-6">
                                <div className="mb-3">
                                  <label>Choose Coins</label>
                                  <div className="select-wrap">
                                    <select>
                                      <option value={1}>BTC</option>
                                      <option value={2}>ETH</option>
                                      <option value={3}>LTC</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="mb-3">
                                  <label>Select Payment</label>
                                  <div className="select-wrap">
                                    <select>
                                      <option value={1}>Visa</option>
                                      <option value={2}>Credit</option>
                                      <option value={3}>Master</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="mb-3">
                                  <label>Choose Amount</label>
                                  <div className="input-select-wrap d-flex align-items-center">
                                    <input type="text" placeholder="e.g. 100" />
                                    <select>
                                      <option value={1}>USD</option>
                                      <option value={2}>INR</option>
                                      <option value={3}>AUD</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12 mt-3 text-center">
                                <button className="rounded-pill btn custom-btn-primary primary-btn-effect d-inline-flex justify-content-center align-items-center px-5">
                                  Buy Now
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-12 text-center mt-3">
                        <h5 className="fs-5 fw-bold mb-3">OR</h5>
                        <p className="mb-3">
                          Choose the best offer from our partners
                        </p>
                      </div>
                      <div className="col-12 col-lg-8 offset-lg-2 mb-3">
                        <div className="theme-border-radius theme-transparent-bg p-4">
                          <div className="row g-0">
                            <div className="col-12 col-lg-4 align-self-center">
                              <h3 className="fs-6 mb-3 mb-lg-0">
                                You will get
                              </h3>
                              <p className="mb-0">0.003091 BTC</p>
                            </div>
                            <div className="col-12 col-lg-4 align-self-center">
                              <h3 className="fs-6 mb-3 mb-lg-0">
                                Rate with fee
                              </h3>
                              <p className="mb-0">39254.59 USD</p>
                            </div>
                            <div className="col-12 col-lg-4">
                              <div className="d-flex justify-content-end">
                                <button className="rounded-pill btn custom-btn-primary primary-btn-effect d-inline-flex justify-content-center align-items-center px-5">
                                  Buy Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* repetable */}
                      <div className="col-12 col-lg-8 offset-lg-2 mb-3">
                        <div className="theme-border-radius theme-transparent-bg p-4">
                          <div className="row g-0">
                            <div className="col-12 col-lg-4 align-self-center">
                              <h3 className="fs-6 mb-3 mb-lg-0">
                                You will get
                              </h3>
                              <p className="mb-0">0.003091 BTC</p>
                            </div>
                            <div className="col-12 col-lg-4 align-self-center">
                              <h3 className="fs-6 mb-3 mb-lg-0">
                                Rate with fee
                              </h3>
                              <p className="mb-0">39254.59 USD</p>
                            </div>
                            <div className="col-12 col-lg-4">
                              <div className="d-flex justify-content-end">
                                <button className="rounded-pill btn custom-btn-primary primary-btn-effect d-inline-flex justify-content-center align-items-center px-5">
                                  Buy Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* repetable */}
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="affiliate-tab-pane"
                  role="tabpanel"
                  aria-labelledby="affiliate-tab"
                  tabIndex={0}
                >
                  {/* 6. affilate content */}
                  <div className="mb-4">
                    <div className="row">
                      <div className="col-12">
                        <h5 className="fs-5 fw-bold mb-3">Affiliate Center</h5>
                        <p className="mb-3">
                          Get a reward up to 55% for inviting one new gamer!
                        </p>
                      </div>
                      <div className="col-md-4 mb-3 mb-md-0">
                        <div className="p-4 theme-transparent-bg theme-border-radius text-center">
                          <p className="mb-3">Your Earned Referral</p>
                          <img
                            src="assets/images/icons/earned-referral-icon-1.png"
                            alt="icon"
                          />
                          <h4 className="mt-3 mb-0">$2956.00</h4>
                        </div>
                      </div>
                      {/* repetable */}
                      <div className="col-md-4 mb-3 mb-md-0">
                        <div className="p-4 theme-transparent-bg theme-border-radius text-center">
                          <p className="mb-3">Earning Last Month</p>
                          <img
                            src="assets/images/icons/earned-referral-icon-2.png"
                            alt="icon"
                          />
                          <h4 className="mt-3 mb-0">$208.00</h4>
                        </div>
                      </div>
                      {/* repetable */}
                      <div className="col-md-4 mb-3 mb-md-0">
                        <div className="p-4 theme-transparent-bg theme-border-radius text-center">
                          <p className="mb-3">Earning This Week</p>
                          <img
                            src="assets/images/icons/earned-referral-icon-3.png"
                            alt="icon"
                          />
                          <h4 className="mt-3 mb-0">$100.00</h4>
                        </div>
                      </div>
                      {/* repetable */}
                    </div>
                  </div>
                  <div className="theme-border-radius theme-transparent-bg p-3">
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center align-self-center mb-4">
                          <h5 className="fs-5 fw-bold mb-0">
                            Referral Transaction
                          </h5>
                          <div className="input-area d-flex align-items-center">
                            <input
                              type="text"
                              id="dateSelect"
                              placeholder="Select Date From"
                            />
                            <i className="bi bi-calendar3" />
                          </div>
                        </div>
                        <div className="table-responsive theme-border-radius">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Username</th>
                                <th>Earned</th>
                                <th>E-mail</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>16 04 2023</td>
                                <td>Online</td>
                                <td>Kis26Chim</td>
                                <td>$55</td>
                                <td>Kis26Chim@gmail.com</td>
                              </tr>
                              <tr>
                                <td>17 04 2023</td>
                                <td>Advertisment</td>
                                <td>TisWell34</td>
                                <td>$45</td>
                                <td>Tiswell34@gmail.com</td>
                              </tr>
                              <tr>
                                <td>19 04 2023</td>
                                <td>PPC</td>
                                <td>Chim30Kis</td>
                                <td>$40</td>
                                <td>Chim30Kis@gmail.com</td>
                              </tr>
                              <tr>
                                <td>26 04 2023</td>
                                <td>Mobile</td>
                                <td>yello@mim</td>
                                <td>$142</td>
                                <td>yello432@gmail.com</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="theme-border-radius theme-transparent-bg p-3 mt-4">
                    <p className="fs-5 fw-bold mb-3">Your Affiliate Link</p>
                    <div className="input-area">
                      <input
                        type="text"
                        defaultValue="aa12vsdeakjjfuekmlhgpuhgtye"
                      />
                      <i className="bi bi-back" />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="transactions-tab-pane"
                  role="tabpanel"
                  aria-labelledby="transactions-tab"
                  tabIndex={0}
                >
                  {/* 7. transactions content */}
                  <div className="theme-border-radius theme-transparent-bg p-3">
                    <form action="#" className="row">
                      <div className="col-12 align-self-center">
                        <div className="row">
                          <div className="col-12 col-md-6 align-self-center">
                            <p className="fs-5 fw-bold mb-0 theme-text-secondary">
                              Search By
                            </p>
                          </div>
                          <div className="col-12 col-md-6 text-end align-self-center">
                            <button className="rounded-pill btn custom-link">
                              Filter
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12 col-md-4 mb-3">
                            <label>Date</label>
                            <div className="select-wrap">
                              <select>
                                <option value={1}>2021/01</option>
                                <option value={2}>2021/02</option>
                                <option value={3}>2021/03</option>
                                <option value={4}>2021/04</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-md-4 mb-3">
                            <label>Tran. Type</label>
                            <div className="select-wrap">
                              <select>
                                <option value={1}>Deposit</option>
                                <option value={2}>Withdrawal</option>
                                <option value={3}>Commision</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-md-4 mb-3">
                            <label>Coin Type</label>
                            <div className="select-wrap">
                              <select>
                                <option value={1}>Currency 1</option>
                                <option value={2}>Currency 2</option>
                                <option value={3}>Currency 3</option>
                                <option value={4}>Currency 4</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    {/* transactions table */}
                    {/* recent transaction section */}
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
                <div
                  className="tab-pane fade"
                  id="setting-tab-pane"
                  role="tabpanel"
                  aria-labelledby="setting-tab"
                  tabIndex={0}
                >
                  {/* 8. personal details */}
                  <div className="theme-border-radius theme-transparent-bg p-3">
                    <h5 className="fs-5 fw-bold mb-4">Manage Details</h5>
                    <form action="#">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label htmlFor="perFname">User Name</label>
                            <div className="input-area">
                              <input
                                type="text"
                                id="perFname"
                                placeholder="Enter User Name"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label htmlFor="perLname">User Email</label>
                            <div className="input-area">
                              <input
                                type="text"
                                id="perLname"
                                placeholder="Enter Your Email"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label htmlFor="birth">Your Age</label>
                            <div className="input-area">
                              <input
                                type="text"
                                id="birth"
                                placeholder="Enter Date Of Birth"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label htmlFor="phone">Phone/Mobile</label>
                            <div className="input-area">
                              <input
                                type="text"
                                id="phone"
                                placeholder="Enter Phone/Mobile Number"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label htmlFor="address">Mailing Address</label>
                            <div className="input-area">
                              <input
                                type="text"
                                id="address"
                                placeholder="Enter Your Address"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label htmlFor="postalcode">Pin Code</label>
                            <div className="input-area">
                              <input
                                type="text"
                                id="postalcode"
                                placeholder="Enter Location Pin"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label>Country</label>
                            <div className="select-wrap">
                              <select>
                                <option value={1}>Select Country</option>
                                <option value={2}>Country 01</option>
                                <option value={3}>Country 02</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label htmlFor="city">City</label>
                            <div className="input-area">
                              <input
                                type="text"
                                id="city"
                                placeholder="Enter Your City"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label htmlFor="state">State</label>
                            <div className="input-area">
                              <input
                                type="text"
                                id="state"
                                placeholder="Enter Your State"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label>Select Identity Proof</label>
                            <div className="select-wrap">
                              <select>
                                <option value={1}>Passport</option>
                                <option value={2}>Nation ID Card</option>
                                <option value={3}>Driving License</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="file-upload">
                            <label className="file">
                              <input type="file" />
                              <span className="file-custom" />
                            </label>
                          </div>
                        </div>
                        <div className="col-12 mt-5 mt-lg-2 text-center">
                          <button className="rounded-pill btn custom-btn-primary primary-btn-effect d-inline-flex justify-content-center align-items-center px-5">
                            Change Details
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="password-tab-pane"
                  role="tabpanel"
                  aria-labelledby="password-tab"
                  tabIndex={0}
                >
                  {/* 9. password details */}
                  <div className="theme-border-radius theme-transparent-bg  p-3">
                    <h5 className="fs-5 fw-bold mb-4">Manage Login Password</h5>
                    <form action="#">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label htmlFor="loginoldpass">
                              Current Password
                            </label>
                            <div className="input-area">
                              <input
                                type="text"
                                id="loginoldpass"
                                placeholder="Type Current Password"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label htmlFor="loginnewpass">New Password</label>
                            <div className="input-area">
                              <input
                                type="password"
                                id="loginnewpass"
                                placeholder="Type New Password"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label htmlFor="loginconfirmpass">
                              Confirm Password
                            </label>
                            <div className="input-area">
                              <input
                                type="password"
                                id="loginconfirmpass"
                                placeholder="ReType Password"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12 mt-3">
                          <button className="rounded-pill btn custom-btn-primary primary-btn-effect d-inline-flex justify-content-center align-items-center px-5">
                            Chnage Password
                          </button>
                        </div>
                      </div>
                    </form>
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

export default Dashbord;
