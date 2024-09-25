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
  Avatar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteAlert from "../../components/Alerts/DeleteAlert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import packageApi from "../../api/admin";
import BackButton from "../../components/Buttons/BackButton";
import MainDrawer from "../../components/OffCanvas/MainDrawer";
import CreatePackage from "../postRequests/createPackage";

const Packages = ({ packages }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [packageToDelete, setPackageToDelete] = useState(null);
  const user = useSelector((state) => state.user);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedPackages = packages.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleViewPackage = (packageId) => {
    navigate(`/admin/packages/${packageId}`);
  };

  const handleDeletePackage = (packageId) => {
    setPackageToDelete(packageId);
  };

  console.log("user=======>", user.user.authToken)
  const confirmDeletePackage = async () => {
    try {
      await packageApi.deletePackage(packageToDelete, {
        headers: {
          Authorization: `Bearer ${user.user.authToken}`,
        },
      });
      setPackageToDelete(null);
      console.log("Package deleted successfully");
    } catch (error) {
      console.error("Failed to delete package:", error);
    }
  };

  const handleCloseAlert = () => {
    setPackageToDelete(null);
  };

  return (
    <div className="p-4 flex flex-col content-wrapper">
       <div className='flex flex-row justify-between'>
        <BackButton/>
          <MainDrawer
            activeDrawer="right"
            title="Create A Package"
            additionalComponent={CreatePackage}
          />
        </div>
      {packageToDelete && (
        <DeleteAlert
          message="Are you sure you want to delete this package?"
          status="warning"
          onConfirm={confirmDeletePackage}
          onClose={handleCloseAlert}
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="packages table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Duration (Months)</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPackages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="p-4">
                  No packages available
                </TableCell>
              </TableRow>
            ) : (
              paginatedPackages.map((pkg, index) => (
                <TableRow key={index}>
                  <TableCell className="p-4">{pkg.name}</TableCell>
                  <TableCell className="p-4">{pkg.description}</TableCell>
                  <TableCell className="p-4">{pkg.durationInMonths}</TableCell>
                  <TableCell className="p-4">{pkg.price}</TableCell>
                  <TableCell className="p-4">
                    <IconButton
                      onClick={() => handleViewPackage(pkg._id)}
                      aria-label="view"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeletePackage(pkg._id)}
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
          count={packages.length}
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

export default Packages;
