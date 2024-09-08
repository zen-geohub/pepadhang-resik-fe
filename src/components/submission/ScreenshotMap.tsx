import {
  Map,
  Marker,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useFormContext } from "react-hook-form";

const ScreenshotMap = () => {
  const { watch } = useFormContext();
  const markerLatitude = watch("Koordinat Lintang");
  const markerLongitude = watch("Koordinat Bujur");

  return (
    <Map
      id="mapScreenshot"
      initialViewState={{
        latitude: -7.801878699942233,
        longitude: 110.37482549667149,
        zoom: 14,
      }}
      mapStyle={`${import.meta.env.VITE_BASEMAP_KEY}`}
      attributionControl={false}
      style={{ position: 'absolute', top: -100000, minWidth: '683px', minHeight: '384px' }}
      reuseMaps
      preserveDrawingBuffer
    >
      <Marker latitude={markerLatitude} longitude={markerLongitude} />
    </Map>
  );
};

export default ScreenshotMap;
