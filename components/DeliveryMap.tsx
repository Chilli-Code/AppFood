import { images } from '@/constants';
import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const MapViewSection = () => {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    setTimeout(() => {
      mapRef.current?.animateToRegion({
        latitude: 10.9903, // centrado entre tienda y repartidor
        longitude: -74.812,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000);
    }, 500);
  }, []);

  // Coordenadas
  const tienda = {
    latitude: 11.0020112,
    longitude: -74.8008956,
  };

  const repartidor = {
    latitude: 10.978667,
    longitude: -74.824611,
  };

  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFillObject}
      mapType="standard"
      showsUserLocation
    
      showsBuildings
      scrollEnabled={false}
      zoomEnabled={true}
      initialRegion={{
        latitude: 10.9903,
        longitude: -74.812,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {/* 🏪 Tienda */}
      <Marker
        coordinate={tienda}
        title="Interglobal Seguridad"
        description="Sucursal La Troja"
        image={images.locationMap}
      />

      {/* 🚴 Repartidor */}
      <Marker
        coordinate={repartidor}
        title="Repartidor"
        description="En camino"
        image={images.drivericon}
      />

      {/* 📍 Ruta trazada */}
      <Polyline
        coordinates={[repartidor, tienda]}
        strokeColor="#FE8C00"
        strokeWidth={5}
      />
    </MapView>
  );
};

export default MapViewSection;
