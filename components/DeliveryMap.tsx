import { enviarNotificacion, reproducirSonido } from '@/components/ui/sound';
import { images } from '@/constants';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

// Ejemplo de ruta simulada con coordenadas (lat, lng)
// Imagina que esta ruta sigue calles reales entre repartidor y tienda.
const routeCoordinates = [
  { latitude: 10.978667, longitude: -74.824611 }, // start - repartidor
  { latitude: 10.982, longitude: -74.821 },
  { latitude: 10.985, longitude: -74.815 },
  { latitude: 10.990, longitude: -74.810 },
  { latitude: 10.995, longitude: -74.805 },
  { latitude: 11.000, longitude: -74.803 },
  { latitude: 11.0020112, longitude: -74.8008956 }, // end - tienda
];

const tienda = routeCoordinates[routeCoordinates.length - 1];

const MapViewSection = () => {
  const mapRef = useRef<MapView>(null);

  // Estado para el índice del punto actual del repartidor
  const [currentIndex, setCurrentIndex] = useState(0);

  // Estado para la posición actual del repartidor
  const [posicionRepartidor, setPosicionRepartidor] = useState(routeCoordinates[0]);

  // Para animar el movimiento a lo largo de la ruta
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;

      // ✅ Ya llegó al final
      if (nextIndex >= routeCoordinates.length) {
        clearInterval(interval);

        // ⏱️ Retrasa sonido y notificación unos milisegundos
        setTimeout(() => {
          reproducirSonido();
          enviarNotificacion();
        }, 500);

        return prev;
      }

      setPosicionRepartidor(routeCoordinates[nextIndex]);
      return nextIndex;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);


  // Centrar cámara al inicio y cuando cambia la posición
  useEffect(() => {
    mapRef.current?.animateToRegion({
      latitude: posicionRepartidor.latitude,
      longitude: posicionRepartidor.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 500);
  }, [posicionRepartidor]);

  // Polyline mostrará toda la ruta
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
        latitude: posicionRepartidor.latitude,
        longitude: posicionRepartidor.longitude,
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
        coordinate={posicionRepartidor}
        title="Repartidor"
        description="En camino"
        image={images.drivericon}
      />

      {/* 📍 Ruta completa */}
      <Polyline
        coordinates={routeCoordinates}
        strokeColor="#FE8C00"
        strokeWidth={5}
      />
    </MapView>
  );
};

export default MapViewSection;
