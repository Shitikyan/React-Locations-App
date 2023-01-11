import { FC } from 'react';
import { Pagination } from 'antd';
import LocationBox from '../LocationBox';
import { IResources } from '../Home/types';

import styles from './styles.module.scss';

interface IProps {
  page: number;
  allPages: number;
  locations: IResources[];
  setPage: (x: number) => void;
}

const Locations: FC<IProps> = ({ page, allPages, locations, setPage }) => {
  return (
    <div className={styles.locations}>
      {locations?.length ? (
        <>
          {locations.map((item) => (
            <LocationBox location={item} key={item.id} />
          ))}
          <Pagination
            className={styles.pagination}
            onChange={(currentPage) => setPage(currentPage - 1)}
            defaultCurrent={page + 1}
            total={allPages}
          />
        </>
      ) : (
        <div className={styles.noResult}>No Result</div>
      )}
    </div>
  );
};

export default Locations;
