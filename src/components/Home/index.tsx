import { useEffect, useState } from 'react';
import Filters from '../Filters';
import Header from '../Header';
import { INewLocation } from '../LocationCreateModal/types';
import Locations from '../Locations';
import SearchInput from '../SearchInput';
import { ILocation } from './types';
import environment from '../../environment';
import { axiosHandler } from '../../services';
import { locationsMock } from './constants';

import styles from './styles.module.scss';

export default function Home() {
  const [locations, setLocations] = useState<ILocation[]>(locationsMock);
  const [filteredLocations, setFilteredLocations] = useState<ILocation[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const getRandomString = () => (Math.random() + 1).toString(36).substring(7);

  const fetchMoreLocations = async () => {
    if (environment.IS_API_INTEGRATED) {
      const { data } = await axiosHandler(
        'GET',
        `location/?page=${page}&limit=10}`,
      );
      setLocations([...locations, ...data.resources]);
      setPage((pg) => pg++);
      return;
    }
    const newLocations = [];
    for (let i = 0; i < 10; i++) {
      newLocations.push({
        id: getRandomString(),
        tenant: getRandomString(),
        name: getRandomString(),
        status: 'active',
        managingOrganization: getRandomString(),
        alias: getRandomString(),
        description: getRandomString(),
        type: getRandomString(),
        address: getRandomString(),
        npi: getRandomString(),
        taxId: getRandomString(),
        partOf: getRandomString(),
        updatedAt: 1672828826399,
        telecom: [
          {
            rank: 1,
            system: getRandomString(),
            use: getRandomString(),
            value: getRandomString(),
          },
          {
            rank: 2,
            system: getRandomString(),
            use: getRandomString(),
            value: getRandomString(),
          },
        ],
      });
    }
    setLocations([...locations, ...newLocations]);
  };

  const addNewLocation = async (newLocation: INewLocation) => {
    const mockedNewLocation = {
      id: getRandomString(),
      tenant: getRandomString(),
      managingOrganization: getRandomString(),
      alias: getRandomString(),
      description: getRandomString(),
      type: getRandomString(),
      npi: getRandomString(),
      taxId: getRandomString(),
      partOf: getRandomString(),
      updatedAt: Date.now(),
      telecom: [
        {
          rank: 1,
          system: getRandomString(),
          use: getRandomString(),
          value: getRandomString(),
        },
        {
          rank: 2,
          system: getRandomString(),
          use: getRandomString(),
          value: getRandomString(),
        },
      ],
      ...newLocation,
    };
    if (environment.IS_API_INTEGRATED) {
      await axiosHandler('POST', 'location', mockedNewLocation);
    }
    setLocations([mockedNewLocation, ...locations]);
  };

  const resetLocation = async () => {
    setSearch('');
    setFilteredLocations([]);

    if (environment.IS_API_INTEGRATED) {
      const { data } = await axiosHandler('GET', 'location');
      setLocations(data.resources);
    } else {
      setLocations(locationsMock);
    }
  };

  useEffect(() => {
    if (search) {
      setFilteredLocations(
        locations.filter(
          (item) =>
            item.address.includes(search) || item.name?.includes(search),
        ),
      );
    } else {
      setFilteredLocations([]);
    }
  }, [locations, search]);

  useEffect(() => {
    if (environment.IS_API_INTEGRATED) {
      const fetchData = async () => {
        const { data } = await axiosHandler('GET', 'location');
        setLocations(data.resources);
      };
      fetchData();
    }
  }, []);

  return (
    <div className={styles.home}>
      <Header addNewLocation={addNewLocation} resetLocation={resetLocation} />
      <SearchInput search={search} setSearch={setSearch} />
      <Filters />
      <Locations
        locations={search ? filteredLocations : locations}
        fetchMoreLocations={fetchMoreLocations}
      />
    </div>
  );
}
