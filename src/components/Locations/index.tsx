import { FC, useMemo } from 'react';
import { Pagination } from 'antd';
import LocationBox from '../LocationBox';
import { IResources } from '../Home/types';

import styles from './styles.module.scss';

interface IProps {
  page: number;
  allPages: number;
  locations: IResources[];
  setPage: (x: number) => void;
  onSetAppointment: (data: IResources) => void;
}

const Locations: FC<IProps> = ({
  page,
  allPages,
  locations,
  setPage,
  onSetAppointment,
}) => {
  const currentPage = useMemo(() => page + 1, [page]);

  return (
    <div className={styles.locations}>
      {locations?.length ? (
        <>
          {locations.map((item) => (
            <LocationBox
              location={item}
              key={item.id}
              onClick={onSetAppointment}
            />
          ))}
          <Pagination
            className={styles.pagination}
            onChange={(currentPage) => setPage(currentPage - 1)}
            defaultCurrent={currentPage}
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
