import React, { useEffect } from "react";

const InfoWindowContent = ({ title, content, linkText, linkHref }) => {
  const contentString = `
    <div id="content">
      <div id="siteNotice"></div>
      <h1 id="firstHeading" class="firstHeading">${title}</h1>
      <div id="bodyContent">
        <p>${content}</p>
        <p>Attribution: ${title}, <a href="${linkHref}">${linkText}</a></p>
      </div>
    </div>
  `;

  useEffect(() => {
    const infowindow = new window.google.maps.InfoWindow({
      content: contentString,
      ariaLabel: title,
    });

    // Assuming there's a marker or map instance to attach the InfoWindow to
    // Replace `marker` with your actual Google Maps marker object
    const marker = new window.google.maps.Marker({
      position: { lat: -25.344, lng: 131.036 }, // Example coordinates for Uluru
      map: window.googleMap, // Assuming you have a google map instance
      title: title,
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map: window.googleMap,
        shouldFocus: false,
      });
    });

    return () => {
      window.google.maps.event.clearListeners(marker, "click");
    };
  }, [contentString, title]);

  return null; // This component doesn't render anything itself
};

export default InfoWindowContent;
