import { FC } from 'react';
import { ILocation } from '../Home/types';
import TimeAgo from 'react-timeago';

import styles from './styles.module.scss';
interface IProps {
  location: ILocation;
}

const LocationBox: FC<IProps> = ({ location }) => {
  return (
    <div className={styles.locationBox}>
      <div className={styles.locationInfoTop}>
        <h6 className={styles.locationText}>{location.name}</h6>
        <div className={styles.locationStatus}>
          <h3 className={styles.locationText}>{location.status}</h3>
        </div>
      </div>
      <h3 className={styles.locationText}>{location.address}</h3>
      <div className={styles.locationInfoBottom}>
        <h4 className={styles.locationText}>Dec-30 02:15 PM </h4>
        <TimeAgo date={location.updatedAt} className={styles.locationText} />
      </div>
    </div>
  );
};

export default LocationBox;
