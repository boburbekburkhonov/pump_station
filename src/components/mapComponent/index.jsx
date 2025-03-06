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
import markerGreen from "../../assets/location-blue.png";
import { AreaChartOutlined, ExperimentOutlined, NodeIndexOutlined } from "@ant-design/icons";

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

  if (!isLoaded)
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>
    );

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={mapCenter}
      zoom={12}
      mapTypeId="satellite"
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
                // url: station.status ? markerGreen : markerRed,
                url: station.status ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png" : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                // url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
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
                  width: "400px",
                  padding: "20px",
                  paddingTop: "0",
                  paddingLeft: "10px",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    borderBottom: `3px solid ${
                      selectedMarker.status ? "#40C057" : "red"
                    }`,
                  }}
                >
                  <h2
                    style={{
                      margin: "0",
                      marginBottom: "20px",
                      textAlign: "center",
                    }}
                  >
                    {selectedMarker.name}
                  </h2>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontWeight: "600",
                    fontSize: "16px",
                    borderRadius: "0.25rem",
                    padding: "10px",
                    marginTop: '10px'
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AreaChartOutlined
                      style={{
                        color: colors.textColor,
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <p style={{ margin: "0", marginLeft: "7px" }}>
                      {t(
                        "dataPagesInformation.allStationsAggrigatetotalsVolume"
                      )}
                      :
                    </p>
                  </div>

                  <p style={{ margin: "0" }}>
                    {selectedMarker.aggregate?.reduce(
                      (agg, curr) =>
                        agg + (curr?.pumpLastData?.totalsVolume || 0),
                      0
                    )}{" "}
                    m³
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontWeight: "600",
                    fontSize: "16px",
                    borderRadius: "0.25rem",
                    padding: "10px",
                    paddingBottom: '10px'
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ExperimentOutlined
                      style={{
                        color: colors.textColor,
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <p style={{ margin: "0", marginLeft: "7px" }}>
                      {t("dataPagesInformation.allStationsAggrigatetotalsFlow")}
                      :
                    </p>
                  </div>

                  <p style={{ margin: "0" }}>
                    {selectedMarker.aggregate?.reduce(
                      (agg, curr) => agg + (curr?.pumpLastData?.velocity || 0),
                      0
                    )}{" "}
                    {t(
                      "dashboardPageData.lastStationsData.aggrigateSpeedConst"
                    )}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontWeight: "600",
                    fontSize: "16px",
                    borderRadius: "0.25rem",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <NodeIndexOutlined
                      style={{
                        color: colors.textColor,
                      }}
                      className="dashboard_last_data_icons"
                    />
                    <p style={{ margin: "0", marginLeft: "7px" }}>
                      {t("dataPagesInformation.allStationsElektrActiveEnergy")}
                      :
                    </p>
                  </div>

                  <p style={{ margin: "0" }}>
                    {selectedMarker.electricalEnergyLastData?.reduce(
                      (agg, curr) => agg + (curr?.electricalEnergyLastData?.energyActiveTotal || 0),
                      0
                    )}{" "}
                    kw
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
