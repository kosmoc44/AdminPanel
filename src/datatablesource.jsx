import React from 'react';
import { updateDoc, doc } from "@firebase/firestore";
import { db } from "./firebase";

export const userColumns = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  {
    field: "username",
    headerName: "Username",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="userListUser">
          {params.row.username}
        </div>
      );
    },
  },
  { field: "surname", headerName: "Surname", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "lastLogin", headerName: "Last Seen", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        const docRef = doc(db, "users", params.row.id);
        await updateDoc(docRef, { status: newStatus });
        params.row.status = newStatus;
      };

      return (
        <select
          value={params.row.status}
          onChange={handleStatusChange}
          className={`statusSelect ${params.row.status}`}
        >
          <option value="pending">Pending</option>
          <option value="fulfilled">Fulfilled</option>
          <option value="inactive">Inactive</option>
        </select>
      );
    },
  },
];


