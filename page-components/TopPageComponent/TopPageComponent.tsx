import {TopPageComponentProps} from './TopPageComponent.props';
import {Advantages, HhData, Htag, Product, Sort, Tag} from '../../components';
import styles from './TopPageComponent.module.css'
import {TopLevelCategory} from '../../interfaces/page.interface';
import {SortEnum} from '../../components/Sort/Sort.props';
import {useEffect, useReducer} from 'react';
import {sortReducer} from './sort.reducer';
import {useScrollY} from '../../hooks/useScrollY';

export const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps): JSX.Element => {
  const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {products, sort: SortEnum.Rating})

  const y = useScrollY()

  const setSort = (sort: SortEnum) => {
    dispatchSort({type: sort})
  }

  useEffect(() => {
    dispatchSort({type: 'reset', initialState: products})
  }, [products]);


  return (
    <div>
      <div className={styles.title}>
        <Htag tag="h1">{page.title || ''}</Htag>
        {products && <Tag size="m" color="grey" aria-label={products.length + ' курсов'}>{products.length}</Tag>}
        <Sort sort={sort} setSort={setSort}/>
      </div>
      <div role="list">
        {sortedProducts && sortedProducts.map(p => (<Product role="listitem" layout key={p._id} product={p}/>))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        {products && <Tag size="m" color="red">hh.ru</Tag>}
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh}/>}
      {page.advantages && page.advantages.length > 0 && <>
		  <Htag tag="h2">Преимущества</Htag>
		  <Advantages advantages={page.advantages}/>
	  </>}
      {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}}/>}
      <Htag tag="h2">Получаемые навыки</Htag>
      {page.tags && page.tags.map(t => (<Tag size="s" color="primary" key={t} className={styles.tag}>{t}</Tag>))}
    </div>
  );
};
