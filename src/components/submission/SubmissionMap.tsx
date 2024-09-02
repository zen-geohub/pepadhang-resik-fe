import {
  Layer,
  Map,
  Marker,
  NavigationControl,
  Source,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

type SubmissionMapProps = {
  markerLatitude: number;
  markerLongitude: number;
};

const SubmissionMap = ({
  markerLatitude,
  markerLongitude,
}: SubmissionMapProps) => {
  return (
    <Map
      id="mapSubmission"
      initialViewState={{
        latitude: -7.801878699942233,
        longitude: 110.37482549667149,
        zoom: 14,
      }}
      mapStyle={`${import.meta.env.VITE_BASEMAP_KEY}`}
      attributionControl={false}
      style={{ borderRadius: "8px" }}
      reuseMaps
    >
      <NavigationControl />
      <Source
        type="vector"
        scheme="tms"
        tiles={[
          `${
            import.meta.env.VITE_GEOSERVER
          }/gwc/service/tms/1.0.0/Karanganyar:merged@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
        ]}
      >
        {/* <Layer
          id="simpang"
          type="fill"
          source-layer="merged"
          // filter={['==', ['get', 'layer'], 'simpang']}
        /> */}
        <Layer
          id="constraints"
          type="fill"
          source-layer="merged"
          paint={{
            "fill-opacity": 0,
          }}
        />
      </Source>
      <Source
        type="vector"
        scheme="tms"
        tiles={[
          `${
            import.meta.env.VITE_GEOSERVER
          }/gwc/service/tms/1.0.0/Karanganyar:batas_administrasi_ar_kel@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
        ]}
      >
        <Layer
          id="batasAdmin"
          type="fill"
          source-layer="batas_administrasi_ar_kel"
          paint={{
            "fill-opacity": 0,
          }}
        />
      </Source>
      <Marker latitude={markerLatitude} longitude={markerLongitude} />
    </Map>
  );
};

export default SubmissionMap;
