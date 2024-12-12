import React, { useEffect, useState } from "react";
import MapWithPolygon from "../../components/mapComponent";
import { getDataApi } from "../../utils/index";
import "./index.css";

function MapsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getDataApi(`districts/getById?id=122`);
      setData(res.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <section className="map_container">
        <p>Loading map data...</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="map_container">
        <p>Map data could not be loaded. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="map_container">
      <MapWithPolygon data={data} />
    </section>
  );
}

export default MapsPage;
