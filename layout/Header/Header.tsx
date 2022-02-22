import {HeaderProps} from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import Logo from '../logo.svg'
import {ButtonIcon} from '../../components';
import {motion} from 'framer-motion';
import {Sidebar} from '../Sidebar/Sidebar';
import {useState} from 'react';

export const Header = ({className, ...props}: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20
      }
    },
    closed: {
      x: '100%',
      opacity: 0
    }
  }

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Logo alt='logo'/>
      <ButtonIcon appearance="white" icon="menu" onClick={() => setIsOpened(true)}/>
      <motion.div
        variants={variants}
        initial={'closed'}
        animate={isOpened ? 'opened' : 'closed'}
        className={styles.mobileMenu}
      >
        <Sidebar/>
        <ButtonIcon appearance="white" icon="close" className={styles.menuClose}
                    onClick={() => setIsOpened(false)}/>
      </motion.div>
    </header>
  );
};
