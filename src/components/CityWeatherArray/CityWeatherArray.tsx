import { useRef } from "react";
import CityWeather from "./CityWeather/CityWeather";
const defaultArray: string[] = ['City 1'];

export default function CityWeatherArray({ cityArray, setCityArray }: { cityArray: string[], setCityArray: React.Dispatch<React.SetStateAction<string[]>> }) {

  let divRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const downClickHandler = (index: number) => {
    console.log(divRefs.current);
    divRefs.current.get(cityArray[index])!.classList.remove('transition-zero');
    divRefs.current.get(cityArray[index + 1])!.classList.remove('transition-zero');
    divRefs.current.get(cityArray[index])!.style.transform = `translate(0px, ${divRefs.current.get(cityArray[index + 1])!.getBoundingClientRect().height + 20}px)`;
    divRefs.current.get(cityArray[index + 1])!.style.transform = `translate(0px, -${divRefs.current.get(cityArray[index])!.getBoundingClientRect().height + 20}px)`;
    setTimeout(() => {
      divRefs.current.get(cityArray[index])!.classList.add('transition-zero');
      divRefs.current.get(cityArray[index + 1])!.classList.add('transition-zero');
      divRefs.current.get(cityArray[index])!.style.transform = 'translate(0)';
      divRefs.current.get(cityArray[index + 1])!.style.transform = 'translate(0)';
      const temp = cityArray[index];
      const newArray = [...cityArray];
      newArray[index] = cityArray[index + 1];
      newArray[index + 1] = temp;
      setCityArray([...newArray]);
    }, 500);
  }

  const upClickHandler = (index: number) => {
    console.log(divRefs)
    divRefs.current.get(cityArray[index])!.classList.remove('transition-zero');
    divRefs.current.get(cityArray[index - 1])!.classList.remove('transition-zero');
    divRefs.current.get(cityArray[index])!.style.transform = `translate(0px, -${divRefs.current.get(cityArray[index - 1])!.getBoundingClientRect().height + 20}px)`;
    divRefs.current.get(cityArray[index - 1])!.style.transform = `translate(0px, ${divRefs.current.get(cityArray[index])!.getBoundingClientRect().height + 20}px)`;
    setTimeout(() => {
      divRefs.current.get(cityArray[index])!.classList.add('transition-zero');
      divRefs.current.get(cityArray[index - 1])!.classList.add('transition-zero');
      divRefs.current.get(cityArray[index])!.style.transform = 'translate(0)';
      divRefs.current.get(cityArray[index - 1])!.style.transform = 'translate(0)';
      const temp = cityArray[index];
      const newArray = [...cityArray];
      newArray[index] = cityArray[index - 1];
      newArray[index - 1] = temp;
      setCityArray([...newArray]);
    }, 500)
  }

  if (cityArray.length === 0) {
    setCityArray(defaultArray);
  }

  return (cityArray.map((city, index) => <CityWeather name={city} key={city} index={index} cityArray={cityArray} setCityArray={setCityArray}
    downClickHandler={index === (cityArray.length - 1) ? undefined : downClickHandler}
    upClickHandler={index === 0 ? undefined : upClickHandler}
    divRefs={divRefs} />));
}