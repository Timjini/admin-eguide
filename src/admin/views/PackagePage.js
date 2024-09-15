import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import packageApi from "../../api/agency";
import Loader from "../../components/Loaders/Loader";

const PackagePage = () => {
  const { packageId } = useParams();
  const user = useSelector((state) => state.user);
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await packageApi.getPackage({
          headers: {
            Authorization: `Bearer ${user.authToken}`,
          },
          params: {
            id: packageId,
          },
        });
        setPackageData(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (user.authToken) {
      fetchPackageData();
    }
  }, [packageId, user.authToken]); 

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>; 
  }

  return (
    <div>
      {packageData ? (
        <div>
          <h2>{packageData.name}</h2>
          <p>{packageData.description}</p>
          {/* Render other package details */}
        </div>
      ) : (
        <p>No package data available</p>
      )}
    </div>
  );
};

export default PackagePage;
