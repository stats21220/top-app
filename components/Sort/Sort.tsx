import {KeyboardEvent} from 'react';
import {SortEnum, SortProps} from './Sort.props';
import SortIcon from './Sort.svg'
import styles from './Sort.module.css';
import cn from 'classnames';

export const Sort = ({sort, setSort, className, ...props}: SortProps): JSX.Element => {

  const handleKey = (e: KeyboardEvent, method: SortEnum) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault()
      setSort(method)
    }
  }

  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div id="sort" className="visuallyHidden">Сортировка</div>
      {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
      <button
        id="rating"
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort === SortEnum.Rating
        })}
        aria-selected={sort === SortEnum.Rating}
      >
        <SortIcon className={styles.sortIcon} aria-labelledby="sort + rating"/>По рейтингу
      </button>
      {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
      <button
        id="price"
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort === SortEnum.Price
        })}
        aria-selected={sort === SortEnum.Price}
      >
        <SortIcon className={styles.sortIcon} aria-labelledby="sort + price"/>По цене
      </button>
    </div>
  );
};
