import React, {KeyboardEventHandler, useState} from 'react';
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
import axios from 'axios';
import {API} from '../../helpers/api';

export const ReviewForm = ({isOpened, productId, className, ...props}: ReviewFormProps): JSX.Element => {
  const {register, control, handleSubmit, formState: {errors}, reset, clearErrors} = useForm<IReviewForm>()
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async(dataForm: IReviewForm) => {
    try {
      const {data} = await axios.post<IReviewSentResponse>(API.review.createDemo, {...dataForm, productId})
      if (data.message) {
        reset()
        setIsSuccess(true)
      } else {
        setError('Что-то пошло не так')
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.message)
      }
    }
  }

  const handleKey = (e: KeyboardEventHandler<HTMLButtonElement>) => {
    if (!error && !isSuccess) {
      return
    }
    if (e.name === 'Space' || e.name === 'Enter' && error) {
      setError(undefined)
    }
    if (e.name === 'Space' || e.name === 'Enter' && isSuccess) {
      setIsSuccess(false)
    }
  }

  // @ts-ignore
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
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.name}
        />
        <Input
          error={errors.title}
          {...register('title', {
            required: {
              value: true,
              message: 'заполните заголовок'
            }
          })}
          placeholder="Заголовок отзыва"
          className={cn(styles.title, styles.input)}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.title}
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
                tabIndex={isOpened ? 0 : -1}
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
          tabIndex={isOpened ? 0 : -1}
          aria-label={'текст отзыва'}
          aria-invalid={!!errors.description}
        />
        <div className={styles.submit}>
          <Button
            appearance="primary"
            tabIndex={isOpened ? 0 : -1}
            onClick={() => clearErrors()}
          >
            Отправить
          </Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && <div className={cn(styles.success, styles.panel)}>
		  <div className={styles.successTitle} role={'alert'}>Ваш отзыв отправлен</div>
		  <div>Спасибо, ваш отзыв будет опубликован после проверки</div>
		  <button
			  onClick={() => setIsSuccess(false)}
			  onKeyDown={handleKey}
			  aria-label="закрыть оповещение"
			  className={styles.close}
		  >
			  <CloseItem/>
		  </button>
	  </div>}
      {error && <div role={'alert'} className={cn(styles.error, styles.panel)}>
		  Что-то пошло не так, попробуйте обновить страницу
		  <button
			  onClick={() => setError(undefined)}
			  className={styles.close}
			  onKeyDown={handleKey}
			  aria-label="закрыть оповещение"
			  tabIndex={error ? 0 : -1}
		  >
			  <CloseItem/>
		  </button>
	  </div>}
    </form>
  );
};
