/** @format */

import React from "react";
import "./index.css";
import DemoMemo from "../../components/pieChart";
import { useTranslation } from "react-i18next";
import {
  CarryOutOutlined,
  WarningOutlined,
  InteractionOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import { Card, Calendar, theme } from "antd";
import { useSelector } from "react-redux";

function Home() {
  const { t } = useTranslation();
  const { colors } = useSelector((state) => state.theme);
  const { token } = theme.useToken();
  const iconData = [
    <CarryOutOutlined
      style={{
        fontSize: "24px",
      }}
    />,
    <WarningOutlined
      style={{
        fontSize: "24px",
      }}
    />,
    <InteractionOutlined
      style={{
        fontSize: "24px",
      }}
    />,
    <AlertOutlined
      style={{
        fontSize: "24px",
      }}
    />,
  ];

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const wrapperStyle = {
    width: 290,
    border: `1px solid ${token.colorBorderSecondary}`,
    color: colors.text,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <section className='dashboard_sections'>
      <div className='dashboard_content_container'>
        <div className='card_container_dashboard'>
          {t("dashboardPageData.cardData", { returnObjects: true }).map(
            (item, index) => (
              <Card
                bordered={false}
                style={{
                  background: colors.layoutBackground,
                  color: colors.textLight,
                }}
                key={index}
                className='dashbord_card_element'>
                <div
                  className='icon_box_card'
                  style={{ background: item.color }}>
                  {iconData[index]}
                </div>

                <div>
                  <p>{item.status}</p>
                  <h3>
                    {" "}
                    {item.countValue} <span> {item.counts}</span>
                  </h3>
                </div>
              </Card>
            )
          )}
        </div>

        <div className='dashboard_chart_container' style={{
          background: colors.layoutBackground,
          color: colors.text
        }}>
          <div className='first_chart_data'>
            <DemoMemo color={colors.buttonColor} />
          </div>

          <div className='second_chart_data'>
            
          </div>
        </div>
      </div>

      <div
        className='filter_right_container'
        style={{
          background: colors.layoutBackground,
        }}>
        <div style={wrapperStyle}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>

        <div className='right_chart_data'>
          
        </div>
      </div>
    </section>
  );
}

export default Home;
