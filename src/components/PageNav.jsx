import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css"; //it is a styles object we can even destructure it
import Logo from "./Logo";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;

// <NavLink to="/product">Product</NavLink> -> NavLink  provides us to which link is currently selected by adding active click
//<Link to=""/> -> does not provide the above thing
