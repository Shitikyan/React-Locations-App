import { FC } from 'react';
import TimeAgo from 'react-timeago';
import { IResources } from '../Home/types';

import styles from './styles.module.scss';
interface IProps {
  location: IResources;
}

const LocationBox: FC<IProps> = ({ location }) => {
  const date = new Date(location.coverage[0].created);
  const displayDate = date.toLocaleString();
  return (
    <div className={styles.locationBox}>
      <div className={styles.locationInfoTop}>
        <h6
          className={styles.locationText}
          // eslint-disable-next-line max-len
        >{`${location.patientRead.resource.firstName} ${location.patientRead.resource.lastName}`}</h6>
        <div className={styles.locationStatus}>
          <h3 className={styles.locationText}>
            {location.coverage[0].coverageRead.resource.status ?
              location.coverage[0].coverageRead.resource.status :
              'No Status'}
          </h3>
        </div>
      </div>
      <h3 className={styles.locationText}>{location.id}</h3>
      <div className={styles.locationInfoBottom}>
        <h4 className={styles.locationText}>{displayDate}</h4>
        <TimeAgo
          date={location.appointmentStart}
          className={styles.locationText}
        />
      </div>
    </div>
  );
};

export default LocationBox;
