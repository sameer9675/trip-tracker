import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext(); // starting with capital because its a component

const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

// reducer fxn should be a pure function -> means no side affect
//cities/loaded  -> its a naming convention  -> think like it as an event for easy purpoe
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      // setIsLoading(true);
      try {
        const cityData = await fetch(`${BASE_URL}/cities`);
        if (!cityData.ok) throw new Error("failing in fetching data");
        const data = await cityData.json();
        dispatch({ type: "cities/loaded", payload: data });

        // setCities(data);
      } catch (e) {
        dispatch({
          type: "error",
          payload: "There was an error in loading cities...",
        });
      } finally {
        //setIsLoading(false); //finally block will run alway whether it is any error or not
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (id == currentCity.id) return;

    dispatch({ type: "loading" });
    // setIsLoading(true);
    try {
      const cityData = await fetch(`${BASE_URL}/cities/${id}`);
      if (!cityData.ok) throw new Error("failing in fetching data");
      const data = await cityData.json();
      dispatch({ type: "city/loaded", payload: data });

      // setCurrentCity(data);
    } catch (e) {
      dispatch({
        type: "error",
        payload: "There was an error in fetching city data...",
      });
    } finally {
      // setIsLoading(false); //finally block will run alway whether it is any error or not
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    // setIsLoading(true);
    try {
      const cityData = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json", //just api knows which data format it is recieving
        },
      });
      if (!cityData.ok) throw new Error("failing in creating new city");
      const data = await cityData.json();
      dispatch({ type: "city/created", payload: data });

      // making remote state in sync with UI
      // setCities((cities) => [...cities, data]);
      //never mutate cities directly like
      /**
       * can add abnormility like duplicate 'a' or any other unexpected behaviour
       * setCities((cities) => {
            cities.push({...a})
             return cities;
          });
       */
    } catch (e) {
      dispatch({
        type: "error",
        payload: "There was an error in creating data...",
      });
    } finally {
      // setIsLoading(false); //finally block will run alway whether it is any error or not
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    // setIsLoading(true);
    try {
      const cityData = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!cityData.ok) throw new Error("deleting city is failing");
      dispatch({ type: "city/deleted", payload: id });

      // setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (e) {
      dispatch({
        type: "error",
        payload: "There was an error in deleting data...",
      });
    } finally {
      // setIsLoading(false); //finally block will run alway whether it is any error or not
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
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

// REST (Representational State Transfer) API methods:
// GET: Retrieve data
// POST: Create new data
// PUT: Update existing data
// DELETE: Delete data
// OPTIONS: Retrieve available methods for a resource
// PATCH: Partially update existing data

/**
 * As we are dealing with async data ( api call ) that why we did not move api call and all to reducer fxn (as they are pure fxn)
 * if we do not want to make these thing than move the whole logic in dispatch is good way and only passing the dispatch fxn in value of Context is a good way
 *
 */
