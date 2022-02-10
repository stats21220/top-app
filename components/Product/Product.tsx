import {ProductProps} from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import {Card} from '../Card/Card';
import {Rating} from '../Rating/Rating';
import {Tag} from '../Tag/Tag';
import {Button} from '../Button/Button';
import {declOfNum, priceRu} from '../../helpers/helpers';
import {Divider} from '../Divider/Divider';
import Image from 'next/image';
import {useState} from 'react';
import {Review} from '../Review/Review';
import {ReviewForm} from '../ReviewForm/ReviewForm';

export const Product = ({product, className, ...props}: ProductProps): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)
  return (
    <div className={className} {...props}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {priceRu(product.price)}
          {product.oldPrice &&
		  <Tag color="green" className={styles.oldPrice}>{priceRu(product.price - product.oldPrice)}</Tag>}
        </div>
        <div className={styles.credit}>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
          <Rating rating={product.reviewAvg ?? product.initialRating}/>
        </div>
        <div className={styles.tags}>
          {product.categories.map(c => (<Tag key={c} color="ghost" className={styles.category}>{c}</Tag>))}
        </div>
        <div className={styles.priceTitle}>Цена</div>
        <div className={styles.creditTitle}>кредит</div>
        <div
          className={styles.rateTitle}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</div>
        <Divider className={styles.hr}/>
        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map(c => (
            <div key={c.name} className={styles.characteristic}>
              <span className={styles.characteristicName}>{c.name}</span>
              <span className={styles.characteristicDots}/>
              <span className={styles.characteristicValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages &&
		  <div className={styles.advantages}>
			  <div className={styles.titleAdv}>Преимущества</div>
			  <div className={styles.descriptionAdv}>{product.advantages}</div>
		  </div>}
          {product.disAdvantages &&
		  <div className={styles.disAdvantages}>
			  <div className={styles.titleAdv}>Недостатки</div>
			  <div className={styles.descriptionAdv}>{product.disAdvantages}</div>
		  </div>}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)}/>
        <div className={styles.action}>
          <Button appearance="primary">Узнать подробнее</Button>
          <Button
            appearance="ghost"
            arrow={isReviewOpened ? 'down' : 'right'}
            className={styles.reviewButton}
            onClick={() => setIsReviewOpened(!isReviewOpened)}
          >Читать отзовы</Button>
        </div>
      </Card>
      <Card color="blue" className={cn(styles.reviews, {
        [styles.opened]: isReviewOpened,
        [styles.closed]: !isReviewOpened
      })}>
        {product.reviews.map(r =>
          <>
            <Review key={r._id} review={r}/>
            <Divider/>
          </>
        )}
        {<ReviewForm productId={product._id}/>}
      </Card>
    </div>
  );
};
