import React, { useState } from "react";
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
  FormControlLabel,
  Switch,
  FormGroup,
  Chip,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteAlert from "../../components/Alerts/DeleteAlert";
import agencyApi from "../../api/agency";
import { useSelector } from "react-redux";
import { API_ROOT_PUBLIC } from "../../constant";
import MemberAvatars from "../../agency/ui/MembersAvatars";

const Agencies = ({ agencies }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [agencyToDelete, setAgencyToDelete] = useState(null); 
  const user = useSelector((state) => state.user);

  const formattedDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "2-digit" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };

  const handleViewAgency = (agencyId) => {
    navigate(`/admin/agencies/${agencyId}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedAgencies = agencies.data.agencies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle delete confirmation
  const handleDeleteAgency = (agencyId) => {
    setAgencyToDelete(agencyId);
  };

  const confirmDeleteAgency = async () => {
    try {
      await agencyApi.deleteAgency(agencyToDelete, {
        headers: {
          Authorization: `Bearer ${user.user.authToken}`,
        },
      });
      console.log("Agency deleted:", agencyToDelete);
      // Update the state or re-fetch the data as needed
      setAgencyToDelete(null); // Reset the agency to delete
    } catch (error) {
      console.error("Failed to delete agency:", error);
    }
  };

  const handleCloseAlert = () => {
    setAgencyToDelete(null); // Reset the agency to delete
  };

  const handleUserProfileNavigation = (user) => {
    if (user) {
      navigate(`/users/${user._id}`);
    }
  };

  const active = false;
  return (
    <div className="p-4 flex flex-col content-wrapper">
      {agencyToDelete && (
        <DeleteAlert
          message="Are you sure you want to delete this agency?"
          status="warning"
          onConfirm={confirmDeleteAgency}
          onClose={handleCloseAlert}
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="agencies table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Agency</TableCell>
              <TableCell>Members</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Subscription Expiry</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAgencies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="p-4">
                  No agency available
                </TableCell>
              </TableRow>
            ) : (
              paginatedAgencies.map((agency, index) => (
                <TableRow key={index}>
                  <TableCell className="p-4"><Avatar alt={agency?.name} src={`${API_ROOT_PUBLIC}uploads/${agency?.image}`} /></TableCell>
                  <TableCell className="p-4"><span>{agency.name}</span></TableCell>
                  <TableCell className="p-4">
                    <MemberAvatars members={agency.members} />
                  </TableCell>
                  <TableCell className="p-4">
                    <Chip
                      avatar={
                        <Avatar
                          alt={agency.owner?.name}
                          src={`${API_ROOT_PUBLIC}uploads/${agency.owner?.avatar}`}
                        />
                      }
                      label={agency.owner?.name}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell className="p-4">
                    <FormGroup>
                      {agency.status === "active" ? (
                        <FormControlLabel
                          control={<Switch defaultChecked color="primary" />}
                        />
                      ) : (
                        <FormControlLabel control={<Switch />} />
                      )}
                    </FormGroup>
                  </TableCell>
                  <TableCell className="p-4">
                      {formattedDate(agency?.subscriptionEnds ?? '2025-08-02')}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleViewAgency(agency._id)}
                      aria-label="view"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteAgency(agency._id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={agencies.data.agencies.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </div>
  );
};

export default Agencies;
