import React, { useState } from 'react';
import { LoadScript, StandaloneSearchBox, GoogleMap } from "@react-google-maps/api";
import '../../styles/autocomplete.css';

const LIB = ['places'];

const AutoCompleteInput = () => {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [searchBox, setSearchBox] = useState(null);

  const onPlacesChanged = () => {
    const places = searchBox?.getPlaces();
    console.log(places)
    let lat, lng;
    if (places[0].geometry && places[0].geometry.location) {
      lat = places[0].geometry.location.lat();
      lng = places[0].geometry.location.lng();
    }
    console.log("PLACES", places, lat, lng) 

    if (places && places.length > 0) {
      console.log(places[0].formatted_address);
    }
  };

  const onSBLoad = (ref) => {
    console.log("SearchBox Loaded:", ref);
    setSearchBox(ref);
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={LIB}>
      <StandaloneSearchBox onLoad={onSBLoad} onPlacesChanged={onPlacesChanged} style={{ position: 'relative', zIndex: 9999 }}>
        <input
          type="text"
          placeholder="Business name, address, town or zip code"
          autoComplete='on'
          style={{ position:'absolute', width: '100%', padding: '10px', fontSize: '16px', zIndex: 999 }}
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default AutoCompleteInput;
