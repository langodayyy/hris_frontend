"use client";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import * as turf from "@turf/turf";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RadiusForm from "@/components/custom/mapbox/RadiusForm";
import { useCKSettingData } from "@/hooks/useCKSettingData";

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_KEY}`;

export default function MapboxMap() {
  const mapContainer = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  const { locationRule, refetch } = useCKSettingData();

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const designatedLat = parseFloat(locationRule?.latitude ?? "0");
  const designatedLng = parseFloat(locationRule?.longitude ?? "0");
  const radius = parseFloat(locationRule?.radius ?? "0");

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

    // Add click event listener for edit mode
    map.on("click", (e) => {
      map.loadImage("../images/map-pin.png", (error, image) => {
        if (error || !image) {
          console.error("Gagal memuat ikon pin:", error);
          return;
        }

        if (!map.hasImage("map-pin")) {
          map.addImage("map-pin", image);
        }
      });

      if (isEditMode) {
        const { lng, lat } = e.lngLat;

        if (map.getSource("edit-pin-point")) {
          map.removeLayer("edit-pin-layer");
          map.removeSource("edit-pin-point");
        }

        // Add new pin point
        map.addSource("edit-pin-point", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: [lng, lat],
                },
              },
            ],
          },
        });

        map.addLayer({
          id: "edit-pin-layer",
          type: "symbol",
          source: "edit-pin-point",
          layout: {
            "icon-image": "map-pin",
            "icon-size": 0.2,
            "icon-anchor": "bottom",
          },
        });

        setSelectedLocation({ lat, lng });
      }
    });

    setTimeout(() => {
      map.resize();
    }, 100);

    // Add radius circle
    map.on("load", () => {
      const circle = turf.circle([designatedLng, designatedLat], radius, {
        steps: 64,
        units: "meters",
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

      map.loadImage("../images/current-location.png", (error, image) => {
        if (error || !image) {
          console.error("Gagal memuat ikon pin:", error);
          return;
        }

        if (!map.hasImage("pin")) {
          map.addImage("pin", image);
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;

            // Add source with actual location
            map.addSource("pin-point", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: [longitude, latitude],
                    },
                  },
                ],
              },
            });

            map.addLayer({
              id: "pin-layer",
              type: "symbol",
              source: "pin-point",
              layout: {
                "icon-image": "pin",
                "icon-size": 0.2,
                "icon-anchor": "bottom",
              },
            });

            // Optionally fly to actual location
            map.flyTo({ center: [longitude, latitude], zoom: 17 });
          });
        }
      });

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

    // GPS position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("Current position:", latitude, longitude);
        map.flyTo({ center: [longitude, latitude], zoom: 17 });
      });
    }

    return () => map.remove();
  }, [designatedLat, designatedLng, radius, isEditMode]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    if (selectedLocation) {
      // Here you can handle saving the location
      console.log("Saving location:", selectedLocation);
      setIsEditMode(false);
    }
  };

  const handleCancelClick = () => {
    if (markerRef.current) {
      markerRef.current.remove();
    }
    setSelectedLocation(null);
    setIsEditMode(false);
  };

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: 17,
          essential: true,
        });
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  const handleSetLocation = () => {
    mapRef.current?.flyTo({
      center: [designatedLng, designatedLat],
      zoom: 17,
      essential: true,
    });
  };

  return (
    <div>
      <div className="relative w-full h-full rounded-md">
        <div>
          <div ref={mapContainer} className="w-full h-[300px] rounded-md" />
          <div className="absolute bottom-2 right-2 text-xs flex flex-col gap-2">
            <div
              className="bg-white p-2 rounded shadow cursor-pointer hover:bg-neutral-100"
              onClick={() => {
                if (mapRef.current && navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((pos) => {
                    const { latitude, longitude } = pos.coords;
                    if (mapRef.current) {
                      mapRef.current.flyTo({
                        center: [longitude, latitude],
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
      {!isEditMode ? (
        <Button
          variant="outline"
          size="lg"
          className="mt-2 w-full"
          onClick={handleEditClick}
        >
          Edit
        </Button>
      ) : (
        <div className="mt-4">
          <RadiusForm
            handleCancelClick={handleCancelClick}
            handleSaveClick={handleSaveClick}
            selectedLocation={selectedLocation}
            data_id={locationRule?.data_id}
            onUpdate={() => {
              refetch();
            }}
          ></RadiusForm>
        </div>
      )}
    </div>
  );
}
