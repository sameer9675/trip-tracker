import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/citiesContext";

function Map() {
  const { cities } = useCities();
  const [searchParam] = useSearchParams(); //destructuring
  const mapLat = searchParam.get("lat");
  const mapLng = searchParam.get("lng");

  const [mapPosition, setMapPosition] = useState([40, 0]);

  useEffect(() => {
    if (mapLat != null && mapLng != null) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>

      {/* <button
        onClick={() => {
          //passing branch new object with new query string
          setSearchParams({ lat: 23, lng: 50 });
        }}
      >
        Change Pos
      </button> */}
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap(); //given by leaflet
  map.setView(position, 6);
  return null;
}

function DetectClick() {
  const navigate = useNavigate(); //useNavigate hook -> re direct to any url without any btn click

  useMapEvent({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`); // attaching query string
    },
  });
  return null;
}

export default Map;

// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
