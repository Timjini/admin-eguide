import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import agencyApi from "../../api/agency";
import useGetGuides from "../components/getGuides";
import Alert from "../../components/Alerts/Alert";
import AutoCompleteInput from "../../components/Inputs/AutoCompleteInput";
import { Form } from "react-router-dom";

const AddTour = () => {
  const getGuides = useGetGuides();
  const [guides, setGuides] = useState([]);
  const [alertData, setAlertData] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const [tourData, setTourData] = useState({
    title: "",
    description: "",
    guide: "",
    agency: "",
    startingDate: "",
    endingDate: "",
    image: null,
    startingPoint: {
      street_1: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
      coordinates: { lat: null, lng: null },
      address_type: 0,
    },
    endingPoint: {
      street_1: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
      coordinates: { lat: null, lng: null },
      address_type: 1,
    },
    stops: [],
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setTourData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handlePlaceChange = (name, place) => {
    if (!place) return;

    const addressComponents = place?.address || [];

    const getComponent = (components, type) => {
      const component = components?.find(c => c.types.includes(type));
      return component;
    };

    const street_1 = getComponent(addressComponents, "route");
    const street_2 = getComponent(addressComponents, "administrative_area_level_4");
    const state = getComponent(addressComponents, "administrative_area_level_2");
    const city = getComponent(addressComponents, "administrative_area_level_1");
    const country = getComponent(addressComponents, "country");
    const postal_code = getComponent(addressComponents, "postal_code");
    const coordinates = place ? {
      lat: place.lat,
      lng: place.lng,
    } : null;

    const address_type = name === "startingPoint" ? 0 : name === "endingPoint" ? 1 : 2;

    setTourData((prevData) => ({
      ...prevData,
      [name]: {
        street_1: street_1?.long_name || "",
        city: city?.long_name || "",
        state: state?.long_name || "",
        country: country?.long_name || "",
        postal_code: postal_code?.long_name || "",
        coordinates,
        address_type,
      },
    }));
  };


  const handleStopChange = (index, place) => {
    const addressComponents = place?.address || [];

    const getComponent = (components, type) => {
      const component = components?.find(c => c.types.includes(type));
      return component;
    };

    const street_1 = getComponent(addressComponents, "route");
    const street_2 = getComponent(addressComponents, "administrative_area_level_4");
    const state = getComponent(addressComponents, "administrative_area_level_2");
    const city = getComponent(addressComponents, "administrative_area_level_1");
    const country = getComponent(addressComponents, "country");
    const postal_code = getComponent(addressComponents, "postal_code");
    const coordinates = place ? {
      lat: place?.lat,
      lng: place?.lng,
    } : null;

    const address_type = 2

    setTourData((prevData) => {
      const updatedStops = [...prevData.stops];
      updatedStops[index] = {
        street_1: street_1?.long_name || "",
        city: city?.long_name || "",
        state: state?.long_name || "",
        country: country?.long_name || "",
        postal_code: postal_code?.long_name || "",
        coordinates,
        address_type,
      };
      return { ...prevData, stops: updatedStops };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("title", tourData.title);
      formData.append("description", tourData.description);
      formData.append("guide", tourData.guide);
      formData.append("agency", user.user.agency._id);
      formData.append("starting_date", tourData.startingDate);
      formData.append("ending_date", tourData.endingDate);
      formData.append("image", tourData.image);
      formData.append("start_point", JSON.stringify(tourData.startingPoint));
      formData.append("end_point", JSON.stringify(tourData.endingPoint));
      formData.append("stops", JSON.stringify(tourData.stops));
  
      const response = await agencyApi.addTour(formData, {
        headers: {
          Authorization: `Bearer ${user.user.authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setAlertData({ message: response.data, status: "success" });
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error adding tour:", error);
      setAlertData({
        message: "An error occurred while adding the tour",
        status: "error",
      });
      setLoading(false);
    }
  };
  


  useEffect(() => {
    const fetchGuides = async () => {
      const guidesData = await getGuides();
      setGuides(guidesData);
    };

    fetchGuides();
  }, []);

  const addStop = () => {
    setTourData((prevData) => ({
      ...prevData,
      stops: [
        ...prevData.stops,
        {
          street_1: "",
          city: "",
          state: "",
          country: "",
          postal_code: "",
          coordinates: { lat: null, lng: null },
          address_type: 2,
        },
      ],
    }));
  };

  const deleteStop = (index) => {
    setTourData((prevData) => ({
      ...prevData,
      stops: prevData.stops.filter((_, i) => i !== index),
    }));
  };

  const handleCancel = (e) => {
    e.target.reset();
  };

  return (
    <>
      <Alert
        message={alertData?.message}
        status={alertData?.status}
        onClose={() => setAlertData(null)}
      />
      <form onSubmit={handleSubmit} className="p-4 md:p-5 flex flex-col">
        <div className="py-2 flex flex-col">
          <div className="flex flex-col mb-2">
            <label className="block mb-2 text-sm font-medium">Title:</label>
            <input
              type="text"
              name="title"
              value={tourData.title}
              onChange={handleChange}
              className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="block mb-2 text-sm font-medium">Description:</label>
            <textarea
              name="description"
              rows="4"
              className="block p-2.5 w-full text-sm rounded-lg border border-gray-300"
              value={tourData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="block mb-2 text-sm font-medium">Guide:</label>
            <select
              name="guide"
              value={tourData.guide}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md"
              required
            >
              <option value="" className="">
                Select a guide
              </option>
              {guides.map((guide) => (
                <option key={guide._id} value={guide._id} className="w-full p-2.5" required>
                  {guide.user?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mb-2">
            <label className="block mb-2 text-sm font-medium">Starting Date:</label>
            <input
              type="date"
              name="startingDate"
              className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              value={tourData.startingDate}
              onChange={handleChange}
              min={new Date()}
              required
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="block mb-2 text-sm font-medium">Ending Date:</label>
            <input
              type="date"
              name="endingDate"
              value={tourData.endingDate}
              onChange={handleChange}
              className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium">Starting Point:</label>
            <AutoCompleteInput
              placeholder={"Enter starting place name"}
              loadedAlready={false}
              onPlaceSelected={(place) => handlePlaceChange("startingPoint", place)}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium">Ending Point:</label>
            <AutoCompleteInput
              placeholder={"Enter a destination name"}
              loadedAlready={false}
              onPlaceSelected={(place) => handlePlaceChange("endingPoint", place)}
            />
          </div>
          <div className={`${tourData.stops.length > 0 ? "bg-slate-100" : "transparent"} p-3 rounded-lg`}>
            {tourData.stops.map((stop, index) => (
              <div className="mb-5" key={index}>
                <label className="block mb-2 text-sm font-medium">Stop {index + 1}:</label>
                <AutoCompleteInput
                  placeholder={"Enter a stop place name"}
                  loadedAlready={true}
                  onPlaceSelected={(place) => handleStopChange(index, place)}
                />
                <button
                  type="button"
                  className="text-sm text-red-500 mt-2"
                  onClick={() => deleteStop(index)}
                >
                  Delete Stop
                </button>
              </div>
            ))}
          </div>
          <div className="mb-5">
            <button
              type="button"
              className="secondaryBtn font-medium rounded-lg text-sm m-1 px-5 py-2.5 text-center me-2 mb-2"
              onClick={addStop}
            >
              {tourData.stops.length > 0 ? "Add one more stop" : "Add a stop"}
            </button>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium">Upload Tour Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>
        </div>
        <div className="mt-24 mt-auto">
          {loading ? (
            <div className="flex flex-row justify-end">
              <button
                disabled
                type="button"
                className="primaryBtn font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center me-2 mb-2"
              >
                Processing...
              </button>
            </div>
          ) : (
            <div className="flex flex-row justify-end">
              <button
                type="submit"
                className="primaryBtn font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center me-2 mb-2"
              >
                Save
              </button>
              <button
                type="button"
                className="secondaryBtn font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default AddTour;
