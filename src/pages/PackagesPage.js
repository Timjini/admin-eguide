import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import packageApi from "../api/agency";
import Loader from "../components/Loaders/Loader";
import Packages from "../admin/views/Packages";
import { useSelector } from "react-redux";

const PackagePage = () => {
  const { packageId } = useParams();
  const user = useSelector(state => state.user);
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await packageApi.getPackage({
          headers: {
            Authorization: `Bearer ${user.user.authToken}`,
          }
        });;
        setPackageData(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [user.authToken]);


  if (loading) {
    return <Loader />; // Display loader while fetching data
  }

  if (error) {
    return <p>Error: {error}</p>; // Handle errors
  }

  return (
    <>
    <Packages packages={packageData} />
    </>
  );
};

export default PackagePage;
