import React from 'react';

import styles from './CheckBox.module.css';

type Props = {
  items: string[];
};

function CheckBox(props: Props) {
  return (
    <ul className={styles.checkBoxList}>
      {props.items.map(item => (
        <li key={item} className={styles.checkBoxRow}>
          <input id="test" type="checkbox" checked={false} />
          <label>{item}</label>
        </li>
      ))}
    </ul>
  );
}

export default CheckBox;
