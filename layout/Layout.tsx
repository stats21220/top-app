import React, { FunctionComponent } from 'react';
import { LayoutProps } from './Layout.props';
import { Footer } from './Footer/Footer';
import { Sidebar } from './Sidebar/Sidebar';
import { Header } from './Header/Header';
import styles from './Layout.module.css'

const Layout = ( { children }: LayoutProps ): JSX.Element => {
  return (
      <>
        <Header/>
        <div>
          <Sidebar/>
          <div>
            { children }
          </div>
        </div>
        <Footer/>
      </>
  )
}

//HOC
export const withLayout = <T extends Record<string, unknown>>( Component: FunctionComponent<T> ) => {
  return function withLayoutComponent( props: T ): JSX.Element {
    return (
        <Layout>
          <Component { ...props }/>
        </Layout>
    )
  }
}
