"use client";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import * as turf from "@turf/turf";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_KEY}`;

export default function MapboxMap() {
  const mapContainer = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const designatedLat = -7.944280192922373;
  const designatedLng = 112.60562448554032;

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
            "icon-image": "pin",
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
      const circle = turf.circle([designatedLng, designatedLat], 50, {
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
          "fill-color": "#FF0000", // Warna merah
          "fill-opacity": 0.1,
        },
      });

      map.loadImage("../images/map-pin.png", (error, image) => {
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
  }, [isEditMode]);

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

  return (
    <div className="w-full h-full">
      <div ref={mapContainer} className="w-full h-[300px] rounded-md" />
      <button
        onClick={handleLocationClick}
        className="bg-primary-700 text-white rounded-md p-2 w-full mt-2"
      >
        Go to my location
      </button>

      {isEditMode && (
        <div className="mt-2 space-y-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="radius">Radius (meters)</Label>
            <Input
              id="radius"
              type="number"
              min="1"
              // value={12}
              // onChange={handleRadiusChange}
              className="w-full"
            />
          </div>
        </div>
      )}

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
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={handleSaveClick}
            disabled={!selectedLocation}
          >
            Save
          </Button>
          <Button
            variant="destructive"
            size="lg"
            className="flex-1"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </div>
      )}

      {isEditMode && (
        <div className="mt-2 text-sm text-gray-500 text-center">
          Click on the map to place a marker
        </div>
      )}
    </div>
  );
}
