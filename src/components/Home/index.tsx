/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { gql, useLazyQuery } from '@apollo/client';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Filters from '../Filters';
import Header from '../Header';
import Locations from '../Locations';
import SearchInput from '../SearchInput';
import environment from '../../environment';
import { getItem, setItem } from '../../services/localstorage';
import { IData, IResources } from './types';
import DetailsSection from '../DetailsSection';
import Button from '../Button';

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

export const logout = () => {
  localStorage.removeItem('access_token');
  const authURL = `${environment.AWS_AUTH_URL}logout?client_id=${environment.AWS_CLIENT_ID}&redirect_uri=${window.location.origin}&response_type=token`;
  window.location.assign(authURL);
};

const tenantPrefix = 'tenant_';
const getUserInformation = (payload: any) => {
  const tenants = payload['cognito:groups'];
  let tenantId = '';
  if (tenants.length > 0) {
    tenantId = tenants[0].slice(tenantPrefix.length);
  }
  payload['tenantId'] = tenantId;

  return payload;
};

export default function Home() {
  const [getAppointments, { data, loading }] =
    useLazyQuery<IData>(GET_TIMELINE);
  const [search, setSearch] = useState<string>('');
  const [locations, setLocations] = useState<IResources[]>(
    data?.priorAuthList.resources as IResources[],
  );
  const [page, setPage] = useState<number>(0);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IResources | null>(null);
  const navigate = useNavigate();

  const getAccessToken = () => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    console.log('params', params);
    const accessToken = params.get('access_token');
    if (accessToken) {
      const tokenId = params.get('id_token');
      const payload = jwtDecode(tokenId!);
      const user = getUserInformation(payload);
      setItem('user', user);
      setItem('access_token', accessToken);
      navigate('/');
    }
  };

  useEffect(() => {
    const token = getItem('access_token');
    if (!token) {
      getAccessToken();
    }
  }, [navigate]);

  const allPages = useMemo(() => data?.priorAuthList.pages || 0, [data]);

  useEffect(() => {
    const userStr = getItem('user');
    if (!userStr) {
      return;
    }
    const user = JSON.parse(userStr);
    const date = moment();
    const dateString = date.format('YYYY-MM-DD[T]HH:mm:ssZ');
    console.log(dateString);
    getAppointments({
      variables: {
        tenant: user.tenantId,
        appointmentStatus: 'booked',
        appointmentStart: dateString,
        page,
        limit: 7, // Change to page size
      },
    });
  }, [getAppointments, page]);

  useEffect(() => {
    setLocations(data?.priorAuthList.resources as IResources[]);
  }, [data]);

  useEffect(() => {
    const token = getItem('access_token');
    if (!token) {
      const authURL = `${environment.AWS_AUTH_URL}oauth2/authorize/?response_type=token&client_id=${environment.AWS_CLIENT_ID}&redirect_uri=${window.location.origin}&scope=email+gravity/graphql+openid+phone+profile`;
      window.location.assign(authURL);
    }
  }, []);

  const setCurrentPage = (currentPage: number) => {
    setPage(currentPage);
  };

  const addNewLocation = async () => {};

  const resetLocation = async () => {
    setPage(0);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    const authURL = `${environment.AWS_AUTH_URL}logout?client_id=${environment.AWS_CLIENT_ID}&redirect_uri=${window.location.origin}&response_type=token`;
    window.location.assign(authURL);
  };

  const onSetAppointment = (data: IResources) => [setSelectedAppointment(data)];

  return (
    <div className={styles.home}>
      <Button text="Logout" onClick={logout} />
      <div className={styles.homeLeftSection}>
        <Header addNewLocation={addNewLocation} resetLocation={resetLocation} />
        <SearchInput search={search} setSearch={setSearch} />
        <Filters />
        {!loading ? (
          <Locations
            locations={locations}
            setPage={setCurrentPage}
            page={page}
            allPages={allPages}
            onSetAppointment={onSetAppointment}
          />
        ) : (
          <Spin
            className={styles.loader}
            indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
          />
        )}
      </div>
      <DetailsSection detailsData={selectedAppointment?.coverage} />
    </div>
  );
}
