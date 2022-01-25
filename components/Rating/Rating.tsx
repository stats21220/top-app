import React, { useEffect, useState, KeyboardEvent } from 'react';
import { RatingProps } from './Rating.props';
import styles from './Rating.module.css'
import StarIcon from './Star.svg'
import cn from 'classnames';

export const Rating = ( {
                          isEditable = false,
                          rating,
                          setRating = ( f: number ) => f,
                          className,
                          ...props
                        }: RatingProps ) => {
  const [ ratingArray, setRatingArray ] = useState<JSX.Element[]>( new Array( 5 ).fill( <></> ) )

  useEffect( () => {
    constructRating( rating )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ rating ] );


  const constructRating = ( currentRating: number ): void => {
    const updateArray = ratingArray.map( ( r: JSX.Element, i: number ) => {
      return (
          <span
              className={ cn( styles.star, {
                [styles.filled]: i < currentRating,
                [styles.editable]: isEditable
              } ) }
              key={ i }
              onMouseEnter={ () => changeDisplay( i + 1 ) }
              onMouseLeave={ () => changeDisplay( rating ) }
              onClick={ () => onClick( i + 1 ) }
          >
              <StarIcon
                tabIndex={ isEditable ? 0 : -1 }
                onKeyDown={ ( e: KeyboardEvent<SVGElement> ) => isEditable && handleSpace( e, i + 1 ) }
              />
          </span>
      )
    } )
    setRatingArray( updateArray )
  }

  const changeDisplay = ( i: number ) => {
    if ( !isEditable ) {
      return
    }
    constructRating( i )
  }

  const onClick = ( i: number ) => {
    if ( !isEditable || !setRating ) {
      return
    }
    setRating( i )
  }

  const handleSpace = ( e: KeyboardEvent<SVGElement>, i: number ) => {
    if ( e.code !== 'Space' || !setRating ) {
      return
    }
    setRating( i )
  }

  return (
      <div { ...props }>
        { ratingArray.map( ( r: JSX.Element, i: number ) => (
            <span key={ i }>{ r }</span>) ) }
      </div>
  )
}
