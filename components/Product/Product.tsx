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
import {ForwardedRef, forwardRef, useRef, useState} from 'react';
import {Review} from '../Review/Review';
import {ReviewForm} from '../ReviewForm/ReviewForm';
import {motion} from 'framer-motion';

export const Product = motion(
  // eslint-disable-next-line react/display-name
  forwardRef(
    ({product, className, ...props}: ProductProps,
     ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)
      const reviewRef = useRef<HTMLDivElement>(null)

      const variants = {
        visible: {display: 'block', opacity: 1, height: 'auto'},
        hidden: {display: 'none', opacity: 0, height: 0}
      }

      const scrollToReview = () => {
        setIsReviewOpened(true)
        reviewRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        reviewRef.current?.focus()
      }

      return (
        <div className={className} {...props} ref={ref}>
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
              <span className="visuallyHidden">цена</span>
              {priceRu(product.price)}
              {product.oldPrice &&
				  <Tag color="green" className={styles.oldPrice}>
					  <span className="visuallyHidden">скидка</span>
                    {priceRu(product.price - product.oldPrice)}
				  </Tag>}
            </div>
            <div className={styles.credit}>
              <span className="visuallyHidden">кредит</span>
              {priceRu(product.credit)}/<span className={styles.month}>мес</span>
            </div>
            <div className={styles.rating}>
              <span className="visuallyHidden">{'рейтинг ' + (product.reviewAvg ?? product.initialRating)}
              </span>
              <Rating rating={product.reviewAvg ?? product.initialRating}/>
            </div>
            <div className={styles.tags}>
              {product.categories.map(c => (<Tag key={c} color="ghost" className={styles.category}>{c}</Tag>))}
            </div>
            <div className={styles.priceTitle} aria-hidden={true}>Цена</div>
            <div className={styles.creditTitle} aria-hidden={true}>кредит</div>
            <div
              className={styles.rateTitle}>
              <a href="#ref"
                 onClick={() => scrollToReview()}>
                {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
              </a>
            </div>
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
                aria-expanded={isReviewOpened}
              >Читать отзовы</Button>
            </div>
          </Card>
          <motion.div
            animate={isReviewOpened ? 'visible' : 'hidden'}
            variants={variants}
            initial="hidden"
          >
            <Card
              color="blue"
              ref={reviewRef}
              className={cn(styles.reviews)}
              tabIndex={isReviewOpened ? 0 : -1}
            >
              {product.reviews.map(r =>
                <div key={r._id}>
                  <Review review={r}/>
                  <Divider/>
                </div>
              )}
              {<ReviewForm productId={product._id} isOpened={isReviewOpened}/>}
            </Card>
          </motion.div>
        </div>
      );
    }));

Product.displayName = 'Product'
