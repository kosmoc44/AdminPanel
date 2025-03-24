import React, { useState } from 'react'
import { MdOutlineEmail } from "react-icons/md"
import { LuEye, LuEyeClosed } from "react-icons/lu"
import AuthLayout from "../layouts/AuthLayout"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useAuth } from "../context/AuthContext"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, pass)
            login()
            navigate('/')
        } catch (error) {
            console.error("Error logging in:", error)
            alert(error.message)
        }
    }

    return (
        <AuthLayout>
            <div className="enter">
                <p className="enter_title">
                    Start your journey
                </p>
                <h1 className="enter_subtitle">
                    Sign in to the App
                </h1>
                <form className="enter_form" onSubmit={handleLogin}>
                    <div className="enter_form_item">
                        <label>
                            <span className="enter_form_item_text">
                                E-mail
                            </span>
                            <input
                                type="email"
                                className="enter_form_item_input"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <MdOutlineEmail
                                style={{
                                    position: 'absolute', right: 10, top: 40,
                                    width: 20, height: 20,
                                    color: 'b1b0b0'
                                }}
                            />
                        </label>
                        <div className="enter_form_error">
                        </div>
                    </div>
                    <div className="enter_form_item">
                        <label>
                            <span className="enter_form_item_text">
                                Password
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="enter_form_item_input"
                                placeholder="Password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                            {showPassword ? (
                                <LuEye
                                    onClick={togglePasswordVisibility}
                                    style={{
                                        position: 'absolute', right: 10, top: 40,
                                        width: 20, height: 20,
                                        color: '000',
                                        cursor: 'pointer'
                                    }}
                                />
                            ) : (
                                <LuEyeClosed
                                    onClick={togglePasswordVisibility}
                                    style={{
                                        position: 'absolute', right: 10, top: 40,
                                        width: 20, height: 20,
                                        color: '000',
                                        cursor: 'pointer'
                                    }}
                                />
                            )}
                        </label>
                        <div className="enter_form_error">
                        </div>
                    </div>
                    <button className="enter_form_btn" type="submit">Sign in</button>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Login