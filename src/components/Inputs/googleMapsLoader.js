const googleMapsLoader = (apiKey) => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google);
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
      script.defer = true;
      script.async = true;
      script.onerror = reject;

      window.initGoogleMaps = () => {
        resolve(window.google);
        delete window.initGoogleMaps;
      };

      document.head.appendChild(script);
    }
  });
};

export default googleMapsLoader;
