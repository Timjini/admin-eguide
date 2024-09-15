import { useParams } from "react-router-dom";
import agencyApi from "../../api/agency";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AgencyPage = () => {
  const { agencyId } = useParams();
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);

  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgency = async () => {
            try {
              const response = await agencyApi.agency(agencyId, {
                headers: {
                  Authorization: `Bearer ${user.user.authToken}`,
                },
              });
              setAgency(response.data);
              console.log(response.data);
            } catch (error) {
              console.error(error.response?.data?.message || "An error occurred");
            } finally {
              setLoading(false);
            }
        };
    
        fetchAgency();
    }, [agencyId, user.user.authToken]);
    

return (
    <></>


)}

export default AgencyPage;