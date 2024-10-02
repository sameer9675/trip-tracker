import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;

{
  /**  Outlet :-  it is used for nested routing -> by writing whatever JSX or html we have written in element while creating nested route it will render inside 
  this outlet*/
}
{
  /**
   * like this paragraph will render inside this outlet in this case -> similar to how we are rendring children prop
   */
}
{
  /* <Route path="app" element={<AppLayout />}>
<Route path="cities" element={<p>List of cities</p>} />
</Route> */
}
