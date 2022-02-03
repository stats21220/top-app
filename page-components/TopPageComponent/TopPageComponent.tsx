import {TopPageComponentProps} from './TopPageComponent.props';

export const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps): JSX.Element => {
  return (
    <ul>
      {products && products.length}
      {products && products.map(p => <li>{p.categories}</li>)}
    </ul>
  );
};
