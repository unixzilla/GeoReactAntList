import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import React from 'react';

const position = [51.505, -0.09];
export const Map = () => {
    
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution=''
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} />
      </MapContainer>
    );
}
