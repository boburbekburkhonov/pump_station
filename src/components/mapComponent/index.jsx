/** @format */

import React, { memo, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import dayjs from "dayjs";
import activeIcon from "../../assets/kindergardenIcon.svg";
import notWorking from "../../assets/not-working.svg";
import deffect from "../../assets/defect.svg";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const customIcon1 = L.icon({
  iconUrl: activeIcon,
  iconSize: [64, 64],
  iconAnchor: [32, 64],
  popupAnchor: [0, -64],
});

const customIcon2 = L.icon({
  iconUrl: notWorking,
  iconSize: [64, 64],
  iconAnchor: [32, 64],
  popupAnchor: [0, -64],
});

const customIcon3 = L.icon({
  iconUrl: deffect,
  iconSize: [64, 64],
  iconAnchor: [32, 64],
  popupAnchor: [0, -64],
});

const MapWithPolygon = memo(({ data, onClickMyLocations, stationData }) => {
  const mapRef = useRef(null);
  const { colors } = useSelector((state) => state.theme);
  const { t } = useTranslation();

  const calculateTotalAggregate = (aggregate) => {
    const initialAggValue = 0;
    if (!Array.isArray(aggregate) || aggregate.length === 0) {
      return initialAggValue;
    }
    return aggregate.reduce(
      (agg, currentValue) => agg + currentValue?.pumpLastData?.volume,
      initialAggValue
    );
  };

  const calculateTotalElectr = (electr) => {
    const initialElectrValue = 0;

    if (!Array.isArray(electr) || electr.length === 0) {
      return initialElectrValue;
    }
    return electr.reduce(
      (agg, currentValue) =>
        agg + currentValue?.electricalEnergyLastData?.energyActive,
      initialElectrValue
    );
  };

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
            fillColor: "rgba(0, 0, 0, 0.1)",
            fillOpacity: 1,
            weight: 5,
          },
        }).addTo(mapRef.current);
      }
    }

    if (stationData?.data?.length) {
      const today = dayjs();
      stationData.data.forEach((item) => {
        const [latitude, longitude] = item.location.split("-").map(Number);

        const totalAggregateData = calculateTotalAggregate(item.aggregate);
        const totalElectrEnegry = calculateTotalElectr(
          item.electricalEnergyLastData
        );

        const aggregateData = Array.isArray(item.aggregate)
          ? item.aggregate[0]
          : {};
        const daysDiff = today.diff(
          dayjs(aggregateData?.date?.split("T")[0]),
          "day"
        );

        let iconToUse = customIcon3;
        if (daysDiff <= 3) {
          iconToUse = item.status ? customIcon1 : customIcon2;
        }

        if (!isNaN(latitude) && !isNaN(longitude)) {
          const marker = L.marker([latitude, longitude], {
            icon: iconToUse,
          }).addTo(mapRef.current).bindPopup(`
            <div style="display: flex; flex-direction: column; align-items: flex-start; width: max-content; gap: 0.75rem;">

              <div style="width: 100%; display: flex; gap: 0.75rem; align-items: center; justify-content: center; margin-bottom: 0.5rem">
                <h2>${item.name}</h2>
              </div>

              <div style="width: 100%; justify-content: space-between; display: flex; gap: 0.75rem; align-items: center; border: 2px solid ${
                colors.buttonColor
              }; border-radius: 0.25rem">

                <h3 style=" padding: 8px;">${t(
                  "dataPagesInformation.allStationsAggrigatetotalsVolume"
                )}:</h3>

                <div style="width: 1.5px; height: 25px; background-color: ${
                  colors.buttonColor
                };">
                </div>

                <h3 style=" padding: 8px;">${totalAggregateData?.toFixed(
                  2
                )}m³</h3>
              </div>

              <div style="width: 100%; justify-content: space-between; display: flex; gap: 0.75rem; align-items: center; border: 2px solid ${
                colors.buttonColor
              }; border-radius: 0.25rem">
                <h3 style=" padding: 8px;">${t(
                  "dataPagesInformation.allStationsElektrActiveEnergy"
                )}:</h3>

                <div style="width: 1.5px; height: 25px; background-color: ${
                  colors.buttonColor
                };">
                </div>

                <h3 style=" padding: 8px;">${totalElectrEnegry?.toFixed(2)}${t(
            "dashboardPageData.lastStationsData.energyValueView"
          )}</h3>
            </div>
              <button
                id="popup-button-${item.id}"
                style="width: 100%; padding: 8px 12px; background-color: ${
                  colors.buttonColor
                }; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 8px;">
                ${t("dataPagesInformation.moreButton")}
              </button>
            </div>
    `);

          marker.on("popupopen", () => {
            const button = document.getElementById(`popup-button-${item.id}`);
            if (button) {
              button.onclick = () => {
                onClickMyLocations(item);
              };
            }
          });
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
  }, [data, colors, stationData]);

  return <div id='map' style={{ height: "100vh", width: "100%" }} />;
});

export default MapWithPolygon;
