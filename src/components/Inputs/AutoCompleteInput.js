import React, { useRef, useState } from 'react';
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const LIB = ['places'];

const AutoCompleteInput = () => {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [searchBox, setSearchBox] = useState(null);
  const [address, setAddress] = useState('');
  const inputRef = useRef(null);

  const onPlacesChanged = () => {
    const places = searchBox?.getPlaces();
    console.log('Places:', places);
    if (places && places.length > 0) {
      setAddress(places[0].formatted_address);
    }
  };

  const onSBLoad = (ref) => {
    console.log('SearchBox loaded:', ref);
    setSearchBox(ref);
  };

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={LIB}
    >
      <StandaloneSearchBox
        onLoad={onSBLoad}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Business name, address, town or zip code"
          ref={inputRef}
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
}

export default AutoCompleteInput;
