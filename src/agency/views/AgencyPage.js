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
    <div className="content-wrapper">
      <h1>Agency Details</h1>
      {agency && (
        <div className="agency-details">
          {/* Agency Name */}
          <div className="agency-field">
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

          {/* Agency Description */}
          <div className="agency-field">
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

          {/* Agency Owner */}
          <div className="agency-field">
            <label>Owner:</label>
            {isEditing ? (
              <input
                type="text"
                name="owner"
                value={agency.owner.name}
                onChange={handleInputChange}
              />
            ) : (
              <p>{agency.owner.name}</p>
            )}
          </div>

          {/* Agency Status */}
          <div className="agency-field">
            <label>Status:</label>
            {isEditing ? (
              <input
                type="text"
                name="status"
                value={agency.status}
                onChange={handleInputChange}
              />
            ) : (
              <p>{agency.status}</p>
            )}
          </div>

          {/* Subscription Expiry */}
          <div className="agency-field">
            <label>Subscription Expiry:</label>
            {isEditing ? (
              <input
                type="date"
                name="subscriptionEnds"
                value={agency.subscriptionEnds}
                onChange={handleInputChange}
              />
            ) : (
              <p>{agency.subscriptionEnds}</p>
            )}
          </div>

          {/* Members */}
          <div className="agency-field">
            <label>Members:</label>
            <p>
              {agency.members.map((member, index) => (
                <span key={index}>{member.name}{index !== agency.members.length - 1 ? ', ' : ''}</span>
              ))}
            </p>
          </div>

          {/* Edit and Save buttons */}
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
