import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
} from "@mui/material";
import agencyApi from "../../api/agency";
import { useSelector } from 'react-redux';
import Loader from "../../components/Loaders/Loader";
import { useParams } from "react-router-dom";
import BackButton from "../../components/Buttons/BackButton";
import MainDrawer from "../../components/OffCanvas/MainDrawer";
import AddMember from "../../agency/management/AddMember";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the delete icon
import CustomAvatar from "../../components/Avatars/CustomAvatar";

const AgencyMembers = () => {
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const user = useSelector(state => state.user);
  const { agencyId: routeAgencyId } = useParams();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await agencyApi.members({
          headers: {
            Authorization: `Bearer ${user.user.authToken}`,
          },
          params: {
            agencyId: routeAgencyId
          }
        });

        setMembersData(response.data.members);
      } catch (error) {
        console.error("Error fetching agency members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [user.user.authToken, routeAgencyId]);

  console.log("members", membersData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-4 flex flex-col content-wrapper">
      {loading ? (
        <Loader />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex flex-row justify-between">
            <BackButton />
            <MainDrawer activeDrawer="right" additionalComponent={AddMember} title="Add A Member" />
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="members table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {membersData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="p-4 text-center">
                      No members available
                    </TableCell>
                  </TableRow>
                ) : (
                  membersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <CustomAvatar user={member} />
                      </TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>
                        <IconButton aria-label="delete" onClick={() => {/* handle delete member */}}>
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
              count={membersData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default AgencyMembers;
