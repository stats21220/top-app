import React, {useState} from 'react';
import styles from './ReviewForm.module.css';
import {ReviewFormProps} from './ReviewForm.props';
import cn from 'classnames';
import {Rating} from '../Rating/Rating';
import {Textarea} from '../Textarea/Textarea';
import {Input} from '../Input/Input';
import {Button} from '../Button/Button';
import CloseItem from './close.svg'
import {useForm, Controller} from 'react-hook-form';
import {IReviewForm, IReviewSentResponse} from './ReviewForm.interface';
import axios, {AxiosError} from 'axios';
import {API} from '../../helpers/api';

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
  const {register, control, handleSubmit, formState: {errors}, reset} = useForm<IReviewForm>()
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async(dataForm: IReviewForm) => {
    try {
      const {data} = await axios.post<IReviewSentResponse>(API.review.createDemo, {...dataForm, productId})
      if (data.message) {
        setIsSuccess(true)
        reset()
      } else {
        setError('Что-то пошло не так')
      }
    } catch (e: AxiosError) {
      if (axios.isAxiosError(e)) {
        setError(e.message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className={cn(styles.reviewForm)}>
        <Input
          error={errors.name}
          {...register('name', {
            required: {
              value: true,
              message: 'Заполните имя'
            },
          })}
          placeholder="Имя"
          className={styles.input}
        />
        <Input
          error={errors.title}
          {...register('title', {
            required: {
              value: true,
              message: 'заполните заголовок'
            }
          })}
          placeholder="Заголовок отзыва" className={cn(styles.title, styles.input)}
        />
        <div className={styles.rating}>
          <span>Оценка: </span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: {
                value: true,
                message: 'вы забыли поставить оценку'
              }
            }}
            render={({field}) => (
              <Rating
                error={errors.rating}
                isEditable
                rating={Number(field.value)}
                ref={field.ref}
                setRating={field.onChange}
              />)}
          />
        </div>
        <Textarea
          error={errors.description}
          {...register('description',
            {
              required: {
                value: true,
                message: 'оставьте отзыв'
              }
            })}
          placeholder="Текст отзыва"
          className={styles.description}
        />
        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && <div className={cn(styles.success, styles.panel)}>
		  <div className={styles.successTitle}>Ваш отзыв отправлен</div>
		  <div>Спасибо, ваш отзыв будет опубликован после проверки</div>
		  <CloseItem className={styles.close} onClick={() => setIsSuccess(false)}/>
	  </div>}
      {error && <div className={cn(styles.error, styles.panel)}>
		  Что-то пошло не так, попробуйте обновить страницу
		  <CloseItem className={styles.close} onCliclk={() => setError(undefined)}/>
	  </div>}
    </form>
  );
};
