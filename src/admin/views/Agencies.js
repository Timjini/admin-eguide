import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

const Agencies = ({ agencies }) => {
   const navigate = useNavigate();
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(5); //  rows per page

  const formattedDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
  };

  const handleViewAgency = (agencyId) => {
   navigate(`/admin/agencies/${agencyId}`);
 };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Pagination logic - slice data according to the current page and rows per page
  const paginatedAgencies = agencies.data.agencies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="p-4 flex flex-col content-wrapper">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="agencies table">
          <TableHead>
            <TableRow>
              <TableCell>Agency Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Members</TableCell>
              <TableCell>Owner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAgencies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="p-4">
                  No agency available
                </TableCell>
              </TableRow>
            ) : (
              paginatedAgencies.map((agency, index) => (
                <TableRow key={index}>
                  <TableCell className="p-4">{agency.name}</TableCell>
                  <TableCell className="p-4">{agency.description}</TableCell>
                  <TableCell className="p-4">{agency.members.length}</TableCell>
                  <TableCell className="p-4">{agency.owner}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewAgency(agency._id)} aria-label="view">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton aria-label="edit">
                      <EditIcon />
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
          count={agencies.data.agencies.length} // Total number of items
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]} // Customize rows per page options
        />
      </TableContainer>
    </div>
  );
};

export default Agencies;
