import React, { useState } from 'react';
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import '../../styles/autocomplete.css';

const LIB = ['places', 'geometry'];

const AutoCompleteInput = ({ placeholder, loadedAlready, onPlaceSelected }) => {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [searchBox, setSearchBox] = useState(null);

  const onPlacesChanged = () => {
    const places = searchBox?.getPlaces();
    console.log("PLACES", places)
    if (places && places.length > 0) {
      const place = places[0];
      const lat = place.geometry?.location.lat();
      const lng = place.geometry?.location.lng();

      onPlaceSelected({ address: place.address_components, lat, lng });
    }
  };

  const onSBLoad = (ref) => {
    setSearchBox(ref);
  };

  return (
    !loadedAlready ? (
      <LoadScript googleMapsApiKey={API_KEY} libraries={LIB}>
        <StandaloneSearchBox onLoad={onSBLoad} onPlacesChanged={onPlacesChanged}>
          <input
            type="text"
            placeholder={placeholder}
            autoComplete='on'
            className='border border-gray-300 text-sm rounded-lg block w-full p-2.5'
          />
        </StandaloneSearchBox>
      </LoadScript>
    ) : (
      <StandaloneSearchBox onLoad={onSBLoad} onPlacesChanged={onPlacesChanged} style={{ position: 'relative', zIndex: 9999 }}>
        <input
          type="text"
          placeholder={placeholder}
          autoComplete='on'
          className='border border-gray-300 text-sm rounded-lg block w-full p-2.5'
        />
      </StandaloneSearchBox>
    )
  );
};

export default AutoCompleteInput;
