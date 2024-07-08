// MapboxComponent.js

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// shipmentDetails.currentLocation

const MapBoxComponent = ({ shipmentDetails }) => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [36.9609, -0.3978],
        zoom: 15,
        pitch: 50,
      });
    }
  }, []);

  useEffect(() => {
    if (shipmentDetails && map.current) {
      const { currentLocation, destination, manufacturer } = shipmentDetails;

      // map.current.setCenter(currentLocation);
      map.current.easeTo({
        center: currentLocation,
        duration: 3000,
      });
      new mapboxgl.Marker().setLngLat(currentLocation).addTo(map.current);
      new mapboxgl.Marker().setLngLat(destination).addTo(map.current);
      new mapboxgl.Marker().setLngLat(manufacturer).addTo(map.current);
    }
  }, [shipmentDetails]);

  return (
    <div
      className="map-container h-full border border-l-0 border-slate-200 rounded-lg rounded-l-none"
      ref={mapContainerRef}
    ></div>
  );
};

export default MapBoxComponent;
