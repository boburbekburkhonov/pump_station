/** @format */

import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  GoogleMap,
  InfoWindowF,
  useLoadScript,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import markerRed from "../../assets/location-red.png";
import markerGreen from "../../assets/location-green.png";

const MapWithPolygon = memo(({ data, onClickMyLocations, stationData }) => {
  const { colors } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const GOOGLE_MAPS_API_KEY = `AIzaSyC57hT2pRJZ4Gh85ai0sUjP72i7VYJxTHc&region=UZ&language=${lang}`; // Kalitingizni to‘g‘ri qo‘ying
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [polygonCoords, setPolygonCoords] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    language: lang,
    region: "UZ",
  });

  const mapCenter = { lat: data.latitude * 1, lng: data.longitude * 1 };

  useEffect(() => {
    if (isLoaded) {
      setPolygonCoords(
        data.pointsPolygon.map((e) => ({
          lng: e.longitude,
          lat: e.latitude,
        }))
      );
    }
  }, [isLoaded, data.pointsPolygon]);

  if (!isLoaded) return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={mapCenter}
      zoom={12}
    >
      {/* Polygon */}
      {polygonCoords.length > 0 && (
        <>
          <Polygon
            paths={polygonCoords}
            options={{
              strokeColor: colors.buttonColor,
              strokeOpacity: 1,
              strokeWeight: 5,
              fillColor: colors.buttonColor,
              fillOpacity: 0.1,
            }}
          />

          {/* Markers */}
          {stationData.data?.map((station, index) => (
            <Marker
              icon={{
                url: station.status ? markerGreen : markerRed,
                scaledSize: new window.google.maps.Size(45, 45),
              }}
              key={index}
              position={{
                lat: parseFloat(station.location.split("-")[0]),
                lng: parseFloat(station.location.split("-")[1]),
              }}
              onClick={() => setSelectedMarker(station)}
            />
          ))}

          {/* InfoWindow */}
          {selectedMarker && (
            <InfoWindowF
              options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
              position={{
                lat: parseFloat(selectedMarker.location.split("-")[0]),
                lng: parseFloat(selectedMarker.location.split("-")[1]),
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div
                style={{
                  maxWidth: "440px",
                  width: "400px",
                  padding: "20px",
                  paddingTop: "0",
                  paddingLeft: "10px",
                }}
              >
                <h2 style={{ margin: "0", marginBottom: "20px", textAlign: "center" }}>
                  {selectedMarker.name}
                </h2>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontWeight: "600",
                    fontSize: "16px",
                    marginBottom: "10px",
                    border: `2px solid ${colors.buttonColor}`,
                    borderRadius: "0.25rem",
                    padding: "10px",
                  }}
                >
                  <p style={{ margin: "0"}}>{t("dataPagesInformation.allStationsAggrigatetotalsVolume")}:</p>
                  <div
                    style={{
                      width: "1.8px",
                      height: "25px",
                      backgroundColor: colors.buttonColor,
                    }}
                  ></div>
                  <p style={{ margin: "0"}}>{selectedMarker.aggregate?.reduce((agg, curr) => agg + (curr?.pumpLastData?.volume || 0), 0)} m³</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontWeight: "600",
                    fontSize: "16px",
                    paddingBottom: "20px",
                    border: `2px solid ${colors.buttonColor}`,
                    borderRadius: "0.25rem",
                    padding: "10px",
                  }}
                >
                  <p style={{ margin: "0"}}>{t("dataPagesInformation.allStationsElektrActiveEnergy")}:</p>
                  <div
                    style={{
                      width: "1.8px",
                      height: "25px",
                      backgroundColor: colors.buttonColor,
                    }}
                  ></div>
                  <p style={{ margin: "0"}}>
                    {selectedMarker.electricalEnergyLastData?.reduce((agg, curr) => agg + (curr?.energyActive || 0), 0)}
                    {t("dashboardPageData.lastStationsData.energyValueView")}
                  </p>
                </div>

                <button
                  onClick={() => onClickMyLocations(selectedMarker)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    backgroundColor: colors.buttonColor,
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "8px",
                  }}
                >
                  {t("dataPagesInformation.moreButton")}
                </button>
              </div>
            </InfoWindowF>
          )}
        </>
      )}
    </GoogleMap>
  );
});

export default MapWithPolygon;
