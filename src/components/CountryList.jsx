import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/citiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first Country by clicking on a city on the map" />
    );
  }

  // const unqCountry = [];
  // const countries = cities.filter(city => {
  //   if(!unqCountry.includes(city.country)) {
  //     unqCountry.push(city.country);
  //     return true;
  //   }
  //   return false;
  // }).map(city => ({emoji: city.emoji, country: city.country}))

  //arr -> accumulator
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      arr.push({ emoji: city.emoji, country: city.country });
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
