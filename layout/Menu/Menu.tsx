import styles from './Menu.module.css';
import cn from 'classnames';
import {useContext, KeyboardEvent, useState} from 'react';
import {AppContext} from '../../context/app.context';
import {FirstLevelMenuItem, PageItem} from '../../interfaces/menu.interface';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {firstLevelMenu} from '../../helpers/helpers';
import {motion} from 'framer-motion'

export const Menu = (): JSX.Element => {
  const {menu, setMenu, firstCategory} = useContext(AppContext);
  const router = useRouter();
  const [announce, setAnnounce] = useState<'close' | 'opened' | undefined>(undefined)

  const variants = {
    visible: {
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
      marginBottom: 20
    },
    hidden: {marginBottom: 0}
  }

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 'auto',
      minHeight: 29
    },
    hidden: {opacity: 0, height: 0}
  }

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map(m => {
      if (m._id.secondCategory == secondCategory) {
        m.isOpened ? setAnnounce('close') : setAnnounce('opened')
        m.isOpened = !m.isOpened;
      }
      return m;
    }));
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault()
      openSecondLevel(secondCategory)
    }
  }

  const buildFirstLevel = () => {
    return (
      <ul className={styles.firstLevelList}>
        {firstLevelMenu.map(m => (
          <li key={m.route} aria-expanded={m.id == firstCategory} role="listitem">
            <Link href={`/${m.route}`}>
              <a>
                <div className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: m.id == firstCategory
                })}>
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
            </Link>
            {m.id == firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map(m => {
          if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
            m.isOpened = true;
          }
          return (
            <li key={m._id.secondCategory}>
              <button
                onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
                aria-expanded={m.isOpened}>{m._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={m.isOpened ? 'visible' : 'hidden'}
                animate={m.isOpened ? 'visible' : 'hidden'}
                className={cn(styles.secondLevelBlock)}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean = false) => {
    return (
      pages.map(p => (
        <motion.li
          variants={variantsChildren}
          key={p._id}
        >
          <Link href={`/${route}/${p.alias}`}>
            <a
              tabIndex={isOpened ? 0 : -1}
              aria-current={`/${route}/${p.alias}` == router.asPath ? 'page' : false}
              className={cn(styles.thirdLevel, {
                [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
              })}>
              {p.category}
            </a>
          </Link>
        </motion.li>
      ))
    );
  };

  return (
    <nav className={styles.menu} role="navigation">
      {announce &&
		  <span className="visuallyHidden" role="log">{announce === 'opened' ? 'развернуто' : 'свернуто'}</span>
      }
      {buildFirstLevel()}
    </nav>
  );
};
