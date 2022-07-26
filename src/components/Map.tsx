import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import React, {useEffect} from 'react';

const position: [number, number] = [51.505, -0.09];

export interface MarkList {
  position: [number, number]
}
export interface MapProps {
  markers: Array<MarkList>;
  lastMarker:[number, number];
}

const LatestMarker = (props: MarkList) => {
  const map = useMap();
  const lastMarker = props.position;
    map.flyTo(lastMarker);
  return null
}

export const Map = (props: MapProps) => {
  const markers = props.markers;
  const lastMarker:[number, number] = props.lastMarker;

  return (
    <MapContainer center={lastMarker} zoom={12} scrollWheelZoom={false}>
      <TileLayer
        attribution=''
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) =>
        <Marker key={index} position={marker.position} />
      )}
      <LatestMarker position={lastMarker} />
    </MapContainer>
  );
}
