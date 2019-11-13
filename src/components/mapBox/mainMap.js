import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";
mapboxgl.accessToken =
  "pk.eyJ1Ijoic3VybWFjaCIsImEiOiJjazJmcnQ0YngwM3k1M2hwZjVvY2ZkMnBvIn0.mvj8uM-XUma34v5Y9SiwNA";

export default function MainMap() {
  const [lat, setLat] = useState(34);
  const [lng, setLng] = useState(5);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "mapBoxContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom
    });
  });

  return (
    <div>
      <MapBoxComponent id="mapBoxContainer"></MapBoxComponent>
    </div>
  );
}

const MapBoxComponent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;
