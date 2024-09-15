import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import useGetChannels from '../../hooks/useGetChannels';
import Loader from '../../components/Loaders/Loader';
import BackButton from '../../components/Buttons/BackButton';

const AllChannels = () => {
  const { channels, loading, error } = useGetChannels();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (channels.length === 0) {
    return <p>No channels found</p>;
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


  const paginatedChannels = channels.data.channels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="p-4 flex flex-col content-wrapper">
      <div className='flex flex-row justify-between'>
        <BackButton />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="channels table">
          <TableHead>
            <TableRow>
              <TableCell>Channel Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Starting Date</TableCell>
              <TableCell>Ending Date</TableCell>
              <TableCell>Related Tour</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedChannels.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="p-4">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              paginatedChannels.map((channel, index) => (
                <TableRow key={index}>
                  <TableCell>{channel.channelName}</TableCell>
                  <TableCell>{channel.participants.length}</TableCell>
                  <TableCell>{channel.starting_date ? formattedDate(channel.starting_date) : '-'}</TableCell>
                  <TableCell>{channel.ending_date ? formattedDate(channel.ending_date) : '-'}</TableCell>
                  <TableCell className="px-6 py-4 flex gap-2">
                    <button id={channel._id}>
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                    <button id={channel._id}>
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
          count={channels.data.channels.length}
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

export default AllChannels;
