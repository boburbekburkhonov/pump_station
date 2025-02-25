/** @format */

import React, { memo } from "react";
import { Modal } from "antd";
import { DashboardFilled, ExperimentOutlined } from "@ant-design/icons";
import './index.css'

const ViewMoreStationModal = ({
  openModalData,
  closeModal,
  selectStationId,
  t,
  colors,
  selectedColor
}) => {
  return (
    <Modal
      key='more_station_data_view'
      title={false}
      open={openModalData}
      centered
      onCancel={closeModal}
      onOk={closeModal}
      cancelText={t("stationsPageData.cancelButtonModal")}
      style={{ color: colors.textColor }}
      className='stations_status_body_container_modal'>
      <div
        style={{ background: selectedColor }}
        className='stations_status_body_container'>
        <div style={{
          background: selectedColor,
          color: "#fff"
        }} className='view_more_station_data_header'>
          <h1 style={{
            color: '#fff'
          }}>{selectStationId.stationName}</h1>
        </div>

        <div className='dashboard_view_more_modal_card_item border_color_class'>
          <div className='normal_flex_card'>
            <DashboardFilled
              style={{
                color: "#fff",
              }}
              className='stations_data_icons'
            />

            <h2 style={{color: "#fff"}} className='stations_view_more_data'>
              {t("dataPagesInformation.allStationsAggrigatetotalsVolume")}:
            </h2>
          </div>

          <div
            style={{
              width: "1.5px",
              height: "35px",
              background: "#fff",
            }}
          />

          <h2 style={{color: "#fff"}} className='stations_view_more_data'>
            {selectStationId?.volume} m³
          </h2>
        </div>

        <div className='dashboard_view_more_modal_card_item border_color_class'>
          <div className='normal_flex_card'>
            <ExperimentOutlined
              style={{
                color: "#fff",
              }}
              className='stations_data_icons'
            />

            <h2 style={{color: "#fff"}} className='stations_view_more_data'>
              {t("dataPagesInformation.allStationsElektrActiveEnergy")}:
            </h2>
          </div>

          <div
            style={{
              width: "1.5px",
              height: "35px",
              background: "#fff",
            }}
          />

          <h2 style={{color: "#fff"}} className='stations_view_more_data'>
            {selectStationId?.energyActive}{" "}
            {t("dashboardPageData.lastStationsData.energyValueView")}
          </h2>
        </div>
      </div>
    </Modal>
  );
};

export default memo(ViewMoreStationModal);
