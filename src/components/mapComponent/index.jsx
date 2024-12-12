import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapWithPolygon = ({ data }) => {
  const mapRef = useRef(null); // Xarita faqat bir marta yaratilishini kuzatish

  useEffect(() => {
    if (!mapRef.current) {
      // Xarita faqat bir marta yaratiladi
      mapRef.current = L.map("map").setView([data.latitude, data.longitude], 12);

      L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        maxZoom: 19,
        attribution: "Map data &copy; Google",
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
        L.polygon(validCoordinates, {
          color: "blue",
          fillColor: "lightblue",
          fillOpacity: 0.5,
        })
          .bindPopup(data.name?.[0]?.name || "Polygon Area")
          .addTo(mapRef.current);
      }
    }

    return () => {
      // Xaritani tozalash
      mapRef.current.eachLayer((layer) => {
        if (!layer._url) {
          mapRef.current.removeLayer(layer);
        }
      });
    };
  }, [data]);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default MapWithPolygon;
