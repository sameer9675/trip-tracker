import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import User from "../components/User";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <User />
      <Map />
    </div>
  );
}

export default AppLayout;
