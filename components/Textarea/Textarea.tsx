import {TextareaProps} from './Textarea.props';
import styles from './Textarea.module.css';
import cn from 'classnames';

export const Textarea = ({children, className, ...props}: TextareaProps): JSX.Element => {
  return (
    <textarea className={cn(styles.textarea, className)} {...props}/>
  );
};
