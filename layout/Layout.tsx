import {LayoutProps} from './Layout.props';
import styles from './Layout.module.css';
import cn from 'classnames';
import {Header} from './Header/Header';
import React, {FunctionComponent, useRef, useState, KeyboardEvent} from 'react';
import {Sidebar} from './Sidebar/Sidebar';
import {Footer} from './Footer/Footer';
import {AppContextProvider, IAppContext} from '../context/app.context';
import {Up} from '../components';

const Layout = ({children}: LayoutProps): JSX.Element => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false)

  const bodyRef = useRef<HTMLDivElement>(null)

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault()
      bodyRef.current?.focus()
      setIsSkipLinkDisplayed(false)
    }
    setIsSkipLinkDisplayed(false)
  }

  return (
    <div className={styles.wrapper}>
      <a
        onFocus={() => setIsSkipLinkDisplayed(true)}
        tabIndex={1}
        href="#"
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed
        })}
        onKeyDown={(key: KeyboardEvent<HTMLAnchorElement>) => skipContentAction(key)}
      >Сразу к содержанию</a>
      <Header className={styles.header}/>
      <Sidebar className={styles.sidebar}/>
      <main tabIndex={0} className={styles.body} ref={bodyRef} role="main">
        {children}
      </main>
      <Footer className={styles.footer}/>
      <Up/>
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
