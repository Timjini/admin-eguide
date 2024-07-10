import React, { useState, useEffect } from "react";
import googleMapsLoader from "./googleMapsLoader";
function AutoCompleteInput() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  console.log("Coordinates:", coordinates);
  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        const google = await googleMapsLoader(
          "AIzaSyAymzBudyFhnYfEKb5V0bowMcwh8xaN_6c"
        );
        const autocomplete = new google.maps.places.Autocomplete(
          document.getElementById("autocomplete-input")
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const { geometry } = place;
          const { lat, lng } = geometry.location;
          setCoordinates({ lat: lat(), lng: lng() });
        });
      } catch (error) {
        console.error("Error loading Google Maps API:", error);
      }
    };

    loadGoogleMaps();
  }, []);

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div>
      <input
        id="autocomplete-input"
        value={address}
        onChange={handleInputChange}
        placeholder="Enter your address"
      />
      {coordinates.lat && (
        <p>
          Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
        </p>
      )}
    </div>
  );
}

export default AutoCompleteInput;
