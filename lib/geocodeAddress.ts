// lib/geocodeAddress.ts
export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    );

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No se pudo obtener coordenadas");
    }

    const { lat, lon } = data[0];

    return {
      lat: parseFloat(lat),
      lng: parseFloat(lon),
    };
  } catch (error) {
    console.error("🧨 Geocode error:", error);
    throw new Error("No se pudo obtener coordenadas");
  }
};
