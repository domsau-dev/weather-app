import CityWeather from "./CityWeather/CityWeather";
const defaultArray: string[] = ['City 1'];

export default function CityWeatherArray({ cityArray, setCityArray }: { cityArray: string[], setCityArray: React.Dispatch<React.SetStateAction<string[]>> }) {
  if (cityArray.length === 0) {
    setCityArray([...defaultArray]);
  }

  return (cityArray.map(city => <CityWeather name={city} key={city} cityArray={cityArray} setCityArray={setCityArray}/>));
}