import {
  Layer,
  Map,
  MapGeoJSONFeature,
  MapMouseEvent,
  NavigationControl,
  Source,
  useMap,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { FeatureCollection } from "geojson";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AdvertisingFeature } from "@/pages/Dashboard";
import { useData } from "@/hooks/useData";

interface CustomMapMouseEvent extends MapMouseEvent {
  features?: MapGeoJSONFeature[];
}

type ClickProps = {
  setFeature: Dispatch<SetStateAction<AdvertisingFeature>>;
};

const DashboardMap = ({ setFeature }: ClickProps) => {
  const { advertisePoint } = useData();
  const [featureCollection, setFeatureCollection] = useState<FeatureCollection>(
    {
      type: "FeatureCollection",
      features: [],
    }
  );

  useEffect(() => {
    setFeatureCollection({
      type: "FeatureCollection",
      features: advertisePoint.map(({ properties, geometry }) => ({
        type: "Feature",
        properties: {
          Kode: properties.Kode,
          Ukuran: properties.Ukuran,
          "Jenis Reklame": properties.Jenis_Rklm,
          Lokasi: properties.Area_Amtn,
          Kelurahan: properties.WADMKD,
          "Naskah/Konten Reklame": properties.Naskah,
          Konstruksi: properties.Konstruksi,
          "Jumlah Sisi": properties.Muka,
          Tinggi: properties.Tnggi_Baru,
          Ornamen: properties.Ornamen,
          "Ornamen Zona Khusus/Ketat": properties.K_Ornamen,
          "Kesesuaian Ketentuan Reklame Rokok": properties.K_Rokok,
          "Kesesuaian Ketinggian": properties.K_Tinggi,
          "Kesesuaian Posisi Reklame di Atas Bangunan": properties.K_Fasad,
          "Kesesuaian Posisi Reklame di Atas Bangunan Maksimal":
            properties.K_FasadMks,
          "Lokasi di Zona Khusus": properties.K_ZonaKhs,
          "Lokasi di Zona Kendali Ketat": properties.K_ZonaKtt,
          "Lokasi terhadap Sudut Simpang": properties.K_Simpang,
          "Jarak Antar Reklame": properties.K_Jarak,
          "Lokasi terhadap Clear Area": properties.K_ARClear,
          Justifikasi: properties.Justifikas,
          Rekomendasi: properties.Rekomendas,
          "Potensi Tindakan": properties.P_Tindakan,
          "Tindakan yang dilakukan jika tidak dilakukan penyesuaian":
            properties.P_TndkLnjt,
          Kondisi: properties.Kondisi,
        },
        geometry: {
          type: "Point",
          coordinates: [geometry.coordinates[0], geometry.coordinates[1]],
        },
      })),
    });
  }, [advertisePoint]);

  const { dashboardMap } = useMap();

  const [previousSelectedFeature, setPreviousSelectedFeature] = useState<
    number | string | undefined
  >(0);

  useEffect(() => {
    const hightlightFeature = (
      featureId: number | string | undefined,
      clickState: boolean
    ) => {
      if (featureId !== 0) {
        dashboardMap?.setFeatureState(
          {
            id: featureId,
            source: "advertisingSource",
          },
          { click: clickState }
        );
      }
    };

    function onClick(e: CustomMapMouseEvent) {
      const clickedFeature = e.features?.[0];

      if (clickedFeature) {
        setFeature({
          Kode: clickedFeature.properties.Kode,
          Ukuran: clickedFeature.properties.Ukuran,
          "Jenis Reklame": clickedFeature.properties["Jenis Reklame"],
          Lokasi: clickedFeature.properties.Lokasi,
          Kelurahan: clickedFeature.properties.Kelurahan,
          "Naskah/Konten Reklame":
            clickedFeature.properties["Naskah/Konten Reklame"],
          Konstruksi: clickedFeature.properties.Konstruksi,
          "Jumlah Sisi": clickedFeature.properties["Jumlah Sisi"],
          Tinggi: clickedFeature.properties.Tinggi,
          Ornamen: clickedFeature.properties.Ornamen,
          "Ornamen Zona Khusus/Ketat":
            clickedFeature.properties["Ornamen Zona Khusus/Ketat"],
          "Kesesuaian Ketentuan Reklame Rokok":
            clickedFeature.properties["Kesesuaian Ketentuan Reklame Rokok"],
          "Kesesuaian Ketinggian":
            clickedFeature.properties["Kesesuaian Ketinggian"],
          "Kesesuaian Posisi Reklame di Atas Bangunan":
            clickedFeature.properties[
              "Kesesuaian Posisi Reklame di Atas Bangunan"
            ],
          "Kesesuaian Posisi Reklame di Atas Bangunan Maksimal":
            clickedFeature.properties[
              "Kesesuaian Posisi Reklame di Atas Bangunan Maksimal"
            ],
          "Lokasi di Zona Khusus":
            clickedFeature.properties["Lokasi di Zona Khusus"],
          "Lokasi di Zona Kendali Ketat":
            clickedFeature.properties["Lokasi di Zona Kendali Ketat"],
          "Lokasi terhadap Sudut Simpang":
            clickedFeature.properties["Lokasi terhadap Sudut Simpang"],
          "Jarak Antar Reklame":
            clickedFeature.properties["Jarak Antar Reklame"],
          "Lokasi terhadap Clear Area":
            clickedFeature.properties["Lokasi terhadap Clear Area"],
          Justifikasi: clickedFeature.properties.Justifikasi,
          Rekomendasi: clickedFeature.properties.Rekomendasi,
          "Potensi Tindakan": clickedFeature.properties["Potensi Tindakan"],
          "Tindakan yang dilakukan jika tidak dilakukan penyesuaian":
            clickedFeature.properties[
              "Tindakan yang dilakukan jika tidak dilakukan penyesuaian"
            ],
          Kondisi: clickedFeature.properties.Kondisi,
        });

        const newFeatureId = clickedFeature.id;

        hightlightFeature(previousSelectedFeature, false);
        setPreviousSelectedFeature(newFeatureId);
        hightlightFeature(newFeatureId, true);
      }
    }

    if (dashboardMap) {
      dashboardMap.on("click", "advertisingPoint", onClick);

      dashboardMap.on("mouseenter", "advertisingPoint", () => {
        dashboardMap.getCanvas().style.cursor = "pointer";
      });

      dashboardMap.on("mouseleave", "advertisingPoint", () => {
        dashboardMap.getCanvas().style.cursor = "";
      });
    }

    return () => {
      if (dashboardMap) {
        dashboardMap.off("click", "advertisingPoint", onClick);
      }
    };
  }, [dashboardMap, setFeature, previousSelectedFeature]);

  return (
    <Map
      id="dashboardMap"
      initialViewState={{
        latitude: -7.801878699942233,
        longitude: 110.37482549667149,
        zoom: 14,
      }}
      mapStyle={`${import.meta.env.VITE_BASEMAP_KEY}`}
      attributionControl={false}
      reuseMaps
    >
      <NavigationControl position="bottom-left" />
      <div className="absolute bottom-[10px] left-12 h-[87px] bg-white z-10 p-1 lg:px-2 rounded font-poppins text-black">
        <h6 className="font-bold mb-1 text-sm lg:text-base">Legenda</h6>
        <div className="flex gap-1 mb-2 items-center lg:mb-1 text-xs lg:text-sm">
          <div className="bg-red-500 h-5 w-5"></div>
          <p>Dibongkar</p>
        </div>
        <div className="flex gap-1 items-center text-xs lg:text-sm">
          <div className="bg-blue-500 h-5 w-5"></div>
          <p>Eksisting</p>
        </div>
      </div>
      {featureCollection && (
        <Source
          id="advertisingSource"
          type="geojson"
          data={featureCollection}
          generateId={true}
        >
          <Layer
            id="advertisingPoint"
            type="circle"
            paint={{
              "circle-color": [
                "case",
                ["==", ["get", "Kondisi"], "Eksisting"],
                "#3182bd",
                ["==", ["get", "Kondisi"], "Dibongkar"],
                "#de2d26",
                "#3182bd",
              ],
              "circle-radius": 5,
              "circle-stroke-color": [
                "case",
                ["boolean", ["feature-state", "click"], false],
                "yellow",
                "white",
              ],
              "circle-stroke-width": [
                "case",
                ["boolean", ["feature-state", "click"], false],
                2,
                0.3,
              ],
            }}
          />
        </Source>
      )}
    </Map>
  );
};

export default DashboardMap;
