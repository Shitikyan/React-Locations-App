import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { setItem } from '../../services/localstorage';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const getAccessToken = () => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    if (accessToken) {
      setItem('access_token', accessToken);
      navigate('/');
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);
  return <h1>Redirecting...</h1>;
};

export default OAuthCallback;
