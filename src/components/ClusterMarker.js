import React from "react";
import { Marker } from "react-map-gl";

const ClusterMarker = props => {
  return (
    <Marker longitude={props.longitude} latitude={props.latitude}>
      <h1>P</h1>
    </Marker>
  );
};

export default ClusterMarker;
