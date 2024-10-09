import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import BackButton from "./BackButton";
import { useEffect } from "react";
import { useCities } from "../contexts/citiesContext";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const params = useParams(); // will return the query params
  // const [searchParam, setSearchParams] = useSearchParams(); // will help to access the query string
  // const lat = searchParam.get("lat");
  // const lng = searchParam.get("lng");
  // console.log(params, lat, lng);

  const cityId = params?.id;
  const { isLoading, currentCity, getCity } = useCities();

  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  useEffect(
    function () {
      getCity(cityId);
    },
    [cityId]
  );

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.city}>
      City
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}
      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
