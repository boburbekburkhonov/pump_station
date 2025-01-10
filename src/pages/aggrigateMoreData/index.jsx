/** @format */

import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useMemo,
  lazy,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Select, DatePicker, Anchor, Button } from "antd";
import Excel from "../../assets/xls.d451c295.png";

import {
  getYesterdayAggregateIDData,
  getTodayAggregateIDData,
  getDailyAggregateIDData,
} from "../../redux/actions/dashboardActions";
import Loading from "../../components/loading";
import "../dashboard/index.css";
import "./index.css";
import TableComponent from "../../components/tableComponent";

const DashboardLineChart = lazy(() =>
  import("../../components/dashboardLineChart")
);
const { RangePicker } = DatePicker;

const FirstSections = memo(
  ({
    dataSource,
    columns,
    currentPage,
    pageSize,
    totalPage,
    handlePaginationChange,
    colors,
    t,
    changeDataViewType,
    isType,
    theme,
  }) => (
    <div
      style={{
        background: colors.layoutBackground,
      }}
      className='pump_selected_data_with_today'>
      <div className='header_more_aggregate_data'>
        <h1 className='head_title_data'>
          {
            t("dataPagesInformation.selectButtonNames", {
              returnObjects: true,
            })[0].title
          }
        </h1>

        <div className='header_more_aggregate_data'>
          <Button
            type={isType ? "default" : "primary"}
            onClick={() => changeDataViewType(false)}>
            {t("dataPagesInformation.buttonDataType1")}
          </Button>

          <Button
            type={isType ? "primary" : "default"}
            onClick={() => changeDataViewType(true)}>
            {t("dataPagesInformation.buttonDataType2")}
          </Button>
          <span>
            <img alt='download_excel' src={Excel} />
          </span>
        </div>
      </div>
      {isType ? (
        <DashboardLineChart
          data={dataSource || []}
          theme={theme}
          valueTemp={t("dashboardPageData.lastStationsData.energyValueView")}
        />
      ) : (
        <TableComponent
          columns={columns}
          dataSource={dataSource}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPage={totalPage}
          handlePaginationChange={handlePaginationChange}
        />
      )}
    </div>
  )
);

const SecondSections = memo(() => <div>Second Element</div>);

const ThirdSections = memo(() => <div>Third Element</div>);

const FourThSections = memo(() => <div>FourTh Element</div>);

const FiveThSections = memo(() => <div>FiveTh Element</div>);

