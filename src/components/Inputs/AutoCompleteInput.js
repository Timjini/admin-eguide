import React, { useState } from 'react';
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const LIB = ['places'];

const AutoCompleteInput = () => {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [searchBox, setSearchBox] = useState(null);

  const onPlacesChanged = () => {
    const places = searchBox?.getPlaces();
    if (places && places.length > 0) {
      console.log(places[0].formatted_address);
    }
  };

  const onSBLoad = (ref) => {
    setSearchBox(ref);
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={LIB}>
      <StandaloneSearchBox onLoad={onSBLoad} onPlacesChanged={onPlacesChanged}>
        <input
          type="text"
          placeholder="Business name, address, town or zip code"
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default AutoCompleteInput;
