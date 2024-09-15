import { useParams } from "react-router-dom";
import agencyApi from "../../api/agency";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loaders/Loader";

const AgencyPage = () => {
  const { agencyId } = useParams();
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Tracks whether the user is editing
  const user = useSelector((state) => state.user);

  // Fetch agency details
  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const response = await agencyApi.agency(agencyId, {
          headers: {
            Authorization: `Bearer ${user.user.authToken}`,
          },
        });
        setAgency(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAgency();
  }, [agencyId, user.user.authToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgency((prevAgency) => ({
      ...prevAgency,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await agencyApi.updateAgency(agencyId, agency, {
        headers: {
          Authorization: `Bearer ${user.user.authToken}`,
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update agency:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Agency Details</h1>
      {agency && (
        <div>
          <div>
            <label>Agency Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={agency.name}
                onChange={handleInputChange}
              />
            ) : (
              <p>{agency.name}</p>
            )}
          </div>

          <div>
            <label>Description:</label>
            {isEditing ? (
              <textarea
                name="description"
                value={agency.description}
                onChange={handleInputChange}
              />
            ) : (
              <p>{agency.description}</p>
            )}
          </div>

          <div>
            <label>Owner:</label>
            {isEditing ? (
              <input
                type="text"
                name="owner"
                value={agency.owner}
                onChange={handleInputChange}
              />
            ) : (
              <p>{agency.owner}</p>
            )}
          </div>

          {isEditing ? (
            <button onClick={handleSaveChanges}>Save Changes</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      )}
    </div>
  );
};

export default AgencyPage;
