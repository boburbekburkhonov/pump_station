/** @format */

import React, { memo, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import myLocations from "../../assets/my_location.svg";
import { useSelector } from "react-redux";

const customIcon = L.icon({
  iconUrl: myLocations,
  iconSize: [64, 64],
  iconAnchor: [32, 64],
  popupAnchor: [0, -64],
});

const MapWithPolygon = memo(({ data, onClickMyLocations, stationData }) => {
  const mapRef = useRef(null);
  const { colors } = useSelector((state) => state.theme);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView(
        [data.latitude, data.longitude],
        12.5
      );

      L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        maxZoom: 19,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    if (data?.pointsPolygon?.length) {
      const validCoordinates = data.pointsPolygon
        .filter(
          (point) =>
            typeof point.latitude === "number" &&
            typeof point.longitude === "number"
        )
        .map((point) => [point.latitude, point.longitude]);

      if (validCoordinates.length > 0) {
        const worldBounds = [
          [-90, -180],
          [-90, 180],
          [90, 180],
          [90, -180],
          [-90, -180],
        ];

        const geoJsonData = {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              worldBounds.map(([lat, lng]) => [lng, lat]),
              validCoordinates.map(([lat, lng]) => [lng, lat]),
            ],
          },
        };

        L.geoJSON(geoJsonData, {
          style: {
            color: colors.buttonColor,
            fillColor: 'rgba(0, 0, 0, 0.1)',
            fillOpacity: 1,
            weight: 5,
          },
        }).addTo(mapRef.current);
      }
    }

    if (stationData?.data?.length) {
      stationData.data.forEach((item) => {
        const [latitude, longitude] = item.location.split("-").map(Number);

        if (!isNaN(latitude) && !isNaN(longitude)) {
          const marker = L.marker([latitude, longitude], { icon: customIcon })
            .addTo(mapRef.current)
            .bindPopup(`<b>${item.name}</b>`);

          marker.on("click", () => onClickMyLocations(item));
        }
      });
    }

    return () => {
      mapRef.current.eachLayer((layer) => {
        if (!(layer instanceof L.TileLayer)) {
          mapRef.current.removeLayer(layer);
        }
      });
    };
  }, [data]);

  return <div id='map' style={{ height: "100vh", width: "100%" }} />;
});

export default MapWithPolygon;
