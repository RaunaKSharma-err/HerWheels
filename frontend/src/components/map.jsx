import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

export const MapRouting = ({ coordA, coordB }) => {
  const map = useMap();
  const routingControl = L.Routing.control({
    waypoints: [
      L.latLng(coordA.lat, coordA.lng),
      L.latLng(coordB.lat, coordA.lng),
    ],
    routeWhileDragging: true,
    show: false,
  });
  routingControl.addTo(map);
  map.setView([coordA.lat, coordB.lng], map.getZoom(), {
    animate: true,
    duration: 1,
    easeLinearity: 0.25,
  });
  return null;
};