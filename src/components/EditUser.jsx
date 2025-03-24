import { doc, getDoc, updateDoc } from "@firebase/firestore"
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../firebase"

const EditUser = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: "",
        surname: "",
        email: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "users", id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setData(docSnap.data())
            } else {
                console.log("No such document!")
            }
        }
        fetchData()
    }, [id])

    const handleInput = (e) => {
        const { id, value } = e.target
        setData({ ...data, [id]: value })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const docRef = doc(db, "users", id)
            await updateDoc(docRef, data)
            navigate("/")
        } catch (error) {
            console.error("Error updating document: ", error)
        }
    }

    return (
        <div className="editUser">
            <h1>Edit User</h1>
            <form onSubmit={handleUpdate}>
                <div className="formInput">
                    <label>Username</label>
                    <input
                        id="username"
                        type="text"
                        value={data.username}
                        onChange={handleInput}
                    />
                </div>
                <div className="formInput">
                    <label>Surname</label>
                    <input
                        id="surname"
                        type="text"
                        value={data.surname}
                        onChange={handleInput}
                    />
                </div>
                <div className="formInput">
                    <label>Email</label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={handleInput}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default EditUser