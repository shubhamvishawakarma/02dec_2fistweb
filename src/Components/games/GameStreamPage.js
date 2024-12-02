import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Link, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

const GameStreamPage = () => {
  let localamaunt = Number(localStorage.getItem("amount_store"));
  const [amaunt, getamaunt] = useState(1000);
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  let bethandel = () => {
    // toast.success("bat successfully");
    let storedata = localamaunt;
    storedata -= 100;
    localStorage.setItem("amount_store", storedata);
    console.log(storedata);
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

  let setamounthandel = (event) => {
    event.preventDefault();
    toast.success("Amaunt Add Successfully");
    localStorage.setItem("amount_store", amaunt);
  };

  const [opacity, setOpacity] = useState(1);

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
      <Toaster />

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
                        defaultValue={1000}
                        onChange={(event) => getamaunt(event.target.value)}
                        type="number"
                        className="form-control form-control-th rounded-pill form-control form-control-th rounded-pill-th rounded-pill"
                        id="exampleInputEmail1"
                        required
                      />
                    </div>

                    <div className="my-3">
                      <button
                        onClick={setamounthandel}
                        type="submit"
                        className="rounded-pill btn custom-btn-primary primary-btn-effect d-flex w-100 justify-content-center align-items-center"
                        onclick="window.location.href='#';"
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
      <section className="tournaments py-5">
        <div className="container">
          <div className="row ">
            <div className="col-12 col-lg-12 animate__animated wow animate__fadeInUp">
              <div className="head-content text-center gamecontainerlive">
                {/* <p className="mt-5 mb-3 theme-text-secondary fs-4 fw-bold highlight">Are you ready for play game</p> */}
                <h1 className="display-5 mb-3 theme-text-white font-black max">
                  Live Tournament
                </h1>
                {/* <p className="mb-0 theme-text-white">Explore multiple options for maximum fun</p> */}
              </div>
              <div className="d-flex justify-content-end mt-3 mb-3 ">
                <div style={{ paddingRight: "15px" }}>
                  <p className="mb-0">Available Balance</p>
                  <h5 className="my-0">
                    {/* {localamaunt > 0 ? localamaunt : "$00.00"} */}
                    $10,000
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="animate__animated wow animate__fadeInUp gamestreampage ">
            <div className=" gamestreampage  tournament-card  theme-border-radius theme-border mb-4 theme-bg-white row pt-3">
              <div className="col-12 col-lg-6 bg">
                <div className="col-12 animate__animated wow animate__fadeInUp">
                  <div className="tournament-card box-shadow left-game-container theme-border-radius theme-border mb-4 theme-bg-white">
                    <span style={{ lineHeight: "12px", color: "red", border: "1px solid red", padding: "5px" }} className="d-inline-flex ">Live <GoDotFill style={style} /></span>
                    <video
                      width="100%"
                      // height="470"
                      style={{ borderRadius: "20px", marginTop: "10px" }}
                      src="./gameslogo/videoplayback.mp4"
                      autoPlay
                      muted
                      loop
                    />

                    <style>
                      {`
       video::-internal-media-controls-overlay-cast-button {
         display: none;
       }
       video::-webkit-media-controls-enclosure {
         display: none;
       }
       video::-webkit-media-controls-panel {
         display: none;
       }
     `}
                    </style>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mt-31">
                <div className="tournament-card theme-border-radius theme-border mb-1 theme-bg-white">
                  <div className="body-sec py-3 px-3">
                    <div className="d-flex align-self-center align-items-center">
                      <figure
                        className="mb-0 icon-bg"
                        style={{ width: "30%", height: "50%" }}
                      >
                        <img
                          src="assets/images/dashboard/profile-img.png"
                          className="img-fluid rounded-circle"
                          alt="Games team"
                        />
                      </figure>
                      <div className="me-3">
                        <span className="fs-5 fw-bold text-white">MERON</span>
                        <h6 className=" text-white" style={{ fontSize: "15px" }}>
                          BOA WARRIORS
                        </h6>
                      </div>
                    </div>
                    <div className="vs p-4 text-warning bg-dark">vs</div>
                    <div className="d-flex align-self-center align-items-center text-end">
                      <div className="ms-3">
                        <span className="fs-5 fw-bold text-white">WALA</span>
                        <h6 className="text-white" style={{ fontSize: "15px" }}>
                          PSG CAM SUP
                        </h6>
                      </div>
                      <figure
                        className="mb-0 icon-bg"
                        style={{ width: "30%", height: "50%" }}
                      >
                        <img
                          src="assets/images/blog/userCommentPic.png"
                          className="img-fluid rounded-circle"
                          alt="Games team"
                        />
                      </figure>
                    </div>
                  </div>
                </div>

                <div className="row pt-2">
                  <div className="col-lg-6 col-6" style={{ height: "320px" }}>
                    <button className="cussino_btn" type="button">
                      <b>MERON</b>
                    </button>
                    <div className="text-center">
                      <p className="pt-1 text-warning" style={{ fontSize: "20px" }}>
                        <b>159,876</b>
                      </p>
                      <p className="pt-1" style={{ fontSize: "17px" }}>
                        PAYOUT=196.0
                      </p>
                      <p className="pt- text-success">
                        <b style={{ fontSize: "20px" }}>0</b>
                      </p>
                      <p className="pt- text-warning">
                        <b style={{ fontSize: "20px" }}>0</b>
                      </p>
                    </div>
                    <button
                      onClick={bethandel}
                      style={{ backgroundColor: "#28a95b" }}
                      className="cussino_btn"
                      type="button"
                    >
                      <b>
                        <CiCirclePlus /> BET MERON
                      </b>
                    </button>
                    {/* {localamaunt > 0 ? (
                 
                ) : (
                  <button
                    onClick={() => setVisible(true)}
                    style={{ backgroundColor: "#28a95b" }}
                    className="cussino_btn"
                    type="button"
                  >
                    <b>
                      <CiCirclePlus /> BET MERON
                    </b>
                  </button>
                )} */}
                  </div>

                  <div className="col-lg-6 col-6" style={{ height: "320px" }}>
                    <button className="cussino_btn2" type="button">
                      <b>WALA</b>
                    </button>
                    <div className="text-center">
                      <p className="pt-1 text-warning" style={{ fontSize: "20px" }}>
                        <b>159,876</b>
                      </p>
                      <p className="pt-1" style={{ fontSize: "17px" }}>
                        PAYOUT=196.0
                      </p>
                      <p className="pt- text-success">
                        <b style={{ fontSize: "20px" }}>0</b>
                      </p>
                      <p className="pt- text-warning">
                        <b style={{ fontSize: "20px" }}>0</b>
                      </p>
                    </div>
                    <button
                      onClick={bethandel}
                      style={{ backgroundColor: "#28a95b" }}
                      className="cussino_btn2"
                      type="button"
                    >
                      <b>
                        <CiCirclePlus /> BET WALA
                      </b>
                    </button>
                    {/* {localamaunt > 0 ? (
                 
                ) : (
                  <button
                    onClick={() => setVisible(true)}
                    style={{ backgroundColor: "#28a95b" }}
                    className="cussino_btn2"
                    type="button"
                  >
                    <b>
                      <CiCirclePlus /> BET WALA
                    </b>
                  </button>
                )} */}
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

export default GameStreamPage;
