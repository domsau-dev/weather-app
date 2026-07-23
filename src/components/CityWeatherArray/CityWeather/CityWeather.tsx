import { cityData } from "../../../data/cityData";
import SpecificHourWeather from "./SpecificHourWeather/SpecificHourWeather";
import styles from './CityWeather.module.css';
import { useEffect, useRef, useState, type RefObject } from "react";

export default function CityWeather({ name, index, cityArray, setCityArray, downClickHandler, upClickHandler, divRefs }:
  {
    name: string, index: number, cityArray: string[], setCityArray: React.Dispatch<React.SetStateAction<string[]>>,
    downClickHandler: ((index: number) => void) | undefined, upClickHandler: ((index: number) => void) | undefined,
    divRefs: React.RefObject<Map<string, HTMLDivElement>>
  }) { 

  const ulRef = useRef<HTMLUListElement>(null);
  const [scrollValue, setScrollValue] = useState<number>(0);

  useEffect(() => {
    if (ulRef.current !== null) {
      ulRef.current.scrollLeft = scrollValue;
    }
  }, [cityArray]);

  return (
    <div className="item" ref={el => {
      if (divRefs.current.get(name) === undefined && el) {
        divRefs.current.set(name, el);
      }
      return () => {divRefs.current.delete(name)};
    }}>
      <p>{name}</p>
      <ul className={styles.container} ref={ulRef} onScrollEnd={(e) => setScrollValue(e.currentTarget.scrollLeft)} >
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