/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useMemo, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Filters from '../Filters';
import Header from '../Header';
import Locations from '../Locations';
import SearchInput from '../SearchInput';
import environment from '../../environment';
import { getItem } from '../../services/localstorage';
import { IData, IResources } from './types';

import styles from './styles.module.scss';

const GET_TIMELINE = gql`
  query Resources(
    $tenant: String!
    $appointmentStatus: AppointmentStatus
    $appointmentStart: String
    $limit: Int
    $page: Int
  ) {
    priorAuthList(
      tenant: $tenant
      appointmentStatus: $appointmentStatus
      appointmentStart: $appointmentStart
      limit: $limit
      page: $page
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
      pages
    }
  }
`;

export default function Home() {
  const [getAppointments, { data, loading }] =
    useLazyQuery<IData>(GET_TIMELINE);
  const [search, setSearch] = useState<string>('');
  const [locations, setLocations] = useState<IResources[]>(
    data?.priorAuthList.resources as IResources[],
  );
  const [page, setPage] = useState<number>(0);

  const allPages = useMemo(() => data?.priorAuthList.pages || 0, [data]);

  useEffect(() => {
    getAppointments({
      variables: {
        tenant: '940e8edf-edd9-401d-a21a-10f866fbdb3f',
        appointmentStatus: 'booked',
        appointmentStart: '2023-01-10T09:58:29-05:00',
        page,
        limit: 7,
      },
    });
  }, [getAppointments, page]);

  useEffect(() => {
    setLocations(data?.priorAuthList.resources as IResources[]);
  }, [data]);

  useEffect(() => {
    const token = getItem('access_token');
    if (!token) {
      const authURL = `${environment.AWS_AUTH_URL}?response_type=code&client_id=${environment.AWS_CLIENT_ID}&redirect_uri=${environment.AWS_REDIRECT_URL}`;
      window.location.assign(authURL);
    }
  }, []);

  const setCurrentPage = (currentPage: number) => {
    setPage(currentPage);
  };

  const addNewLocation = async () => {};

  const resetLocation = async () => {
    setLocations(data?.priorAuthList.resources as IResources[]);
  };

  return (
    <div className={styles.home}>
      <Header addNewLocation={addNewLocation} resetLocation={resetLocation} />
      <SearchInput search={search} setSearch={setSearch} />
      <Filters />
      {!loading ? (
        <Locations
          locations={locations}
          setPage={setCurrentPage}
          page={page}
          allPages={allPages}
        />
      ) : (
        <Spin
          className={styles.loader}
          indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
        />
      )}
    </div>
  );
}