const AggrigateMoreData = memo(() => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const params = useParams();
  const token = localStorage.getItem("access_token");

  const { loading } = useSelector((state) => state.alert);
  const { colors, theme } = useSelector((state) => state.theme);
  const { pumpIdData } = useSelector((state) => state.pumps);

  const [dates, setDates] = useState([moment().subtract(1, "days"), moment()]);
  const [selectDataType, setSelectDataType] = useState(0);
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 9,
  });
  const [activeSection, setActiveSection] = useState("section1");
  const [isActiveGraphic, setIsActiveGraphic] = useState(false);

  // const fetchAllData = useCallback(() => {
  //   const lang = i18n.language;
  //   const id = params.id;

  //   dispatch(
  //     getTodayAggregateIDData(id, token, lang, pageData.page, pageData.perPage)
  //   );
  // }, [dispatch, token, i18n.language, params, pageData]);

  const changeDataTime = useCallback(() => {
    const lang = i18n.language;
    const id = params.id;

    switch (activeSection) {
      case "section1":
        dispatch(
          getTodayAggregateIDData(
            id,
            token,
            lang,
            pageData.page,
            pageData.perPage
          )
        );
        break;
      case "section2":
        dispatch(
          getYesterdayAggregateIDData(
            id,
            token,
            lang,
            pageData.page,
            pageData.perPage
          )
        );
        break;
      case "section3":
        dispatch(
          getDailyAggregateIDData(
            id,
            token,
            lang,
            pageData.page,
            pageData.perPage
          )
        );
        break;
      case "section4":
        dispatch(
          getTodayAggregateIDData(
            id,
            token,
            lang,
            pageData.page,
            pageData.perPage
          )
        );
        break;
      case "section5":
        dispatch(
          getTodayAggregateIDData(
            id,
            token,
            lang,
            pageData.page,
            pageData.perPage
          )
        );
        break;
      default:
        break;
    }
  }, [
    activeSection,
    i18n.language,
    params.id,
    token,
    pageData.page,
    pageData.perPage,
  ]);

  useEffect(() => {
    changeDataTime();

    const handleLanguageChange = () => changeDataTime();
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [changeDataTime, i18n]);

  function formatDate(inputDate) {
    const formatDate = new Date(inputDate).toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formatDate;
  }

  const onDateChange = (dates, dateStrings) => {
    setDates(dateStrings);
  };

  const columnsUser = useMemo(
    () => [
      {
        title: t("dataPagesInformation.dataTableInformation.dataVolume"),
        dataIndex: "volume",
        key: "volume",
        align: "center",
      },
      {
        title: t("dataPagesInformation.dataTableInformation.dataVelocity"),
        dataIndex: "velocity",
        key: "velocity",
        align: "center",
      },
      {
        title: t("dataPagesInformation.dataTableInformation.dataFlow"),
        dataIndex: "flow",
        key: "flow",
        align: "center",
      },
      {
        title: t("dataPagesInformation.dataTableInformation.dataDate"),
        dataIndex: "date",
        key: "date",
        align: "center",
      },
    ],
    [t]
  );

  const handlePaginationChange = useCallback((page, size) => {
    setPageData({
      page,
      perPage: size,
    });
  });

  const changeDataViewType = (value) => {
    setIsActiveGraphic(value);
  };

  if (loading) {
    return (
      <section className='more_info_sections'>
        <Loading />
      </section>
    );
  }

  return (
    <section className='more_info_sections'>
      <div className='pump_data_view_more_header'>
        <div className='pump_data_main_header'></div>

        <div className='pump_data_view_more_header_selected'>
          <Select
            key={"selects_names"}
            size='large'
            style={{
              minWidth: 300,
            }}
            value={selectDataType}
            className='select_input_stations'
            options={t("dataPagesInformation.selectButtonNames", {
              returnObjects: true,
            }).map((item, index) => ({
              value: index,
              label: item.title,
            }))}
            onChange={(key, option) => setSelectDataType(key)}
          />

          <RangePicker
            style={{
              minWidth: 400,
            }}
            size='large'
            placeholder={["Boshlanish sanasi", "Tugash sanasi"]}
            onChange={onDateChange}
          />
        </div>
      </div>

      <Anchor
        className='anchor-items-container'
        direction='horizontal'
        items={t("dataPagesInformation.selectButtonNames", {
          returnObjects: true,
        }).map((item, index) => ({
          key: `section-${index + 1}`,
          href: `#section${index + 1}`,
          title: (
            <p
              style={{
                color:
                  activeSection === `section${index + 1}`
                    ? colors.textWhite
                    : colors.text,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border:
                  activeSection === `section${index + 1}`
                    ? "none"
                    : `1px solid ${colors.buttonColor}`,
                background:
                  activeSection === `section${index + 1}`
                    ? colors.buttonColor
                    : "transparent",
                paddingRight: 10,
                paddingLeft: 10,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: 5,
              }}>
              {item.title}
            </p>
          ),
        }))}
        onClick={(e, link) => {
          e.preventDefault();
          setActiveSection(link.href.replace("#", "")); // Aktiv seksiyani yangilang
        }}
      />

      {activeSection === "section1" && (
        <FirstSections
          columns={columnsUser}
          dataSource={pumpIdData.data?.map((item, index) => ({
            ...item,
            key: item.id || `temp-key-${index}`,
          }))}
          currentPage={pageData.page}
          pageSize={pageData.perPage}
          totalPage={pumpIdData.totalDocuments}
          handlePaginationChange={handlePaginationChange}
          colors={colors}
          t={t}
          changeDataViewType={changeDataViewType}
          isType={isActiveGraphic}
          theme={theme}
        />
      )}

      {activeSection === "section2" && <SecondSections />}
      {activeSection === "section3" && <ThirdSections />}
      {activeSection === "section4" && <FourThSections />}
      {activeSection === "section5" && <FiveThSections />}
    </section>
  );
});

export default AggrigateMoreData;
