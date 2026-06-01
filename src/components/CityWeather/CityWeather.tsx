import { cityData } from "../../data/cityData";
import SpecificHourWeather from "./SpecificHourWeather/SpecificHourWeather";
import styles from './CityWeather.module.css';

export default function CityWeather() {
  return (
    <div className="item">
      <p>Weather of city</p>
      <ul className={styles.container}>
        {cityData.map(item => {
          return (
            <li key={item.hour} className={styles.item}><SpecificHourWeather item={item}/></li>
          )
        })}
      </ul>
    </div>
  );
}