import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useHomeStore } from "../store/useHomeStore";

const API_KEY = "1e02dc5e630c241114c0a27b793012d7";

const VEHICLE_RATES = {
  car: 80,
  moto: 30,
  auto: 50,
};

const useCoordinates = (place) => {
  const [location, setLocation] = useState(null);
  const encodedPlace = encodeURIComponent(place);

  useEffect(() => {
    if (!encodedPlace) return;
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${encodedPlace}&limit=5&appid=${API_KEY}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          const { lat, lon } = res.data[0];
          setLocation({ lat, lng: lon });
        }
      })
      .catch((err) => console.error("Error fetching coordinates:", err));
  }, [place]);

  return location;
};

const LiveTracking = ({ setUserLocation }) => {
  const map = useMap();
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        map.flyTo([latitude, longitude], 14);
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [map, setUserLocation]);

  return null;
};

const RoutingMachine = ({
  start,
  end,
  setRouteDetails,
  vehicleType,
  routeRequested,
}) => {
  const map = useMap();
  const {
    setFareDistanceAndDuration,
    setpickupCoordinates,
    setdestinationCoordinates,
  } = useHomeStore();
  useEffect(() => {
    if (!start || !end || !routeRequested) return;
    {
      !start && (start = userLocation);
    }
    setpickupCoordinates(start);
    setdestinationCoordinates(end);
    try {
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
        routeWhileDragging: true,
        createMarker: (i, waypoint) =>
          L.marker(waypoint.latLng, { draggable: true }),
        itineraryBuilder: null,
        show: false,
      }).addTo(map);

      routingControl.on("routesfound", function (e) {
        const route = e.routes[0];
        const distanceKm = route.summary.totalDistance / 1000;
        const durationMinutes = route.summary.totalTime / 60;
        const fare = distanceKm * VEHICLE_RATES[vehicleType];
        setRouteDetails({
          distance: distanceKm,
          duration: durationMinutes,
          fare,
        });
        setFareDistanceAndDuration({
          distanceKm,
          durationMinutes,
          fare,
          vehicleType,
        });
      });

      return () => map.removeControl(routingControl);
    } catch (error) {
      console.error("Leaflet Routing Error:", error);
    }
  }, [start, end, map, setRouteDetails, vehicleType, routeRequested]);

  return null;
};

const MapComponent = ({
  startPlace,
  endPlace,
  vehicleType,
  routeRequested,
}) => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [routeDetails, setRouteDetails] = useState({
    distance: 0,
    duration: 0,
    fare: 0,
  });
  const [userLocation, setUserLocation] = useState(null);
  const fetchedStart = useCoordinates(startPlace);
  const fetchedEnd = useCoordinates(endPlace);

  useEffect(() => {
    if (fetchedStart) setStart(fetchedStart);
    if (fetchedEnd) setEnd(fetchedEnd);
  }, [fetchedStart, fetchedEnd]);

  return (
    <div style={{ width: 392, height: "90vh", zIndex: 1, padding: 1 }}>
      <MapContainer
        center={start || { lat: 27.7172, lng: 85.324 }}
        zoom={13}
        style={{ height: "65vh", width: "100%", zIndex: 1 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {userLocation && !start && (
          <Marker position={[userLocation.lat, userLocation.lng]} />
        )}
        {start && <Marker position={[start.lat, start.lng]} />}
        {end && <Marker position={[end.lat, end.lng]} />}
        {start && end && routeRequested && (
          <RoutingMachine
            start={start}
            end={end}
            setRouteDetails={setRouteDetails}
            vehicleType={vehicleType}
            routeRequested={routeRequested}
          />
        )}
        <LiveTracking setUserLocation={setUserLocation} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
