import React, { useState, useEffect, useRef } from "react";
import Autocomplete from "react-google-autocomplete";
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const AutoCompleteInput = () => {

  return (
    <Autocomplete
    apiKey={API_KEY}
    onPlaceSelected={(place) => {
      console.log(place);
    }}
  />
  )
}

export default AutoCompleteInput;