import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Homepage from "./Pages/Homepage";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout";
import "./index.css";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      {/* <h1>Hello Router!</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="app" element={<AppLayout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

//defining the route in a declerative way (traditional way)
//<Route path="home" element={Homepage} /> -> before version 6 its like this -> difficult to pass props
//<Route path="*" element={<PageNotFound />} />  -> this * indicate or use if none of the router found
