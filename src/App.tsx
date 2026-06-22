import Title from './components/Title/Title'
import AddCity from './components/AddCity/AddCity'
import CityWeatherArray from './components/CityWeatherArray/CityWeatherArray'
import { useState } from 'react';

function App() {
  const [cityArray, setCityArray] = useState<string[]>([]);

  return (
    <div className='container'>
      <Title />
      <CityWeatherArray cityArray={cityArray} setCityArray={setCityArray} />
      <AddCity cityArray={cityArray} setCityArray={setCityArray} />
    </div>
  )
}

export default App
