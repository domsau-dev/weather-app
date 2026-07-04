import { useState } from "react";
import CityWeather from "./CityWeather/CityWeather";
const defaultArray: string[] = ['City 1'];

export default function CityWeatherArray({ cityArray, setCityArray }: { cityArray: string[], setCityArray: React.Dispatch<React.SetStateAction<string[]>> }) {
  const [scrollValueArray, setScrollValueArray] = useState<number[]>([]);

  const downClickHandler = (index: number) => {
    const temp = cityArray[index];
    const newArray = [...cityArray];
    newArray[index] = cityArray[index + 1];
    newArray[index + 1] = temp;
    setCityArray([...newArray]);
  }

  const upClickHandler = (index: number) => {
    const temp = cityArray[index];
    const newArray = [...cityArray];
    newArray[index] = cityArray[index - 1];
    newArray[index - 1] = temp;
    setCityArray([...newArray]);
  }

  if (cityArray.length === 0) {
    setCityArray(defaultArray);
  }

  return (cityArray.map((city, index) => <CityWeather name={city} key={city} index={index} cityArray={cityArray} setCityArray={setCityArray}
    downClickHandler={index === (cityArray.length - 1) ? undefined : downClickHandler}
    upClickHandler={index === 0 ? undefined : upClickHandler} />));
}