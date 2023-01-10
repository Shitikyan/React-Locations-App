import { useEffect, useState } from 'react';
import Filters from '../Filters';
import Header from '../Header';
import { INewLocation } from '../LocationCreateModal/types';
import Locations from '../Locations';
import SearchInput from '../SearchInput';
import { ILocation } from './types';
import environment from '../../environment';
import { locationsMock } from './constants';
import { getItem } from '../../services/localstorage';

import styles from './styles.module.scss';

export default function Home() {
  const [locations, setLocations] = useState<ILocation[]>(locationsMock);
  const [filteredLocations, setFilteredLocations] = useState<ILocation[]>([]);
  const [search, setSearch] = useState<string>('');

  const getRandomString = () => (Math.random() + 1).toString(36).substring(7);

  useEffect(() => {
    const token = getItem('access_token');
    if (!token) {
      const redirectURI = `${environment.BASE_URL}/oAuth/oauthcallback`;
      const authURL = `https://gravity-dev.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=${environment.AWS_CLIENT_ID}&redirect_uri=${redirectURI}`;
      window.location.assign(authURL);
    }
  }, []);

  const fetchMoreLocations = async () => {
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
    setLocations([mockedNewLocation, ...locations]);
  };

  const resetLocation = async () => {
    setSearch('');
    setFilteredLocations([]);
    setLocations(locationsMock);
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
