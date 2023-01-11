import moment from 'moment';
import { FC } from 'react';
import TimeAgo from 'react-timeago';
import { IResources } from '../Home/types';
import calendarIcon from '../../images/calendarIcon.png';
import clockIcon from '../../images/clockIcon.png';

import styles from './styles.module.scss';
interface IProps {
  location: IResources;
}

const LocationBox: FC<IProps> = ({ location }) => {
  const date = new Date(location.coverage[0].created);
  const displayDate = date.toLocaleString();
  const onlyDay = moment(displayDate).format('ll');
  const onlyTime = moment(displayDate).format('LT');
  return (
    <div className={styles.locationBox}>
      <div className={styles.locationInfoTop}>
        <h6
          className={styles.locationUserName}
          // eslint-disable-next-line max-len
        >{`${location.patientRead.resource.firstName} ${location.patientRead.resource.lastName}`}</h6>
        <div className={styles.locationStatus}>
          <h3 className={styles.statusText}>
            {location.coverage[0].coverageRead.resource.status ?
              location.coverage[0].coverageRead.resource.status :
              'No Status'}
          </h3>
        </div>
      </div>
      <h3 className={styles.locationId}>{location.id}</h3>
      <div className={styles.locationInfoBottom}>
        <div className={styles.locationDate}>
          <img src={calendarIcon}/>
          <span>{onlyDay}</span>
          <img src={clockIcon} />
          <span>{onlyTime}</span>
        </div>
        <TimeAgo
          date={location.appointmentStart}
          className={styles.locationAgo}
        />
      </div>
    </div>
  );
};

export default LocationBox;
