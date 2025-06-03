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

  const {locationRule} = useCKSettingData();

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const designatedLat = parseFloat(locationRule?.latitude ?? "0");
  const designatedLng = parseFloat(locationRule?.longitude ?? "0");
  // const designatedLat = -7.944283557841846;
  // const designatedLng = 112.65026022789809;
  const radius = parseFloat(locationRule?.radius ?? "0")

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
    <div className="w-full h-full">
      <div ref={mapContainer} className="w-full h-[300px] rounded-md" />
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Button
          onClick={handleLocationClick}
          className="bg-primary-700 text-white rounded-md p-2 col-span-1"
        >
          Go to My Location
        </Button>
        <Button
        variant={"outline"}
          onClick={handleSetLocation}
          className="rounded-md p-2 col-span-1"
        >
          Go to My Office
        </Button>
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
          <RadiusForm handleCancelClick={handleCancelClick} handleSaveClick={handleSaveClick} selectedLocation={selectedLocation} data_id={locationRule?.data_id}></RadiusForm>
        </div>
      )}
    </div>
  );
}
