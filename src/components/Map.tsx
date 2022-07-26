import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import {SearchedList} from './List';

export interface MarkList {
  position: [number, number]
}
export interface MapProps {
  markers: Array<SearchedList>;
}

const LatestMarker = (props: MarkList) => {
  const map = useMap();
  const lastMarker = props.position;
    map.flyTo(lastMarker);
  return null
}


export const Map = (props: MapProps) => {
  const markers = props.markers;
  const lastMarker:[number, number] = (markers.length > 0 ) ? markers[markers.length - 1].position : [43.658883735915914, -79.38076286800805];

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
