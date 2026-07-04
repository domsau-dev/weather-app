import { useState } from 'react';
import type WeatherObject from '../../../../types/WeatherObject';
import styles from './SpecificHourWeather.module.css';

export default function SpecificHourWeather({ item }: { item: WeatherObject }) {
  const [moreIsClicked, setMoreIsClicked] = useState<boolean>(false);
  return (
    <div>
      <p>{item.hour}</p>
      <p>{item.temperature} C</p>
      <p>{item.status}</p>
      {/* {moreIsClicked && <div className='more-details'>
        <p>Humidity: {item.humidity}%</p>
        <p>{item.pressure}Pa</p>
        <p>{item.windSpeed} m/s {item.windDirection}</p>
      </div>} */}

      <div className={`${styles.moreDetails} ${moreIsClicked ? styles.on : styles.off}`}>
        <p>Humidity: {item.humidity}%</p>
        <p>{item.pressure}Pa</p>
        <p>{item.windSpeed} m/s {item.windDirection}</p>
      </div>
      <button className={styles.btn} onClick={() => setMoreIsClicked(!moreIsClicked)}>
        {!moreIsClicked ? `More Details \n ˅` : `Less Details \n ˄`}
      </button>
    </div>
  )
}