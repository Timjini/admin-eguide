import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import useGetAdminSubscriptions from '../../hooks/useGetAdminSubscriptions';
import Loader from '../../components/Loaders/Loader';
import BackButton from '../../components/Buttons/BackButton';

const SubscriptionsPage = () => {
  const { subscriptions, loading, error } = useGetAdminSubscriptions();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (subscriptions.length === 0) {
    return <p>No subscriptions found</p>;
  }

  const formattedDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const paginatedSubscriptions = subscriptions.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="p-4 flex flex-col content-wrapper">
      <div className='flex flex-row justify-between'>
        <BackButton />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="channels table">
          <TableHead>
            <TableRow>
              <TableCell>Subscription Status</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Paid</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSubscriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="p-4">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
                paginatedSubscriptions.map((subscription, index) => (
                <TableRow key={index}>
                  <TableCell>{subscription.status}</TableCell>
                  <TableCell>{subscription.startDate ? formattedDate(subscription.startDate) : '-'}</TableCell>
                  <TableCell>{subscription.endDate ? formattedDate(subscription.endDate) : '-'}</TableCell>
                  <TableCell className="px-6 py-4 flex gap-2">
                    <button id={subscription._id}>
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                    <button id={subscription._id}>
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Table Pagination */}
        <TablePagination
          component="div"
          count={subscriptions.data.length}
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

export default SubscriptionsPage;
