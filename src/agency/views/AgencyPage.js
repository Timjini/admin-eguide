import { useParams } from "react-router-dom";
import agencyApi from "../../api/agency";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loaders/Loader";
import MemberAvatars from "../ui/MembersAvatars";

const AgencyPage = () => {
  const { agencyId } = useParams();
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Tracks whether the user is editing
  const user = useSelector((state) => state.user);

  console.log("agency", agency)

  // Fetch agency details
  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const response = await agencyApi.agency(agencyId, {
          headers: {
            Authorization: `Bearer ${user.user.authToken}`,
          },
        });
        setAgency(response.data.agency);
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
      <div className="p-4 mb-4  border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2  sm:p-6 ">
        {/* Agency Name */}
        <div className="flex flex-row flex-wrap gap-20">
          <div className="agency-field">
            <label className="block mb-2 text-sm font-medium ">Agency Name:</label>
            {isEditing ? (
              <input
              className="block mb-2 text-sm font-medium "
                type="text"
                name="name"
                value={agency.name}
                onChange={handleInputChange}
              />
            ) : (
              <>
              <input
              className="block mb-2 text-sm font-medium "
                type="text"
                name="name"
                value={agency.name}
              />
              </>
             
            )}
          </div>

          {/* Agency Description */}
          <div className="agency-field">
            <label className="block mb-2 text-sm font-medium">Description:</label>
            {isEditing ? (
              <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                name="description"
                value={agency.description}
                onChange={handleInputChange}
                style={{height:'180px'}}
              />
            ) : (
              <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                name="description"
                value={agency.description}
                style={{height:'180px'}}

              />
            )}
          </div>
        </div>

        {/* Agency Status */}
        <div className="agency-field">
        <label className="block mb-2 text-sm font-medium ">Status:</label>
          {isEditing ? (
            <select name="status" value={agency.status} onChange={handleInputChange}>
              <option value="inactive">Inactive</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          ) : (
            <p>{agency.status}</p>
          )}
        </div>

        {/* Members */}
        <div className="agency-field">
          <label>Members:</label>
          <p>
            <MemberAvatars members={agency.members} />
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
