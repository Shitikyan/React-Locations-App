/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useState } from 'react';
import Filters from '../Filters';
import Header from '../Header';
import Locations from '../Locations';
import SearchInput from '../SearchInput';
import environment from '../../environment';
import { getItem } from '../../services/localstorage';
import { gql, useQuery } from '@apollo/client';
import { IData, IResources } from './types';

import styles from './styles.module.scss';

const GET_TIMELINE = gql`
query Resources(
  $tenant: String!
  $appointmentStatus: AppointmentStatus
  $appointmentStart: String
) {
  priorAuthList(
    tenant: $tenant
    appointmentStatus: $appointmentStatus
    appointmentStart: $appointmentStart
  ) {
    resources {
      id
      coverage {
        coverageRead {
          resource {
            organizationRead {
              resource {
                id
                name
              }
            }
            groupNumber
            payor
            status
            subscriberId
            id
          }
        }
        order
        id
        created
      }
      patientRead {
        resource {
          firstName
          lastName
        }
      }
      appointmentStart
    }
  }
}
`;

export default function Home() {
  const { data, loading, error } = useQuery<IData>(GET_TIMELINE, {
    variables: {
      tenant: '940e8edf-edd9-401d-a21a-10f866fbdb3f',
      appointmentStatus: 'booked',
      appointmentStart: '2023-01-10T09:58:29-05:00',
    },
  });
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const token = getItem('access_token');
    if (!token) {
      const redirectURI = `${environment.BASE_URL}/oAuth/oauthcallback`;
      const authURL = `https://gravity-dev.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=${environment.AWS_CLIENT_ID}&redirect_uri=${redirectURI}`;
      window.location.assign(authURL);
    }
  }, []);

  const fetchMoreLocations = async () => {};

  const addNewLocation = async () => {};

  const resetLocation = async () => {};

  // useEffect(() => {
  //   if (search) {
  //     setFilteredLocations(
  //       locations.filter(
  //         (item) =>
  //           item.address.includes(search) || item.name?.includes(search),
  //       ),
  //     );
  //   } else {
  //     setFilteredLocations([]);
  //   }
  // }, [locations, search]);

  return (
    <div className={styles.home}>
      <Header addNewLocation={addNewLocation} resetLocation={resetLocation} />
      <SearchInput search={search} setSearch={setSearch} />
      <Filters />
      {!loading ? (
        <Locations
          locations={data?.priorAuthList.resources as IResources[]}
          fetchMoreLocations={fetchMoreLocations}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
