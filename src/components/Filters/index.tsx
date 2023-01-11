import Button from '../Button';

import styles from './styles.module.scss';

const filters = [
  { name: 'Filter', disabled: false },
  { name: 'Actions', disabled: false },
];

export default function Filters() {
  return (
    <div className={styles.filtersSection}>
      {filters.map((filter) => (
        <Button text={filter.name} key={filter.name} />
      ))}
    </div>
  );
}
