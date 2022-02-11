import React, {forwardRef} from 'react';
import styles from './ReviewForm.module.css';
import {ReviewFormProps} from './ReviewForm.props';
import cn from 'classnames';
import {Rating} from '../Rating/Rating';
import {Textarea} from '../Textarea/Textarea';
import {Input} from '../Input/Input';
import {Button} from '../Button/Button';
import CloseItem from './close.svg'
import {useForm, Controller} from 'react-hook-form';
import {IReviewForm} from './ReviewForm.interface';

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
  const {register, control, handleSubmit} = useForm<IReviewForm>()

  const onSubmit = (data: IReviewForm) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className={cn(styles.reviewForm)}>
        <Input {...register('name')} placeholder="Имя" className={styles.input}/>
        <Input {...register('title')} placeholder="Заголовок отзыва" className={cn(styles.title, styles.input)}/>
        <div className={styles.rating}>
          <span>Оценка: </span>
          <Controller
            control={control}
            render={({field}) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}/>)}
            name="rating"/>
        </div>
        <Textarea {...register('description')} placeholder="Текст отзыва" className={styles.description}/>
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
    </form>
  );
};
