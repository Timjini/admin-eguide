import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Select, MenuItem, Button } from '@mui/material';
import useGetAdminSubscriptions from '../../hooks/useGetAdminSubscriptions';
import Loader from '../../components/Loaders/Loader';
import BackButton from '../../components/Buttons/BackButton';
import MainDrawer from '../../components/OffCanvas/MainDrawer';
import CreateSubscription from '../postRequests/createSubscription';
import adminApi from '../../api/admin';
import { useSelector } from 'react-redux';

const SubscriptionsPage = () => {
  const { subscriptions, loading, error, refetch } = useGetAdminSubscriptions();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const user = useSelector((state) => state.user);

  // State to keep track of editing rows
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (subscription) => {
    setEditingRow(subscription._id);
    setEditedData(subscription);  // Populate editedData with current subscription data
  };

  const handleCancelClick = () => {
    setEditingRow(null);  // Cancel editing
    setEditedData({});     // Clear the edit state
  };

  const handleSaveClick = async (subscriptionId) => {
    try {
      console.log('Saving data:', editedData);
      
      const response = await adminApi.updateSubscriptions(subscriptionId, editedData); // Pass id and data separately
  
      console.log('Subscription updated successfully:', response.data);
  
      setEditingRow(null);  
      setEditedData({});
      refetch();
    } catch (error) {
      console.error('Failed to update subscription:', error);
    }
  };
  
  

  const handleInputChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

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
      <div className="flex flex-row justify-between">
        <BackButton />
        <MainDrawer
          activeDrawer="right"
          title="Create A Subscription"
          additionalComponent={CreateSubscription}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="editable subscriptions table">
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
              paginatedSubscriptions.map((subscription) => (
                <TableRow key={subscription._id}>
                  {/* Subscription Status */}
                  <TableCell>
                    {editingRow === subscription._id ? (
                      <Select
                        value={editedData.status || ''}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                      >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="expired">Expired</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                      </Select>
                    ) : (
                      subscription.status
                    )}
                  </TableCell>

                  {/* Start Date */}
                  <TableCell>
                    {editingRow === subscription._id ? (
                      <TextField
                        type="date"
                        value={editedData.startDate ? new Date(editedData.startDate).toISOString().substr(0, 10) : ''}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                      />
                    ) : (
                      subscription.startDate ? formattedDate(subscription.startDate) : '-'
                    )}
                  </TableCell>

                  {/* End Paid */}
                  <TableCell>
                    {editingRow === subscription._id ? (
                      <TextField
                        type="date"
                        value={editedData.endDate ? new Date(editedData.endDate).toISOString().substr(0, 10) : ''}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                      />
                    ) : (
                      subscription.endDate ? formattedDate(subscription.endDate) : '-'
                    )}
                  </TableCell>

                  {/* Actions: Edit / Save / Cancel */}
                  <TableCell>
                    {editingRow === subscription._id ? (
                      <>
                       <Button onClick={() => handleSaveClick(subscription._id)} variant="contained" color="primary">
                          Save
                        </Button>
                        <Button onClick={handleCancelClick} variant="outlined" color="secondary">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => handleEditClick(subscription)} variant="contained" color="primary">
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
