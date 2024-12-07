import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import tashkentGeoJson from '../../assets/uz.json';

const MapWithPolygon = () => {
  useEffect(() => {
    const map = L.map('map').setView([41.2995, 69.2401], 12);

    L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      maxZoom: 19,
      attribution: 'Map data &copy; Google',
    }).addTo(map);

    L.geoJSON(tashkentGeoJson.features[13].geometry, {
      style: {
        color: 'blue', 
        fillColor: 'lightblue',
        fillOpacity: 0.5, 
      },
      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name); 
        }
      },
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default MapWithPolygon;
