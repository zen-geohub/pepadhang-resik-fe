import {
  Layer,
  Map,
  Marker,
  NavigationControl,
  Source,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useFormContext } from "react-hook-form";

export type SubmissionMapProps = {
  markerLatitude: number;
  markerLongitude: number;
};

const SubmissionMap = () => {
  const { watch } = useFormContext();
  const markerLatitude = watch("Koordinat Lintang");
  const markerLongitude = watch("Koordinat Bujur");

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
      preserveDrawingBuffer
    >
      <NavigationControl />
      <div className="absolute bottom-2 left-2 h-fit bg-white z-10 p-2 rounded font-poppins text-black">
        <h6 className="font-bold mb-1 text-sm lg:text-base">Legenda</h6>
        <div className="flex gap-1 mb-2 items-center lg:mb-1 text-xs lg:text-sm">
          <div className="bg-[#de2d26] bg-opacity-80 h-5 w-5"></div>
          <p>Zona Khusus</p>
        </div>
        <div className="flex gap-1 items-center text-xs lg:text-sm">
          <div className="bg-[#fec44f] bg-opacity-80 h-5 w-5"></div>
          <p>Clear Area</p>
        </div>
      </div>
      <Source
        type="vector"
        scheme="tms"
        tiles={[
          `${
            import.meta.env.VITE_GEOSERVER
          }/gwc/service/tms/1.0.0/ppids:merged@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
        ]}
      >
        <Layer
          id="simpang"
          type="fill"
          source-layer="merged"
          filter={["==", ["get", "layer"], "Simpang"]}
          paint={{
            "fill-opacity": 0,
          }}
        />
        <Layer
          id="zonaKhusus"
          type="fill"
          source-layer="merged"
          filter={["==", ["get", "layer"], "Zona Khusus"]}
          paint={{
            "fill-opacity": 0.3,
            "fill-color": "#de2d26",
          }}
        />
        <Layer
          id="clearArea"
          type="fill"
          source-layer="merged"
          filter={["==", ["get", "layer"], "Clear Area"]}
          paint={{
            "fill-opacity": 0.3,
            "fill-color": "#fec44f",
          }}
        />
        {/* <Layer
          id="constraints"
          type="fill"
          source-layer="merged"
          paint={{
            "fill-opacity": 0,
          }}
        /> */}
      </Source>
      <Source
        type="vector"
        scheme="tms"
        tiles={[
          `${
            import.meta.env.VITE_GEOSERVER
          }/gwc/service/tms/1.0.0/ppids:batas_administrasi_ar_kel@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
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
