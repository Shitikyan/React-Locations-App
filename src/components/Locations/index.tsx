import { FC } from 'react';
import LocationBox from '../LocationBox';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IResources } from '../Home/types';

import styles from './styles.module.scss';

interface IProps {
  locations: IResources[];
  fetchMoreLocations: () => void;
}

const Locations: FC<IProps> = ({ locations, fetchMoreLocations }) => {
  return (
    <div className={styles.locations}>
      {locations.length ? (
        <InfiniteScroll
          dataLength={locations.length}
          next={fetchMoreLocations}
          // eslint-disable-next-line max-len
          hasMore={true} // hardcoded, will be changed after proper api integration
          loader={<h4>Loading...</h4>}
          scrollThreshold={1}
          className={styles.locations}
        >
          {locations.map((item) => (
            <LocationBox location={item} key={item.id} />
          ))}
        </InfiniteScroll>
      ) : (
        <div className={styles.noResult}>No Result</div>
      )}
    </div>
  );
};

export default Locations;
