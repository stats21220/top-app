import React from 'react';
import styles from './Advantages.module.css';
import {AdvantagesProps} from './Advantages.props';
import ChekIcon from './chek.svg'


export const Advantages = ({advantages}: AdvantagesProps): JSX.Element => {
  return (
    <>
      {advantages.map(a => (
        <div key={a._id} className={styles.advantage}>
          <ChekIcon/>
          <div className={styles.title}>{a.title}</div>
          <hr className={styles.vLine}/>
          <div className={styles.description}>{a.description}</div>
        </div>
      ))}
    </>
  );
};
