import React from 'react'
import LogoIcon from '../assets/img/right.jpg'
import { Link, useLocation } from "react-router-dom"

const AuthLayout = ({ children }) => {

    const location = useLocation()

    const isLoginPage = location.pathname === '/login';

    return (
        <div className="wrapper">
            <div className="wrapper_left">
                <img
                    src={LogoIcon}
                    alt=""
                    className="wrapper_left_logo"
                />
            </div>
            <div className="wrapper_right">
                <h1 className="wrapper_right_title">
                    THE APP
                </h1>
                {children}
                <div className="wrapper_right_info">
                    <p className="wrapper_right_info_text">
                        {isLoginPage ? (
                            <>
                                Don’t have an account?{" "}
                                <Link to="/register" className="wrapper_right_info_link">
                                    Sign up
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <Link to="/login" className="wrapper_right_info_link">
                                    Sign in
                                </Link>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout