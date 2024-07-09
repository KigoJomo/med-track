// MapboxComponent.js

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2lnb2pvbW8iLCJhIjoiY2x2bDc3c2RzMTJzeTJpcDcwaDlsMmQ0YSJ9.OS3OoOBTJjXcoF-X4LyULg";

const MapBoxComponent = ({ shipmentDetails }) => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        // style: "mapbox://styles/mapbox/streets-v11",
        style: "mapbox://styles/kigojomo/clvl9b8gn009h01pc7gou2uwf",
        center: [36, 2],
        zoom: 1,
        pitch: 0,
      });
    }
  }, []);

  useEffect(() => {
    if (shipmentDetails && map.current) {
      const { currentLocation, destination, manufacturer } = shipmentDetails;

      map.current.easeTo({
        center: currentLocation,
        zoom: 15,
        pitch: 50,
        duration: 3000,
      });

      const manufacturerToCurrent = [manufacturer, currentLocation];
      const currentToDestination = [currentLocation, destination];

      // Add markers with popups
      new mapboxgl.Marker()
        .setLngLat(currentLocation)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h4>Current Location</h4>`)
            .addTo(map.current)
        )
        .addTo(map.current)
        .togglePopup();

      new mapboxgl.Marker()
        .setLngLat(destination)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h4>Destination</h4>`)
            .addTo(map.current)
        )
        .addTo(map.current)
        .togglePopup();

      new mapboxgl.Marker()
        .setLngLat(manufacturer)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h4>Manufacturer</h4>`)
            .addTo(map.current)
        )
        .addTo(map.current)
        .togglePopup();

      if (map.current.getSource("route-manufacturer-to-current")) {
        map.current.getSource("route-manufacturer-to-current").setData({
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: manufacturerToCurrent,
          },
        });
      } else {
        map.current.addSource("route-manufacturer-to-current", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: manufacturerToCurrent,
            },
          },
        });

        map.current.addLayer({
          id: "route-manufacturer-to-current",
          type: "line",
          source: "route-manufacturer-to-current",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#0050fc",
            "line-width": 8,
          },
        });
      }

      if (map.current.getSource("route-current-to-destination")) {
        map.current.getSource("route-current-to-destination").setData({
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: currentToDestination,
          },
        });
      } else {
        map.current.addSource("route-current-to-destination", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: currentToDestination,
            },
          },
        });

        map.current.addLayer({
          id: "route-current-to-destination",
          type: "line",
          source: "route-current-to-destination",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#608dee",
            "line-width": 8,
            "line-dasharray": [3, 3],
          },
        });
      }
    }
  }, [shipmentDetails]);

  return (
    <div
      className="map-container h-full border border-l-0 border-slate-200 rounded-lg rounded-l-none bg-stone-900"
      ref={mapContainerRef}
    ></div>
  );
};

export default MapBoxComponent;
