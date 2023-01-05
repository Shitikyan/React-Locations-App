import { useState } from 'react';
import RefreshIcon from '../../images/refresh-icon.png';
import LocationCreateModal from '../LocationCreateModal';
import { INewLocation } from '../LocationCreateModal/types';

import styles from './styles.module.scss';

interface IProps {
  addNewLocation: (location: INewLocation) => void;
  resetLocation: () => void;
}

export default function Header({ addNewLocation, resetLocation }: IProps) {
  const [open, setOpen] = useState<boolean>(false);

  const onCloseModal = () => {
    setOpen(false);
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  return (
    <div className={styles.header}>
      <LocationCreateModal
        open={open}
        onClose={onCloseModal}
        addNewLocation={addNewLocation}
      />
      <button className={styles.refreshButton} onClick={resetLocation}>
        <img src={RefreshIcon} className={styles.refreshIcon} />
      </button>
      <h2 className={styles.title}>Locations</h2>
      <div className={styles.addLocationButton} onClick={onOpenModal}>
        <span>+</span>
      </div>
    </div>
  );
}
