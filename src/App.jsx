import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Homepage from "./Pages/Homepage";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout";
import "./index.css";
import Login from "./Pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "../src/components/City";
import Form from "../src/components/Form";
import { CitiesProvider } from "./contexts/citiesContext";

function App() {
  return (
    <>
      {/* <h1>Hello Router!</h1> */}
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            {/**
             * Nested route
             *
             * index route is nothing the default child route we have show  -> like by default it will show
             */}
            <Route path="app" element={<AppLayout />}>
              {/* <Route
              index
              element={<CityList isLoading={isLoading} cities={cities} />}
            /> */}
              <Route
                index
                element={
                  <Navigate
                    replace // replace the current element in the history stack (stack of navigation) -> more declerative way
                    to="cities"
                  />
                }
              />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </>
  );
}

export default App;

//defining the route in a declerative way (traditional way)
//<Route path="home" element={Homepage} /> -> before version 6 its like this -> difficult to pass props
//<Route path="*" element={<PageNotFound />} />  -> this * indicate or use if none of the router found

// both the below two are same because index is also use to the default route

// <Route path="/" element={<Homepage />} />
// <Route index element={<Homepage />} />

{
  /* <Route index element={<p>List of cities</p>} /> */
}

{
  /**
   * Index and path can not give to same Route
   */
}
