import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import { ProgressSpinner } from 'primereact/progressspinner';


const Signup = () => {
    let navigate = useNavigate()
    let [errorvalue, setErrorValue] = useState({})
    let [loader, setloader] = useState(true)

    let [loginboxstatus, setloginboxstatus] = useState(true)

    let coordinatorlogin = () => {
        navigate("/coordinatorRegister")
    }

    // signup form handel 
    let handelformvalue = (e) => {
        e.preventDefault()
        let form = e.target
        let formdata = new FormData(form)
        let obj = Object.fromEntries(formdata.entries())
        let errors = {}
        const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (obj.userName === '') {
            errors = { ...errors, userName: "user name is required..." }
        } if (obj.email === '') {
            errors = { ...errors, email: "email is required..." }
        } else if (!emailPattern.test(obj.email)) {
            errors = { ...errors, email: "Please enter a valid email address." }
        }
        if (obj.countryName === '') {
            errors = { ...errors, countryName: "country is required..." }
        } if (obj.password === '') {
            errors = { ...errors, password: "password is required..." }
        } else if (obj.password.length < 6) {
            errors = { ...errors, password: "Password must be at least 6 characters long." }
        }
        if (obj.conformPassword === '') {
            errors = { ...errors, conformPassword: "confirm password is required..." }
        }
        // Check if passwords match
        if (obj.password && obj.conformPassword && obj.password !== obj.conformPassword) {
            errors = { ...errors, conformPassword: "Passwords do not match." }
        }
        // If no errors, log the form data
        if (Object.keys(errors).length === 0) {
            setloader(false)
            axios.post("http://157.66.191.24:3051/user/api/userSignup", obj).then((res) => {

                if (res.data.result == "true") {
                    toast.success(res.data.message);
                    setloader(true)
                    setTimeout(() => {
                        navigate("/login")
                        // localStorage.setItem("loginstatus", true)
                    }, 1000);
                } else {
                    setloader(true)
                }
            }).catch((error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                    setloader(true)

                } else {
                    toast.error("Invalid Data Entered by you.");
                    setloader(true)
                }
            })

        } else {
            setErrorValue(errors) // Set validation errors if found
        }
    }

    let handleInputChange = (e) => {
        const { name, value } = e.target
        setErrorValue((prevErrors) => {
            const newErrors = { ...prevErrors }
            if (value.trim() !== "") {
                delete newErrors[name] // Remove error when value is entered
            }
            return newErrors
        })
    }
    return (
        <>
            <Toaster />
            {/* breadcrumb section */}
            <div className="breadcrumb-area">
                <div className="container">
                    {/* row */}
                    <div className="row ">
                        {/* col */}
                        <div className="col-12 col-lg-6 align-self-center">
                            {/* breadcrumb */}
                            <div className="page-breadcrumb">
                                <div className="mb-3">
                                    <ul className="list">
                                        <li><Link to="/">Home</Link></li>
                                        <li>Signup</li>
                                    </ul>
                                </div>
                                <h2 className="display-4 mb-0 theme-text-white font-black">Signup for Betting</h2>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 align-self-center text-center">
                            <figure className="mb-0 mt-5 pt-0 pt-lg-5 hero-image">
                                <img src="assets/images/breadcrumb/signup.png" className="img-fluid " alt="hero image" />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
            {/* signup page section */}
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 offset-lg-3">
                            <div className="theme-box-shadow theme-border-radius theme-transparent-bg p-4 p-lg-5">
                                {/* login content */}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-4 row justify-content-around ">
                                            <div className='col-5 p-0 text-center' style={{ backgroundColor: "#40408b", borderRadius: "10px", border: "3px solid #571ce0", backgroundColor: "rgb(46, 0, 153)" }} >
                                                <button type="submit" className=" btn p-0 align-items-center text-white " style={{ border: "none" }} >User Register</button>
                                            </div>
                                            <div className='col-5 p-0 text-center' style={{ backgroundColor: "#40408b", borderRadius: "10px" }} onClick={coordinatorlogin}>
                                                <button type="submit" className=" btn p-0 align-items-center text-white " style={{ border: "none" }} >Coordinator Register</button>
                                            </div>
                                        </div>
                                        <div className="mb-3 ">
                                            <span className="font-small">

                                                <div className='text-center'>
                                                    <span className="me-3">User Register</span>
                                                </div>
                                                <form className="needs-validation" onSubmit={handelformvalue}>
                                                    <div className="mb-3" style={{ display: "none" }}>
                                                        <input type="text" name='fcmId' value={"1111"} className="form-control form-control-th rounded-pill" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="userName" className="form-label fw-bold">USER NAME</label>
                                                        <input type="text" name='userName' className="form-control form-control-th rounded-pill" onChange={handleInputChange} id="userName" />
                                                        <small className='text-danger'>{errorvalue.userName && <>{errorvalue.userName}</>}</small>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="email" className="form-label fw-bold">USER EMAIL</label>
                                                        <input type="text" name='email' className="form-control form-control-th rounded-pill" onChange={handleInputChange} id="email" />
                                                        <small className='text-danger'>{errorvalue.email && <>{errorvalue.email}</>}</small>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="countryName" className="form-label fw-bold">CONTRY/REGION </label>
                                                        <input type="text" name='countryName' className="form-control form-control-th rounded-pill" onChange={handleInputChange} id="countryName" />
                                                        <small className='text-danger'>{errorvalue.countryName && <>{errorvalue.countryName}</>}</small>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="password" className="form-label fw-bold">PASSWORD</label>
                                                        <input type="password" name='password' className="form-control form-control-th rounded-pill" onChange={handleInputChange} id="password" />
                                                        <small className='text-danger'>{errorvalue.password && <>{errorvalue.password}</>}</small>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="conformPassword" className="form-label fw-bold">CONFIRM PASSWORD</label>
                                                        <input type="password" name='conformPassword' className="form-control form-control-th rounded-pill" onChange={handleInputChange} id="conformPassword" />
                                                        <small className='text-danger'>{errorvalue.conformPassword && <>{errorvalue.conformPassword}</>}</small>
                                                    </div>
                                                    {/* <div className="mb-3 d-flex">
                                                                <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                                                                 <label className="form-check-label font-small w-75" htmlFor="exampleCheck2">By clicking
                                                                 on register, I Understand &amp; agree to world travel <a href="#">Terms and
                                                                 condition</a>
                                                                 and <a href="#">Privacy Policy</a></label>
                                                              </div> */}
                                                    <div className="mb-3">
                                                        {loader == true ? (
                                                            <button style={{ backgroundColor: "#2e0099" }} type="submit" className="rounded-pill btn custom-btn-primary primary-btn-effect d-flex w-100 justify-content-center align-items-center" onclick="window.location.href='#';">Register</button>
                                                        ) : (
                                                            <div className='text-center'>
                                                                <ProgressSpinner style={{ width: '50px', height: '50px' }} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mb-3 text-center">
                                                        <span className="font-small">
                                                            <span className="me-3">Already a member?</span>
                                                            <Link to="/login">Login</Link>
                                                        </span>
                                                    </div>
                                                </form>

                                            </span>
                                        </div>



                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup