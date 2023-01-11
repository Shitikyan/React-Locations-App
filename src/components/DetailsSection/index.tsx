import { Tag } from 'antd';
import RefreshIcon from '../../images/refresh-icon.png';
import maximizeIcon from '../../images/maximizeIcon.png';
import moreIcon from '../../images/moreIcon.png';
import Button from '../Button';

import styles from './styles.module.scss';
import { ICoverage } from '../Home/types';

interface IProps {
  detailsData: ICoverage[] | undefined;
}

export default function DetailsSection({ detailsData }: IProps) {
  detailsData;
  return (
    <div className={styles.homeRightSection}>
      <div className={styles.rightSectionHeader}>
        <Button icon={RefreshIcon} />
        <div className={styles.headerRightSection}>
          <Button icon={maximizeIcon} />
          <Button icon={moreIcon} />
        </div>
      </div>
      <div className={styles.rightSectionContent}>
        {detailsData?.map((item, index) => {
          return (
            <div
              className={styles.locationItem}
              key={item.coverageRead?.resource?.id + index}
            >
              <div>
                <h4>{item.coverageRead?.resource?.id}</h4>
                <h6>{item.coverageRead?.resource?.groupNumber}</h6>
              </div>
              <Tag color="magenta">
                {item.coverageRead?.resource?.status || 'not initiated'}
              </Tag>
            </div>
          );
        })}
      </div>
    </div>
  );
}
