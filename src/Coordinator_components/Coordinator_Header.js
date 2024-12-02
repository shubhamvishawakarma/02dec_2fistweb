import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import swal from "sweetalert";

const Coordinator_Header = () => {
  const navigate = useNavigate();
  let coordinator_userid = secureLocalStorage.getItem("coordinator_userid")
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
      secureLocalStorage.removeItem("coordinator_loginstatus")
      secureLocalStorage.removeItem("coordinator_userid")
      localStorage.removeItem("loginstatus");
      navigate("/coordinatorLogin");
    };
  };


  // get data getUser_profile
  useEffect(() => {
    let objdata = {
      "coordinatorId": coordinator_userid
    }
    axios.post("http://157.66.191.24:3051/user/api/getCoordinatorProfile", objdata).then((res) => {
      if (res.data.result == "true") {
        setshowprofiledata(res.data.data[0])
      } else {

      }
    }).catch((error) => {
      if (error.response && error.response.status === 400) {
      } else {
      }
    })
  }, [])


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


  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);


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
              <Link to="/coordinator_dashboard">
                <img
                  src="./logo/logonew.png"
                  className="img-fluid"
                  style={{ width: "15%" }}
                  alt="Brand Logo"
                  title="Brand Logo"
                />
              </Link>
              <button
                style={{ float: "right" }}
                className="navbar-toggler theme-bg-secondary border-0 menu-toggle"
                type="button"
                aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}
              >
                <span className="icon-bars" />
              </button>
            </div>
          </a>

          <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
            {windowSize?.width < 991 ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a onClick={() => hidecontroll("/coordinator_dashboard")} >
                    <button
                      className="nav-link active"
                    >
                      <i className="bi bi-speedometer fs-5 me-2 align-middle" />
                      Dashboard
                    </button>
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={() => hidecontroll("/addTeams")} >
                    <button
                      className="nav-link"
                    >
                      <i className="bi bi-speedometer fs-5 me-2 align-middle" />
                      Add Teams
                    </button>
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={() => hidecontroll("/coordinator_Teams_list")} >
                    <button
                      className="nav-link"
                    >
                      <i className="bi bi-box-seam fs-5 me-2 align-middle" />
                      My All Games
                    </button>
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={() => hidecontroll("/commission_List")} >
                    <button
                      className="nav-link"
                    >
                      <i className="bi bi-wallet fs-5 me-2 align-middle" />
                      My Commission
                    </button>
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a onClick={()=>hidecontroll("/all_Matches_List")} >
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
                  </a>
                </li> */}
                <li className="nav-item">
                  <a onClick={() => hidecontroll("/transactions_history")} >
                    <button
                      className="nav-link"
                    >
                      <i className="bi bi-coin fs-5 me-2 align-middle" />
                      Transactions History
                    </button>
                  </a>
                </li>
                <li onClick={logout_handel} className="nav-item">
                  <button
                    className="nav-link"
                    type="button"
                  >
                    <i className="bi bi-coin fs-5 me-2 align-middle" />
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a onClick={()=>hidecontroll("/coordinator_dashboard")}>
                    {
                      showprofiledata?.coordinatorProfile
                        === " " || showprofiledata?.coordinatorProfile
                        === null || showprofiledata?.coordinatorProfile
                        === undefined ? (
                        <img
                          style={{ marginTop: "4px", width: "50px", height: "50px" }}
                          alt="images"
                          className="rounded-circle"
                          src="./logo/newlogo.png"
                        />
                      ) : showprofiledata?.coordinatorProfile
                        ?.startsWith("https://") ? (
                        <img
                          style={{ marginTop: "4px", width: "50px", height: "50px" }}
                          alt="images"
                          className="rounded-circle"
                          src={`http://157.66.191.24:3051/uploads/${showprofiledata?.coordinatorProfile
                            }`}
                        />
                      ) : (
                        <img
                          style={{ marginTop: "4px", width: "50px", height: "50px" }}
                          alt="images"
                          className="rounded-circle"
                          src={`http://157.66.191.24:3051/uploads/${showprofiledata?.coordinatorProfile
                            }`}
                        />
                      )
                    }
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={()=>hidecontroll("/coordinator_dashboard")} className="nav-link nav-effect">
                    {showprofiledata?.coordinatorName} Coordinator
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

export default Coordinator_Header;
