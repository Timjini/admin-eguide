import { useParams } from "react-router-dom";
import agencyApi from "../../api/agency";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loaders/Loader";

const TourPage = () => {
  const {tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);

  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgency = async () => {
            try {
              const response = await agencyApi.tour(tourId, {
                headers: {
                  Authorization: `Bearer ${user.user.authToken}`,
                },
              });
              setTour(response.data);
            } catch (error) {
              console.error(error.response?.data?.message || "An error occurred");
            } finally {
              setLoading(false);
            }
        };
    
        fetchAgency();
    }, [tourId, user.user.authToken]);
    
    if (loading) {
        return <Loader />; 
      }
    
      if (error) {
        return <p>Error: {error}</p>;
      }

return (
    <>
    <div className="content-wrapper">
      <h1> {tour.title}</h1>
    </div>
    </>


)}

export default TourPage;