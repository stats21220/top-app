import {SearchProps} from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import {Input} from '../Input/Input';
import {Button} from '../Button/Button';
import {useState} from 'react';
import MagnifierIcon from './magnifier.svg'
import {useRouter} from 'next/router';

export const Search = ({className, ...props}: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('')
  const router = useRouter()

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search
      }
    })
  }

  const handleKeyDown = (e: string): void => {
    if (e === 'Enter') {
      goToSearch()
    }
  }

  return (
    <div className={cn(styles.search, className)} {...props}>
      <Input
        placeholder="Поиск..."
        className={styles.input}
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e.key)}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={goToSearch}
      >
        <MagnifierIcon className={styles.icon}/>
      </Button>
    </div>
  );
};
