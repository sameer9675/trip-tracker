import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/citiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  const { currentCity } = useCities();

  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          currentCity?.id === id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;

// The <time> HTML element represents a specific period in time. It may include the
// datetime attribute to translate dates into machine-readable format, allowing for better search engine results or custom features such as reminders.

//<Link to={`/city`} className={styles.cityItem}> </Link>  if we wirte 'city' with / it will append to root url, but if we don't write this it will append to currentl url
