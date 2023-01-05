import SearchIcon from '../../images/search-icon.png';
import { SearchInputProps } from './types';

import styles from './styles.module.scss';

export default function SearchInput({ search, setSearch }: SearchInputProps) {
  const onInputChange = (value: string) => {
    setSearch(value);
  };

  return (
    <div className={styles.searchInput}>
      <img src={SearchIcon} className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
}
