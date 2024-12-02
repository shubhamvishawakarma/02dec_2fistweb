import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import swal from "sweetalert";

const Header = () => {
  const navigate = useNavigate();
  let userid = secureLocalStorage.getItem("userid")
  let loginstatus = localStorage.getItem("loginstatus");
  let [showprofiledata, setshowprofiledata] = useState({})

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
      setIsNavCollapsed(!isNavCollapsed)
      navigate("/");
      localStorage.removeItem("loginstatus");
    };
  };


  // login handel
  let Loginhandel = () => {
    setIsNavCollapsed(!isNavCollapsed)
    navigate("/login");
  };
  let coordinatorLoginhandel = () => {
    setIsNavCollapsed(!isNavCollapsed)
    navigate("/coordinatorLogin");
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


  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);


  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

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


  let hidesetIsNavCollapsed = () => {
    setIsNavCollapsed(!isNavCollapsed)
    navigate("/")
  }

  // hide header controll
  let hidecontroll = (path) => {
    setIsNavCollapsed(!isNavCollapsed)
    navigate(path)
  }

  return (
    <>
      <header className="navbar navbar-expand-lg py-lg-0 py-2 px-0 theme-box-shadow header">
        <nav className="container">
          <a className="navbar-brand" >
            <div className="btn-wrapper">
              <Link to="/">
                <img
                  src="./logo/logonew.png"
                  className="img-fluid"
                  style={{ width: "15%" }}
                  alt="Brand Logo"
                  title="Brand Logo"
                />
              </Link>
              {/* <button
                style={{ float: "right" }}
                className="navbar-toggler theme-bg-secondary border-0 menu-toggle"
                type="button"
                data-label="Menu"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bars" />
              </button> */}

              <button
                style={{ float: "right" }}
                className="navbar-toggler theme-bg-secondary border-0 menu-toggle"
                type="button"
                aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}
              >
                <span className="icon-bars" />
              </button>

              {/* <button class="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
              <span className="icon-bars" />
              </button> */}

            </div>
          </a>

          <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
            {windowSize?.width < 991 ? (

              loginstatus === "true" ? (
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item" role="presentation">
                    <a onClick={() => hidecontroll("/dashboard")} >
                      <button
                        className="nav-link active"
                      >
                        <i className="bi bi-speedometer fs-5 me-2 align-middle" />
                        Dashboard
                      </button>
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a onClick={() => hidecontroll("/mybets")} >
                      <button
                        className="nav-link"
                      >
                        <i className="bi bi-box-seam fs-5 me-2 align-middle" />
                        My Bets
                      </button>
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a onClick={() => hidecontroll("/bat_history")} >
                      <button
                        className="nav-link"
                      >
                        <i className="bi bi-box-seam fs-5 me-2 align-middle" />
                        Bet History
                      </button>
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a onClick={() => hidecontroll("/deposit")} >
                      <button
                        className="nav-link"
                      >
                        <i className="bi bi-cash-coin fs-5 me-2 align-middle" />
                        Deposit
                      </button>
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a onClick={() => hidecontroll("/withdrawal")} >
                      <button
                        className="nav-link"
                      >
                        <i className="bi bi-wallet fs-5 me-2 align-middle" />
                        Withdraw
                      </button>
                    </a>
                  </li>

                  <li className="nav-item" role="presentation">
                    <a onClick={() => hidecontroll("/transaction_user")} >
                      <button
                        className="nav-link"
                      >
                        <i className="bi bi-receipt fs-5 me-2 align-middle" />
                        Transactions
                      </button>
                    </a>
                  </li>

                  <li className="nav-item" role="presentation">
                    <a onClick={() => hidecontroll("/manage_Login_Password")} >
                      <button
                        className="nav-link"
                      >
                        <i className="bi bi-person-check fs-5 me-2 align-middle" />
                        Password
                      </button>
                    </a>
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

              ) : (
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link nav-effect" onClick={hidesetIsNavCollapsed}>
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    {loginstatus === "true" ? (
                      <a onClick={hidesetIsNavCollapsed}>
                        {
                          showprofiledata?.userProfile === " " || showprofiledata?.userProfile === null || showprofiledata?.userProfile === undefined ? (
                            <img
                              style={{ marginTop: "4px", width: "50px", height: "50px" }}
                              alt="images"
                              className="rounded-circle"
                              src="./logo/newlogo.png"
                            />
                          ) : showprofiledata?.userProfile?.startsWith("https://") ? (
                            <img
                              style={{ marginTop: "4px", width: "50px", height: "50px" }}
                              alt="images"
                              className="rounded-circle"
                              src={`http://157.66.191.24:3051/uploads${showprofiledata?.userProfile}`}
                            />
                          ) : (
                            <img
                              style={{ marginTop: "4px", width: "50px", height: "50px" }}
                              alt="images"
                              className="rounded-circle"
                              src={`http://157.66.191.24:3051/uploads${showprofiledata?.userProfile}`}
                            />
                          )
                        }
                      </a>
                    ) : (
                      <a onClick={Loginhandel} className="nav-link nav-effect" to="/contact">
                        User Login/Register
                      </a>
                    )}
                  </li>
                  <li className="nav-item">
                    <a onClick={coordinatorLoginhandel} className="nav-link nav-effect" to="/contact">
                      Fight Coordinator Login/Register
                    </a>

                  </li>
                  <li onClick={logout_handel} className="nav-item" >
                    <button
                      className="nav-link"
                      type="button"
                    >
                      Logout
                    </button>
                  </li>

                </ul>
              )
            ) : (

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a onClick={hidesetIsNavCollapsed} className="nav-link nav-effect">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  {loginstatus === "true" ? (
                    <Link to="/dashboard">
                      {
                        showprofiledata?.userProfile === " " || showprofiledata?.userProfile === null || showprofiledata?.userProfile === undefined ? (
                          <img
                            style={{ marginTop: "4px", width: "50px", height: "50px" }}
                            alt="images"
                            className="rounded-circle"
                            src="./logo/newlogo.png"
                          />
                        ) : showprofiledata?.userProfile?.startsWith("https://") ? (
                          <img
                            style={{ marginTop: "4px", width: "50px", height: "50px" }}
                            alt="images"
                            className="rounded-circle"
                            src={`http://157.66.191.24:3051/uploads/${showprofiledata?.userProfile}`}
                          />
                        ) : (
                          <img
                            style={{ marginTop: "4px", width: "50px", height: "50px" }}
                            alt="images"
                            className="rounded-circle"
                            src={`http://157.66.191.24:3051/uploads/${showprofiledata?.userProfile}`}
                          />
                        )
                      }
                    </Link>
                  ) : (
                    <a onClick={Loginhandel} className="nav-link nav-effect" to="/contact">
                      User Login/Register
                    </a>
                  )}
                </li>
                <li className="nav-item">
                  <a onClick={coordinatorLoginhandel} className="nav-link nav-effect" to="/contact">
                    Fight Coordinator Login/Register
                  </a>

                </li>
              </ul>
            )}
          </div>





        </nav>
      </header>
    </>
  );
};

export default Header;
