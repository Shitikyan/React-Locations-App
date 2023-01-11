import moment from 'moment';
import { FC, useMemo } from 'react';
import TimeAgo from 'react-timeago';
import { Tag } from 'antd';
import { IResources } from '../Home/types';
import calendarIcon from '../../images/calendarIcon.png';
import clockIcon from '../../images/clockIcon.png';

import styles from './styles.module.scss';

interface IProps {
  location: IResources;
  onClick: (location: IResources) => void;
}

const LocationBox: FC<IProps> = ({ location, onClick }) => {
  const dateTime = useMemo(() => {
    const date = new Date(location.coverage[0].created);
    const displayDate = date.toLocaleString();
    const day = moment(displayDate).format('ll');
    const time = moment(displayDate).format('LT');
    return {
      day,
      time,
    };
  }, [location]);

  return (
    <div className={styles.locationBox} onClick={() => onClick(location)}>
      <div className={styles.locationInfoTop}>
        <h6
          className={styles.locationUserName}
        >{`${location.patientRead?.resource.firstName} ${location.patientRead?.resource.lastName}`}</h6>
        <Tag color="gold" className={styles.statusText}>
          {location.coverage[0].coverageRead?.resource.status ?
            location.coverage[0].coverageRead?.resource.status :
            'No Status'}
        </Tag>
      </div>
      <h3 className={styles.locationId}>{location.id}</h3>
      <div className={styles.locationInfoBottom}>
        <div className={styles.locationDate}>
          <img src={calendarIcon} />
          <span>{dateTime?.day}</span>
          <img src={clockIcon} />
          <span>{dateTime?.time}</span>
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
