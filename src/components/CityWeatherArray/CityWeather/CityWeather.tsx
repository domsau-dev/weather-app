import { cityData } from "../../../data/cityData";
import SpecificHourWeather from "./SpecificHourWeather/SpecificHourWeather";
import styles from './CityWeather.module.css';
import { useEffect, useRef, useState } from "react";

export default function CityWeather({ name, index, cityArray, setCityArray, downClickHandler, upClickHandler }:
  {
    name: string, index: number, cityArray: string[], setCityArray: React.Dispatch<React.SetStateAction<string[]>>,
    downClickHandler: ((index: number) => void) | undefined, upClickHandler: ((index: number) => void) | undefined
  }) { 

  const thisRef = useRef<HTMLUListElement>(null)
  const [scrollValue, setScrollValue] = useState<number>(0);

  useEffect(() => {
    if (thisRef.current !== null) {
      thisRef.current.scrollLeft = scrollValue;
    }
  }, []);

  return (
    <div className="item">
      <p>{name}</p>
      <ul className={styles.container} ref={thisRef} onScroll={(e) => setScrollValue(e.currentTarget.scrollLeft)}>
        {cityData.map(item => {
          return (
            <li key={item.hour} className={styles.item}><SpecificHourWeather item={item} /></li>
          )
        })}
      </ul>
      <span><button title='Delete city' className={styles.btnClose} onClick={() => { setCityArray(cityArray.filter(city => city !== name)) }}>X</button></span>
      <span>
        <button title="Move city down" className={styles.btnUpDown} disabled={!downClickHandler} onClick={() => downClickHandler!(index)}>˅</button>
        <button title="Move city up" className={styles.btnUpDown} disabled={!upClickHandler} onClick={() => upClickHandler!(index)}>˄</button>
      </span>
    </div>
  );
}