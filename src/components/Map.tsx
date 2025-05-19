// import { useEffect, useRef, useState } from "react";
// import { Loader } from "@googlemaps/js-api-loader";
// import { Coordinates, Location } from "@/types/location";
// import { Button } from "@/components/ui/button";
// import { Navigation, RefreshCw } from "lucide-react";

// interface MapProps {
//   center: Coordinates;
//   locations: Location[];
//   selectedLocation: Location | null;
//   mapType: "Map" | "Satellite";
//   onLocationSelect: (location: Location) => void;
//   onCenterChange?: (center: Coordinates) => void;
//   className?: string;
// }

// const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// if (!GOOGLE_MAPS_API_KEY) {
//   throw new Error("Google Maps API key is required");
// }

// const loader = new Loader({
//   apiKey: GOOGLE_MAPS_API_KEY,
//   version: "weekly",
//   libraries: ["places"],
// });

// export function Map({
//   center,
//   locations,
//   selectedLocation,
//   mapType,
//   onLocationSelect,
//   onCenterChange,
//   className = "",
// }: MapProps) {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [map, setMap] = useState<google.maps.Map | null>(null);
//   const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Initialize map
//   useEffect(() => {
//     let isMounted = true;

//     const initMap = async () => {
//       try {
//         const google = await loader.load();
//         if (!mapRef.current || !isMounted) return;

//         const mapInstance = new google.maps.Map(mapRef.current, {
//           center: { lat: center.latitude, lng: center.longitude },
//           zoom: 14,
//           mapTypeId: mapType === "Satellite" ? "satellite" : "roadmap",
//           mapTypeControl: false,
//           fullscreenControl: false,
//           streetViewControl: false,
//           zoomControl: true,
//           zoomControlOptions: {
//             position: google.maps.ControlPosition.RIGHT_CENTER,
//           },
//         });

//         if (isMounted) {
//           setMap(mapInstance);
//           setIsLoading(false);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError("Failed to load Google Maps");
//           setIsLoading(false);
//         }
//       }
//     };

//     initMap();

//     return () => {
//       isMounted = false;
//     };
//   }, [center, mapType]);

//   // Update markers when locations change
//   useEffect(() => {
//     if (!map) return;

//     // Clear existing markers
//     markers.forEach((marker) => marker.setMap(null));
//     const newMarkers: google.maps.Marker[] = [];

//     // Add new markers
//     locations.forEach((location) => {
//       const marker = new google.maps.Marker({
//         position: {
//           lat: location.coordinates.latitude,
//           lng: location.coordinates.longitude,
//         },
//         map,
//         title: location.name,
//         animation:
//           selectedLocation?.id === location.id
//             ? google.maps.Animation.BOUNCE
//             : undefined,
//       });

//       marker.addListener("click", () => {
//         onLocationSelect(location);
//       });

//       newMarkers.push(marker);
//     });

//     setMarkers(newMarkers);
//   }, [map, locations, selectedLocation, onLocationSelect]);

//   // Update map center when it changes
//   useEffect(() => {
//     if (!map) return;
//     map.setCenter({ lat: center.latitude, lng: center.longitude });
//   }, [map, center]);

//   // Update map type when it changes
//   useEffect(() => {
//     if (!map) return;
//     map.setMapTypeId(mapType === "Satellite" ? "satellite" : "roadmap");
//   }, [map, mapType]);

//   // Handle map center change
//   useEffect(() => {
//     if (!map || !onCenterChange) return;

//     const listener = map.addListener("center_changed", () => {
//       const newCenter = map.getCenter();
//       if (newCenter) {
//         onCenterChange({
//           latitude: newCenter.lat(),
//           longitude: newCenter.lng(),
//         });
//       }
//     });

//     return () => {
//       google.maps.event.removeListener(listener);
//     };
//   }, [map, onCenterChange]);

//   if (error) {
//     return (
//       <div
//         className={`flex items-center justify-center bg-gray-100 ${className}`}
//       >
//         <div className="text-center p-4">
//           <p className="text-red-500 mb-2">{error}</p>
//           <Button onClick={() => window.location.reload()}>Retry</Button>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div
//         className={`flex items-center justify-center bg-gray-100 ${className}`}
//       >
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
//       </div>
//     );
//   }

//   return (
//     <div className={`relative ${className}`}>
//       <div ref={mapRef} className="w-full h-full" />

//       {/* Map Controls */}
//       <div className="absolute bottom-4 right-4 flex flex-col gap-2">
//         <Button
//           variant="secondary"
//           size="icon"
//           className="bg-white shadow-md hover:bg-gray-50"
//           onClick={() => {
//             if (map) {
//               map.setCenter({ lat: center.latitude, lng: center.longitude });
//               map.setZoom(14);
//             }
//           }}
//           aria-label="Recenter map"
//         >
//           <RefreshCw size={16} />
//         </Button>

//         <Button
//           variant="secondary"
//           size="icon"
//           className="bg-white shadow-md hover:bg-gray-50"
//           onClick={() => {
//             if (selectedLocation) {
//               const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.coordinates.latitude},${selectedLocation.coordinates.longitude}`;
//               window.open(url, "_blank");
//             }
//           }}
//           disabled={!selectedLocation}
//           aria-label="Get directions"
//         >
//           <Navigation size={16} />
//         </Button>
//       </div>
//     </div>
//   );
// }
