import { cityData } from "../../../data/cityData";
import SpecificHourWeather from "./SpecificHourWeather/SpecificHourWeather";
import styles from './CityWeather.module.css';

export default function CityWeather({ name, cityArray, setCityArray }: { name: string, cityArray: string[], setCityArray: React.Dispatch<React.SetStateAction<string[]>> }) {
  return (
    <div className="item">
      <p>{name}</p>
      <ul className={styles.container}>
        {cityData.map(item => {
          return (
            <li key={item.hour} className={styles.item}><SpecificHourWeather item={item} /></li>
          )
        })}
      </ul>
      <span><button title='Delete city' className={styles.btnClose} onClick={() => { setCityArray(cityArray.filter(city => city !== name)) }}>X</button></span>
    </div>
  );
}