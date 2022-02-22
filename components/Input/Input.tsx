import {InputProps} from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import {ForwardedRef, forwardRef} from 'react';

export const Input = forwardRef(
  ({
     error,
     className,
     ...props
   }: InputProps,
   ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
      <div className={cn(styles.inputWrapper, className)}>
        <input className={cn(styles.input, {
          [styles.error]: error
        })} ref={ref} {...props}/>
        {error && <span className={styles.errorMessage} role='alert'>{error.message}</span>}
      </div>
    );
  });

Input.displayName = 'Input'
