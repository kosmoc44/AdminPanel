import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from "../datatablesource";
import '../scss/common/Home.scss';
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "@firebase/firestore";

const Home = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "users"),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        };
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
            setData(data.filter((item) => item.id !== id));
            console.log("Document successfully deleted!");
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const actionColumn = [{
        field: 'action', headerName: 'Action', width: 150, renderCell: (params) => {
            return (
                <div className="cellAction">
                    <button className="viewBtn" onClick={() => handleEdit(params.row.id)}>Edit</button>
                    <button onClick={() => handleDelete(params.row.id)} className="deleteBtn">Delete</button>
                </div>
            );
        },
    }];

    const paginationModel = { page: 0, pageSize: 10 };
    return (
        <div className="home">
            <div className="data-grid-container">
                <div className="datatableTitle">
                    <span>Add New User</span>
                    <Link to={"/new"} className="addNew">
                        Add New
                    </Link>
                    <Link className="addNew" to={"/login"}>
                        Log out
                    </Link>
                </div>
                <DataGrid
                    rows={data}
                    columns={userColumns.concat(actionColumn)}
                    initialState={{ pagination: { paginationModel } }}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    pagination
                    checkboxSelection
                />
            </div>
        </div>
    );
};

export default Home;