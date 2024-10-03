import styles from './CityItem.module.css'

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

function CityItem({
    city
}) {

    const {cityName, emoji, date} = city;
    

    return <li className={styles.cityItem}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
    </li>
}

export default CityItem;

// The <time> HTML element represents a specific period in time. It may include the 
// datetime attribute to translate dates into machine-readable format, allowing for better search engine results or custom features such as reminders.