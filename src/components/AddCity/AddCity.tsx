import { useState } from 'react';
import styles from './AddCity.module.css';

export default function AddCity() {
  const [clickedToAdd, setClickedToAdd] = useState<boolean>(false);
  return (
    <div className="item">
      <button className={styles.btn}>Add city</button>
    </div>
  )
}