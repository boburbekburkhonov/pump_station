/** @format */

import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { findByIdStationsData } from "../../redux/actions/stationsActions";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import Loading from "../../components/loading";
import "./index.css";

function StationsInformations() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alert);
  const { colors } = useSelector((state) => state.theme);
  const { stationData } = useSelector((state) => state.stations);

  const token = localStorage.getItem("access_token");

  const fetchAllData = useCallback(() => {
    dispatch(findByIdStationsData(params.id, token, i18n.language));
  }, [dispatch, token, i18n.language]);

  useEffect(() => {
    fetchAllData();
    i18n.on("languageChanged", fetchAllData);

    return () => i18n.off("languageChanged", fetchAllData);
  }, [fetchAllData, i18n]);


  return (
    <section className='stations_sections'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className='stations_item_header_container'>
            <Button
              type='primary'
              key='back'
              icon={
                <LeftCircleOutlined
                  style={{
                    fontSize: "18px",
                  }}
                />
              }
            />
          </div>

          <div className='stations_item_data'>
            <div className='map_container_sections'>
             
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default StationsInformations;
