import React, { useEffect, useState } from 'react';
import { Htag, Button, Ptag, Tag, Rating } from '../components';

export default function Home(): JSX.Element {
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
        <Htag tag="h1">{ counter }</Htag>
        <Button appearance="primary" arrow="right" onClick={ () => setCounter( x => x + 1 ) }>прибавить</Button>
        <Button
            appearance="ghost"
            arrow="down"
            onClick={ () => setCounter( x => x - 1 ) }>
          убавить
        </Button>
        <Ptag size="s">{ counter }</Ptag>
        <Ptag size="m">{ counter }</Ptag>
        <Ptag size="l">{ counter }</Ptag>
        <Rating rating={ rating }/>
        <Rating isEditable={ true } rating={ rating } setRating={ setRating }/>
      </>
  )
}
