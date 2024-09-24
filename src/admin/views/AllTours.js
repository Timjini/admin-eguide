import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_PUBLIC_FOLDER_NO_SLASH } from '../../constant/index';
import { useNavigate } from 'react-router-dom';
import agencyApi from '../../api/agency';
import DeleteAlert from '../../components/Alerts/DeleteAlert';
import { useSelector } from 'react-redux';

const AllTours = ({ tours }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0); //
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [tourToDelete, setTourToDelete] = useState(null);
  const user = useSelector((state) => state.user);


  const formattedDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
  };

  const handleViewTour = (tourId) => {
    navigate(`/tour/${tourId}`);
  };

  //  page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handle rows per page 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteTour = (tourId) => {
    setTourToDelete(tourId);
  };

  const confirmDeleteTour = async () => {
    try {
      await agencyApi.deleteTour(tourToDelete, {
        headers: {
          Authorization: `Bearer ${user.user.authToken}`,
        },
      });
      setTourToDelete(null); // Reset the agency to delete
    } catch (error) {
      console.error("Failed to delete tour:", error);
    }
  };

  const handleCloseAlert = () => {
    setTourToDelete(null); // Reset the agency to delete
  };

  // slicing data from MUI documentation
  const paginatedTours = tours.data.tours.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
    <div className="p-4 flex flex-col content-wrapper">
       {tourToDelete && (
        <DeleteAlert
          message="Are you sure you want to delete this tour?"
          status="warning"
          onConfirm={confirmDeleteTour}
          onClose={handleCloseAlert}
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tours table">
          <TableHead>
            <TableRow>
              <TableCell>Tour Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Starting Date</TableCell>
              <TableCell>Ending Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTours.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>No data available</TableCell>
              </TableRow>
            ) : (
              paginatedTours.map((tour, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex flex-row gap-2 content-center">
                      <img className="w-8 h-8 rounded-full" src={`${API_PUBLIC_FOLDER_NO_SLASH}/${tour.image}`} alt={tour.title} />
                      <span>{tour.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{tour.description}</TableCell>
                  <TableCell>{tour.starting_date ? formattedDate(tour.starting_date) : '-'}</TableCell>
                  <TableCell>{tour.ending_date ? formattedDate(tour.ending_date) : '-'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewTour(tour._id)} aria-label="view">
                      <VisibilityIcon />
                    </IconButton>
                      <IconButton
                      onClick={() => handleDeleteTour(tour._id)}
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

        {/* Table Pagination Component */}
        <TablePagination
          component="div"
          count={tours.data.tours.length}
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

export default AllTours;
