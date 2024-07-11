import React, { useState, useEffect, useRef } from "react";
import Autocomplete from "react-google-autocomplete";
const API_KEY = "AIzaSyAymzBudyFhnYfEKb5V0bowMcwh8xaN_6c";

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