import React,{useState} from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import TourMapInfo from './TourMapInfo';
import ReactDOMServer from "react-dom/server";


const containerStyle = {
  width: '1200px',
  height: '450px',
};

function TourMap({ tour, stops }) {
//  const [selectedStop, setSelectedStop] = useState(null);

  const center = {
    lat: tour?.start_point.coordinates.lat,
    lng: tour?.start_point.coordinates.lng,
  };

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);

    // start point marker
    const startMarker = new window.google.maps.Marker({
      position: {
        lat: tour?.start_point.coordinates.lat,
        lng: tour?.start_point.coordinates.lng,
      },
      map,
      title: 'Start Point',
    });

    // change component to string to be able to add it to infowindow
    const contentString = ReactDOMServer.renderToString(<TourMapInfo tour={tour} position="start point" />);
    const infowindow = new window.google.maps.InfoWindow({
      content: contentString,
      ariaLabel: tour?.start_point.city,
    });

    startMarker.addListener("click", () => {
        infowindow.open({
          anchor: startMarker,
          map,
        });
      });
    const endMarker = new window.google.maps.Marker({
      position: {
        lat: tour?.end_point.coordinates.lat,
        lng: tour?.end_point.coordinates.lng,
      },
      map,
      title: 'End Point',
    });

    const endContentString = ReactDOMServer.renderToString(<TourMapInfo tour={tour} position="end point" />);
    const endInfoWindow = new window.google.maps.InfoWindow({
        content: endContentString,
        ariaLabel: tour?.end_point.city,
      });
      
      // show popup end
      endMarker.addListener("click", () => {
        endInfoWindow.open({
          anchor: endMarker,
          map,
        });
      });

    // Markers for stops
    stops.forEach((stop) => {
        const stopPosition = { lat: stop.coordinates.lat, lng: stop.coordinates.lng };
      
        const stopMarker = new window.google.maps.Marker({
          position: stopPosition,
          map,
          title: stop.city || 'Stop',
        });
      
        const stopContentString = ReactDOMServer.renderToString(<TourMapInfo tour={tour} position={stop.city || 'Stop'} />);
        
        const stopInfoWindow = new window.google.maps.InfoWindow({
          content: stopContentString,
          ariaLabel: stop.city || 'Stop',
        });
      
        stopMarker.addListener("click", () => {
          stopInfoWindow.open({
            anchor: stopMarker,
            map,
          });
        });
      
        
        bounds.extend(stopPosition);
      });
      
  
      
      const stopCoordinates = stops.map(stop => ({
        lat: stop.coordinates.lat,
        lng: stop.coordinates.lng,
      }));
  
      const pathCoordinates = [
        { lat: tour?.start_point.coordinates.lat, lng: tour?.start_point.coordinates.lng },
        ...stopCoordinates,
        { lat: tour?.end_point.coordinates.lat, lng: tour?.end_point.coordinates.lng }
      ];
  
      const polyline = new window.google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
  
      polyline.setMap(map);

    
    bounds.extend(startMarker.getPosition());
    bounds.extend(endMarker.getPosition());
    map.fitBounds(bounds);

    setMap(map);
  }, [tour]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="flex flex-row justify-center">
         <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
            >
            { /* Additional map components can go here */ }
            <></>
            </GoogleMap>
    </div>

  ) : <></>;
}

export default TourMap;
