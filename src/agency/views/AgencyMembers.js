import React, { useEffect, useState } from "react";
import Members from "../components/members";
import agencyApi from "../../api/agency";
import { useSelector } from 'react-redux';
import Loader from "../../components/Loaders/Loader";
import { useParams } from "react-router-dom";
import BackButton from "../../components/Buttons/BackButton";
import MainDrawer from "../../components/OffCanvas/MainDrawer";
import AddMember from "../../agency/management/AddMember";

const AgencyMembers = () => {
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);
  const { agencyId: routeAgencyId } = useParams();

 
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await agencyApi.members({
          headers: {
            Authorization: `Bearer ${user.user.authToken}`,
          },
          params: {
            agencyId: routeAgencyId
          }
        });

        setMembersData(response.data);
        console.log("memberS", response.data)
      } catch (error) {
        console.error("Error fetching agency channels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, [user.user.authToken, routeAgencyId]);

  return (
    <div className="p-4 flex flex-col content-wrapper">
      {loading ? (
        <Loader />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex flex-row justify-between ">
            <div>
              <BackButton />
            </div>
            <div>
            <MainDrawer activeDrawer="right" additionalComponent={AddMember} title= "Add A Member" />
            </div>
          </div>
          <Members data={membersData} />
        </div>
      )}
    </div>
  );
};

export default AgencyMembers;

