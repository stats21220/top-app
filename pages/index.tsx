import React, { useEffect, useState } from 'react';
import { Htag, Button, Ptag, Tag, Rating } from '../components';
import { withLayout } from '../layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

function Home( { menu }: HomeProps ): JSX.Element {
  const [ counter, setCounter ] = useState<number>( 666 )
  const [ rating, setRating ] = useState<number>( 4 )
  useEffect( () => {
    console.log( 'Counter ' + counter )
    return function cleanup() {
      console.log( 'Unmount' )
    }
  } );

  return (
      <>
        <ul>
          { menu.map( m => (<li key={ m._id.secondCategory }>{ m._id.secondCategory }</li>) ) }
        </ul>
      </>
  )
}

export default withLayout( Home )

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>( process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  } )
  return {
    props: {
      menu,
      firstCategory
    }
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: number
}
