import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Button,
} from '@mui/material';
import useGetAdminPayments from '../../hooks/useGetAdminPayments';
import Loader from '../../components/Loaders/Loader';
import BackButton from '../../components/Buttons/BackButton';
import MainDrawer from '../../components/OffCanvas/MainDrawer';
import CreatePayment from '../postRequests/createPayment';
import adminApi from '../../api/admin';


const PaymentsPage = () => {
  const { payments, loading, error, refetch } = useGetAdminPayments();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editableRow, setEditableRow] = useState(null); 
  const [formData, setFormData] = useState({}); 

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

  const handleEditClick = (payment) => {
    setEditableRow(payment._id); // Set the row to be editable
    setFormData(payment); // Pre-fill the form with the current payment data
  };

  const handleSaveClick = async (id) => {
    try {
      const response = await adminApi.updatePayment(id, formData);
      setEditableRow(null);
      refetch();
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const handleCancelClick = () => {
    setEditableRow(null); // Reset editable row state
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Update form data
  };

  const paginatedPayments = payments.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="p-4 flex flex-col content-wrapper">
      <div className='flex flex-row justify-between'>
        <BackButton />
        <MainDrawer
          activeDrawer="right"
          title="Create A Payment"
          additionalComponent={CreatePayment}
        />
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="payments table">
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
                <TableCell colSpan={4} className="p-4">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              paginatedPayments.map((payment, index) => (
                <TableRow key={payment._id}>
                  <TableCell>
                    {editableRow === payment._id ? (
                      <TextField
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      />
                    ) : (
                      payment.status
                    )}
                  </TableCell>
                  <TableCell>
                    {editableRow === payment._id ? (
                      <TextField
                        type="date"
                        name="paymentDate"
                        value={formData.paymentDate.split('T')[0]} // Format for input
                        onChange={handleChange}
                      />
                    ) : (
                      payment.paymentDate ? formattedDate(payment.paymentDate) : '-'
                    )}
                  </TableCell>
                  <TableCell>
                    {editableRow === payment._id ? (
                      <TextField
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                      />
                    ) : (
                      payment.amount
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4 flex gap-2">
                    {editableRow === payment._id ? (
                      <>
                         <Button onClick={() => handleSaveClick(payment._id)} variant="contained" color="primary">
                          Save
                        </Button>
                        <Button onClick={handleCancelClick} color="secondary">Cancel</Button>
                      </>
                    ) : (
                      <Button onClick={() => handleEditClick(payment)} variant="contained" color="primary">
                        Edit
                      </Button>
                    )}
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
