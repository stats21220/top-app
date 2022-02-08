import {ProductProps} from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import {Card} from '../Card/Card';
import {Rating} from '../Rating/Rating';
import {Tag} from '../Tag/Tag';
import {Button} from '../Button/Button';

export const Product = ({product, className, ...props}: ProductProps): JSX.Element => {
  return (
    <Card className={styles.product}>
      <div className={styles.logo}><img src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title}/></div>
      <div className={styles.title}>{product.title}</div>
      <div className={styles.price}>{product.price}</div>
      <div className={styles.credit}>{product.credit}</div>
      <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating}/></div>
      <div className={styles.tags}>{product.categories.map(c => (<Tag key={c} color="ghost">{c}</Tag>))}</div>
      <div className={styles.priceTitle}>Цена</div>
      <div className={styles.creditTitle}>кредит</div>
      <div className={styles.rateTitle}>{product.reviewCount} отзывов</div>
      <div className={styles.hr}>
        <hr/>
      </div>
      <div className={styles.description}>{product.description}</div>
      <div className={styles.feature}>фичи</div>
      <div className={styles.advBlock}>
        <div className={styles.advantages}>
          <div className={styles.title}>Преимущества</div>
          <div>{product.advantages}</div>
        </div>
        <div className={styles.disAdvantages}>
          <div className={styles.title}>Недостатки</div>
          <div>{product.disAdvantages}</div>
        </div>
      </div>
      <div className={styles.hr}>
        <hr/>
      </div>
      <div className={styles.action}>
        <Button appearance="primary">Узнать подробнее</Button>
        <Button appearance="ghost" arrow="right">Читать отзовы</Button>
      </div>
    </Card>
  );
};
