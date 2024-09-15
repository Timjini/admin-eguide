import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material';

const ChannelsTable = ({ channelsData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  console.log(channelsData.data.channels);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formattedDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
    const formatted = new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
    return formatted;
  };

  const paginatedChannels = channelsData.data.channels.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
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
                <TableCell>{channel.code}</TableCell>
                <TableCell>
                  {channel.starting_date ? formattedDate(channel.starting_date) : '-'}
                </TableCell>
                <TableCell>
                  {channel.ending_date ? formattedDate(channel.ending_date) : '-'}
                </TableCell>
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
        count={channelsData.data.channels.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
};

export default ChannelsTable;
