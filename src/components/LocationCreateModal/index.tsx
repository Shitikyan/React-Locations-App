import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { INewLocation, LocationModalProps } from './types';

import styles from './styles.module.scss';

export default function LocationCreateModal({
  onClose,
  open,
  addNewLocation,
}: LocationModalProps) {
  const [newLocation, setNewLocation] = useState<INewLocation>({
    name: '',
    address: '',
    status: 'active',
  });
  const [error, setError] = useState<string>('');
  const handleAddLocation = () => {
    if (!newLocation.name || !newLocation.address) {
      setError('Fill all the required fields');
      return;
    }
    addNewLocation(newLocation);
    setNewLocation({
      name: '',
      address: '',
      status: 'active',
    });
    onClose();
  };

  return (
    <>
      {open && (
        <div className={styles.modalBackground}>
          <ClickAwayListener onClickAway={onClose}>
            <div className={styles.modal}>
              <h2>Create the Location</h2>
              {error && <span style={{ color: 'red' }}>{error}</span>}
              <div className={styles.inputContainer}>
                <label>
                  Name
                  <input
                    type="text"
                    value={newLocation.name}
                    onChange={(e) =>
                      setNewLocation({ ...newLocation, name: e.target.value })
                    }
                  />
                </label>
                <label>
                  Address
                  <input
                    type="text"
                    value={newLocation.address}
                    onChange={(e) =>
                      setNewLocation({
                        ...newLocation,
                        address: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Status
                  <select
                    name="status"
                    value={newLocation.status}
                    onChange={(e) =>
                      setNewLocation({ ...newLocation, status: e.target.value })
                    }
                  >
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
                </label>
              </div>
              <button
                className={styles.addLocation}
                onClick={handleAddLocation}
              >
                Add Location
              </button>
            </div>
          </ClickAwayListener>
        </div>
      )}
    </>
  );
}
