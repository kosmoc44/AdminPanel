import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import AuthLayout from "../layouts/AuthLayout";
import { MdOutlineEmail } from "react-icons/md";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [surname, setSurname] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", res.user.uid), {
                username,
                surname,
                email,
                timestamp: serverTimestamp(),
                lastLogin: serverTimestamp(),
            });
            navigate('/');
        } catch (error) {
            console.error("Error registering user:", error);
            alert(error.message);
        }
    };

    return (
        <AuthLayout>
            <div className="enter">
                <p className="enter_title">
                    Start your journey
                </p>
                <h1 className="enter_subtitle">
                    Sign up to the App
                </h1>
                <form className="enter_form" onSubmit={handleRegister}>
                    <div className="enter_form_item">
                        <label>
                            <span className="enter_form_item_text">
                                Username
                            </span>
                            <input
                                type="text"
                                className="enter_form_item_input"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <div className="enter_form_error">
                        </div>
                    </div>
                    <div className="enter_form_item">
                        <label>
                            <span className="enter_form_item_text">
                                Surname
                            </span>
                            <input
                                type="text"
                                className="enter_form_item_input"
                                placeholder="Surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </label>
                        <div className="enter_form_error">
                        </div>
                    </div>
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                    <div className="enter_form_item">
                        <label>
                            <span className="enter_form_item_text">
                                Confirm Password
                            </span>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="enter_form_item_input"
                                placeholder="Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {showConfirmPassword ? (
                                <LuEye
                                    onClick={toggleConfirmPasswordVisibility}
                                    style={{
                                        position: 'absolute', right: 10, top: 40,
                                        width: 20, height: 20,
                                        color: '000',
                                        cursor: 'pointer'
                                    }}
                                />
                            ) : (
                                <LuEyeClosed
                                    onClick={toggleConfirmPasswordVisibility}
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
                    <button className="enter_form_btn" type="submit">Sign up</button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Register;