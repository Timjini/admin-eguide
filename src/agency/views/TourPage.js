import { useParams } from "react-router-dom";
import agencyApi from "../../api/agency";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loaders/Loader";
import TourMap from "../../components/Map/TourMap";
import BackButton from "../../components/Buttons/BackButton";

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

      console.log(tour);

return (
    <>
    <div className="content-wrapper">
      <BackButton />
      <h1 className="text-2xl text-center mb-4"> {tour.title}</h1>
      {tour && tour.start_point && tour.end_point ? (
        <TourMap tour={tour} stops={tour.stops} />
      ) : (
        <p>Tour coordinates missing</p>
      )}
      <div className="flex flex-col mx-auto">
        <div className="flex flex-col">
          <div className="mb-2">
          <span><strong>Start Point</strong></span>
          </div>
          <div>
            <p>{tour?.start_point.street1} {tour?.start_point.state} {tour?.start_point.city} {tour?.start_point.country} {tour?.start_point.postal_code} </p>
          </div>
          <div className="mb-2">
            <span><strong>End Point</strong></span>
          </div>
          <div>
            <p>{tour?.end_point.street1} {tour?.end_point.state} {tour?.end_point.city} {tour?.end_point.country} {tour?.end_point.postal_code} </p>
          </div>
          <div className="mt-4 mb-1">
          <span><strong>Info</strong></span>
          </div>
          <div>
            <p>{tour?.description} </p>
          </div>
        </div>
      </div>
    </div>
    </>


)}

export default TourPage;