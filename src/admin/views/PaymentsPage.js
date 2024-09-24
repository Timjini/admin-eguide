import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import useGetAdminPayments from '../../hooks/useGetAdminPayments';
import Loader from '../../components/Loaders/Loader';
import BackButton from '../../components/Buttons/BackButton';

const PaymentsPage = () => {
  const { payments, loading, error } = useGetAdminPayments();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (payments.length === 0) {
    return <p>No payments found</p>;
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


  const paginatedPayments = payments.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="p-4 flex flex-col content-wrapper">
      <div className='flex flex-row justify-between'>
        <BackButton />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="channels table">
          <TableHead>
            <TableRow>
              <TableCell>Payment Status</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell>Amount Paid</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="p-4">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
                paginatedPayments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell>{payment.paymentDate ? formattedDate(payment.paymentDate) : '-'}</TableCell>
                  <TableCell>{payment.amount }</TableCell>
                  <TableCell className="px-6 py-4 flex gap-2">
                    <button id={payment._id}>
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                    <button id={payment._id}>
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
          count={payments.data.length}
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

export default PaymentsPage;
