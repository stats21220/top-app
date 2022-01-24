import React from 'react';
import { Htag, Button, Ptag, Tag } from '../components';

export default function Home(): JSX.Element {
  return (
      <>
        <Htag tag="h1">Text</Htag>
        <Button appearance="primary" arrow='right'>Узнать подробнее</Button>
        <Button appearance="ghost" arrow='down'>Узнать подробнее</Button>
        <Ptag size='s'>Small</Ptag>
        <Ptag size='m'>Medium</Ptag>
        <Ptag size='l'>Long</Ptag>
        <Tag size='m' color='ghost'>ghost</Tag>
        <Tag size='s' color='ghost'>ghost</Tag>
        <Tag size='m' color='ghost'>ghost</Tag>
        <Tag size='s' color='red'>red</Tag>
        <Tag size='s' color='primary'>primary</Tag>
        <Tag size='s' color='green'>green</Tag>
        <Tag size='s' color='gray'>gray</Tag>
        <Tag size='m' color='green'>green</Tag>
        <Tag size='s' color='primary'>primary</Tag>
      </>
  )
}
