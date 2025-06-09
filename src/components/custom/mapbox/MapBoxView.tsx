"use client";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import * as turf from "@turf/turf";
import { useCKSettingData } from "@/hooks/useCKSettingData";

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_KEY}`;

type Props = {
  latEmployee?: number;
  longEmployee?: number;
};

export default function MapboxMap({ latEmployee, longEmployee }: Props) {
  const mapContainer = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { locationRule } = useCKSettingData();

  const designatedLat = parseFloat(locationRule?.latitude ?? "0");
  const designatedLng = parseFloat(locationRule?.longitude ?? "0");
  const radius = parseFloat(locationRule?.radius ?? "0");

  console.log(latEmployee, longEmployee)

  if (latEmployee == undefined || longEmployee == undefined) {
    return (
      <div className="p-4 text-sm text-gray-600 italic">
        Data location not found.
      </div>
    );
  }

  const getDistanceFromLatLonInMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371000;
    const toRad = (angle: number) => (angle * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [designatedLng, designatedLat],
      zoom: 16,
      attributionControl: false,
    });

    mapRef.current = map;

    // Add radius circle
    map.on("load", () => {
      const circle = turf.circle([designatedLng, designatedLat], radius, {
        steps: 64,
        units: "meters",
      });

      console.log(latEmployee, longEmployee);

      // employee location
      map.loadImage("../images/current-location.png", (error, image) => {
        if (error || !image) {
          console.error("Gagal memuat ikon pin:", error);
          return;
        }

        if (!map.hasImage("pin")) {
          map.addImage("pin", image);
        }
      });

      map.addSource("pin", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [
                  longEmployee ? longEmployee : 0,
                  latEmployee ? latEmployee : 0,
                ],
              },
            },
          ],
        },
      });

      map.addLayer({
        id: "pin-layer",
        type: "symbol",
        source: "pin",
        layout: {
          "icon-image": "pin",
          "icon-size": 0.2,
          "icon-anchor": "bottom",
        },
      });

      map.addSource("radius-circle", {
        type: "geojson",
        data: circle,
      });

      map.addLayer({
        id: "radius-circle-fill",
        type: "fill",
        source: "radius-circle",
        paint: {
          "fill-color": "#1E3A5F", // Warna merah
          "fill-opacity": 0.15,
        },
      });

      // office location
      map.loadImage("../images/office.png", (error, image) => {
        if (error || !image) {
          console.error("Gagal memuat ikon kantor:", error);
          return;
        }

        if (!map.hasImage("office")) {
          map.addImage("office", image);
        }

        map.addSource("office-point", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: [designatedLng, designatedLat],
                },
              },
            ],
          },
        });

        map.addLayer({
          id: "office-layer",
          type: "symbol",
          source: "office-point",
          layout: {
            "icon-image": "office",
            "icon-size": 0.06,
            "icon-anchor": "bottom",
          },
        });
      });
    });

    return () => map.remove();
  }, [designatedLat, designatedLng, radius]);

  return (
    <div>
      <div className="relative w-full h-full rounded-md">
        <div>
          <div ref={mapContainer} className="w-full h-[300px] rounded-md" />
          <div className="absolute bottom-2 right-2 text-xs flex flex-col gap-2">
            <div
              className="bg-white p-2 rounded shadow cursor-pointer hover:bg-neutral-100"
              onClick={() => {
                if (mapRef.current) {
                  if (mapRef.current) {
                    mapRef.current.flyTo({
                      center: [
                        longEmployee ? longEmployee : 0,
                        latEmployee ? latEmployee : 0,
                      ],
                      zoom: 17,
                    });
                  }
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#145be1"
                className="icon icon-tabler icons-tabler-filled icon-tabler-current-location"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 1a1 1 0 0 1 1 1v1.055a9.004 9.004 0 0 1 7.946 7.945h1.054a1 1 0 0 1 0 2h-1.055a9.004 9.004 0 0 1 -7.944 7.945l-.001 1.055a1 1 0 0 1 -2 0v-1.055a9.004 9.004 0 0 1 -7.945 -7.944l-1.055 -.001a1 1 0 0 1 0 -2h1.055a9.004 9.004 0 0 1 7.945 -7.945v-1.055a1 1 0 0 1 1 -1m0 4a7 7 0 1 0 0 14a7 7 0 0 0 0 -14m0 3a4 4 0 1 1 -4 4l.005 -.2a4 4 0 0 1 3.995 -3.8" />
              </svg>
            </div>
            <div
              className="text-black bg-primary-900 p-2 rounded shadow cursor-pointer hover:bg-primary-950"
              onClick={() => {
                if (mapRef.current && navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((pos) => {
                    if (mapRef.current) {
                      mapRef.current.flyTo({
                        center: [designatedLng, designatedLat],
                        zoom: 17,
                      });
                    }
                  });
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-buildings"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 21v-15c0 -1 1 -2 2 -2h5c1 0 2 1 2 2v15" />
                <path d="M16 8h2c1 0 2 1 2 2v11" />
                <path d="M3 21h18" />
                <path d="M10 12v0" />
                <path d="M10 16v0" />
                <path d="M10 8v0" />
                <path d="M7 12v0" />
                <path d="M7 16v0" />
                <path d="M7 8v0" />
                <path d="M17 12v0" />
                <path d="M17 16v0" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
