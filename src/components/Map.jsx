/*eslint-disable*/
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate(); //useNavigate hook -> re direct to any url without any btn click
  const [searchParam, setSearchParams] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>

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

export default Map;
