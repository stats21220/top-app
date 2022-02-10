import React from 'react';
import styles from './ReviewForm.module.css';
import {ReviewFormProps} from './ReviewForm.props';
import cn from 'classnames';
import {Rating} from '../Rating/Rating';
import {Textarea} from '../Textarea/Textarea';
import {Input} from '../Input/Input';
import {Button} from '../Button/Button';
import CloseItem from './close.svg'

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
  return (
    <>
      <div className={cn(styles.reviewForm)} {...props}>
        <Input placeholder="Имя" className={styles.input}/>
        <Input placeholder="Заголовок отзыва" className={cn(styles.title, styles.input)}/>
        <div className={styles.rating}>
          <span>Оценка: </span>
          <Rating rating={0}/>
        </div>
        <Textarea placeholder="Текст отзыва" className={styles.description}/>
        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, ваш отзыв будет опубликован после проверки</div>
        <CloseItem className={styles.close}/>
      </div>
    </>
  );
};
