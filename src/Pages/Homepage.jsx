import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        {/** cta in index.css is a global class */}
        <Link to="/login" className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}

{
  /* <a href="/pricing">Pricing</a> -> this will re load the page */
  /* <Link to="/pricing">Pricing</Link> */
  /* <NavLink to="/pricing">Pricing</NavLink> -> this will add active class to element so we can identify currently we are in which path */
}
