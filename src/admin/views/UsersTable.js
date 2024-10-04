import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import { useSelector } from "react-redux";
import { API_ROOT } from "../../constant";
import MainDrawer from "../../components/OffCanvas/MainDrawer";
import CreateAgencyOwner from "../postRequests/createAgencyOwner";
import BackButton from "../../components/Buttons/BackButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteAlert from "../../components/Alerts/DeleteAlert";

export default function UsersTable() {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.user.authToken}`,
      },
    };

    fetch(`${API_ROOT}/users/users`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
  };

  const confirmDeleteUser = async () => {
    // Handle user deletion logic here
    // For example, make an API call to delete the user
    setUserToDelete(null); // Reset the user to delete
  };

  const handleCloseAlert = () => {
    setUserToDelete(null); // Reset the user to delete
  };

  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="p-4 flex flex-col content-wrapper">
      {userToDelete && (
        <DeleteAlert
          message="Are you sure you want to delete this user?"
          status="warning"
          onConfirm={confirmDeleteUser}
          onClose={handleCloseAlert}
        />
      )}
      <div className="flex justify-between">
        <BackButton />
        <MainDrawer
          activeDrawer="right"
          title="Add A User"
          additionalComponent={CreateAgencyOwner}
        />
      </div>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="p-4">
                  No users available
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.type}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteUser(user.id)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => { /* Add view user logic here */ }} aria-label="view">
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </div>
  );
}
