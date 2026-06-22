import { useState } from 'react';
import styles from './AddCity.module.css';
import places from '../../data/places.json';
import type CityObject from '../../types/CityObject';

const listOfCities: string[] = [...new Set(places.map(place => place.name))];

const mapOfLetters: Map<string, string[]> = new Map([['a', ['ą']],
['c', ['č']],
['e', ['ę', 'ė']],
['i', ['į', 'y']],
['s', ['š']],
['u', ['ų', 'ū']],
['z', ['ž']]]);

const changeLetters = (text: string, letterMap: Map<string, string[]>): string => {
  let newText: string = '';

  for (let i = 0; i < text.length; i++) {
    for (const letter of letterMap) {
      if (letter[1].includes(text[i])) {
        newText += letter[0];
        break;
      }
    }
    if (!newText[i]) {
      newText += text[i];
    }  
  }

  return newText;
}

const cityFilter = (searchValue: string): CityObject[] => {
  const filteredCities: CityObject[] = [];
  searchValue = searchValue.trim().toLowerCase();
  while (searchValue.includes('  ')) {
    searchValue = searchValue.replace('  ', ' ');
  }

  if (searchValue.length > 2) {
    listOfCities.map(city => {
      const lowerCaseCity = city.toLowerCase();
      if (lowerCaseCity.includes(searchValue)) {
        filteredCities.push({ city: city, startIndex: lowerCaseCity.indexOf(searchValue), endIndex: lowerCaseCity.indexOf(searchValue) + searchValue.length - 1});
      }
    });

    const inaccurateSearchValue = changeLetters(searchValue, mapOfLetters);
    console.log(inaccurateSearchValue);

    listOfCities.map(city => {
      const inaccurateCity = changeLetters(city, mapOfLetters).toLowerCase();
      if (inaccurateCity.includes(inaccurateSearchValue)) {
        filteredCities.push({ city: city, startIndex: inaccurateCity.indexOf(inaccurateSearchValue), endIndex: inaccurateCity.indexOf(searchValue) + searchValue.length - 1});
      }
    });

    const noGapSearchValue = searchValue.replaceAll(' ', '');
    const inaccurateNoGapSearchValue = changeLetters(noGapSearchValue, mapOfLetters);

    listOfCities.map(city => {
      const lowerCaseCity = city.toLowerCase();
      if (lowerCaseCity.includes(noGapSearchValue)) {
        filteredCities.push({ city: city, startIndex: lowerCaseCity.indexOf(noGapSearchValue), endIndex: lowerCaseCity.indexOf(noGapSearchValue) + noGapSearchValue.length - 1});
      }
    });

    listOfCities.map(city => {
      const inaccurateCity = changeLetters(city, mapOfLetters).toLowerCase();
      if (inaccurateCity.includes(inaccurateNoGapSearchValue)) {
        filteredCities.push({ city: city, startIndex: inaccurateCity.indexOf(inaccurateNoGapSearchValue), endIndex: inaccurateCity.indexOf(inaccurateNoGapSearchValue) + inaccurateNoGapSearchValue.length - 1 });
      }
    });
  }

  return filteredCities.filter((cityObj, index, arr) => {
    return index === arr.findIndex(item => item.city === cityObj.city);
  });
}

export default function AddCity({ cityArray, setCityArray }: { cityArray: string[], setCityArray: React.Dispatch<React.SetStateAction<string[]>> }) {
  const [addIsClicked, setAddIsClicked] = useState<boolean>(false);
  const [searchedCity, setSearchedCity] = useState<string>('');

  const clickHandler = (city: string) => {
    setCityArray([...cityArray, city]);
    setAddIsClicked(false);
    setSearchedCity('');
  }

  return (
    <div className="item">
      {!addIsClicked ?
        <button className={styles.btn} onClick={() => setAddIsClicked(true)}>Add city</button> :
        <>
          <label htmlFor="city">Enter city:</label>
          <input type="text" name="city" id="city" value={searchedCity} onChange={(e) => setSearchedCity(e.target.value)} />
          <span><button title='Abort search' className={styles.btnClose} onClick={() => { setAddIsClicked(false); setSearchedCity('') }}>X</button></span>
          {searchedCity.length > 2 &&
            <ul className={styles.container}>
              {cityFilter(searchedCity).map(({ city, startIndex, endIndex }) => {
                let boldedCity = <></>;

                if (startIndex === 0) {
                  boldedCity = <><b>{city.slice(0, endIndex + 1)}</b>{city.slice(endIndex + 1)}</>;
                } else if (endIndex === city.length - 1) {
                  boldedCity = <>{city.slice(0, startIndex)}<b>{city.slice(startIndex)}</b></>;
                } else {
                  boldedCity = <>{city.slice(0, startIndex)}<b>{city.slice(startIndex, endIndex + 1)}</b>{city.slice(endIndex + 1)}</>;
                }

                return <li key={city} className={styles.item} onClick={() => clickHandler(city)}>{boldedCity}</li>
              })}
            </ul>
          }
        </>
      }
    </div>
  )
}