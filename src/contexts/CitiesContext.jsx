import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext(); // starting with capital because its a component

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const cityData = await fetch(`${BASE_URL}/cities`);
        if (!cityData.ok) throw new Error("failing in fetching data");
        const data = await cityData.json();
        setCities(data);
      } catch (e) {
        alert("There was an error in loading data...");
      } finally {
        setIsLoading(false); //finally block will run alway whether it is any error or not
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const cityData = await fetch(`${BASE_URL}/cities/${id}`);
      if (!cityData.ok) throw new Error("failing in fetching data");
      const data = await cityData.json();
      setCurrentCity(data);
    } catch (e) {
      alert("There was an error in loading data...");
    } finally {
      setIsLoading(false); //finally block will run alway whether it is any error or not
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("cities context used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
