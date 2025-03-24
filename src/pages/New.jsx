import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import React, { useState } from 'react';
import { GoFileSubmodule } from "react-icons/go";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const New = ({ inputs }) => {
    const navigate = useNavigate()
    const [file, setFile] = useState('');
    const [data, setData] = useState({
        username: "",
        surname: "",
        email: "",
        password: ""
    });

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            await setDoc(doc(db, "users", res.user.uid), {
                ...data,
                timestamp: serverTimestamp(),
                lastLogin: serverTimestamp(),
            });
            navigate("/");
            console.log("User added successfully");
        } catch (error) {
            console.log("Error adding user:", error);
        }
    };


    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setData({ ...data, [id]: value });
    };

    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1>Add New User</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
                    </div>
                    <div className="right">
                        <form onSubmit={handleAdd}>
                            <div className="formInput">
                                <label htmlFor="file">
                                    <span>Image:</span><GoFileSubmodule className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>
                                        <span>
                                            {input.label}
                                        </span>
                                        <input
                                            id={input.id}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            onChange={handleInput}
                                        />
                                    </label>
                                </div>
                            ))}
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New;