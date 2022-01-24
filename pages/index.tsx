import React from 'react';
import { Htag, Button, Ptag } from '../components';

export default function Home(): JSX.Element {
  return (
      <>
        <Htag tag="h1">Text</Htag>
        <Button appearance="primary" arrow='right'>Узнать подробнее</Button>
        <Button appearance="ghost" arrow='down'>Узнать подробнее</Button>
        <Ptag size='s'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut cupiditate distinctio doloribus eius, eligendi laudantium porro suscipit. Accusantium autem id in incidunt minima, natus nesciunt nulla qui velit voluptatibus.</Ptag>
        <Ptag size='m'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut cupiditate distinctio doloribus eius, eligendi laudantium porro suscipit. Accusantium autem id in incidunt minima, natus nesciunt nulla qui velit voluptatibus.</Ptag>
        <Ptag size='l'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut cupiditate distinctio doloribus eius, eligendi laudantium porro suscipit. Accusantium autem id in incidunt minima, natus nesciunt nulla qui velit voluptatibus.</Ptag>
      </>
  )
}
