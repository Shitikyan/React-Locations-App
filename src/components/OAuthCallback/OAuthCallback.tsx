import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import environment from '../../environment';
import { setItem } from '../../services/localstorage';

const OAuthCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const getAccessToken = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');

      if (code) {
        const config = {
          grant_type: 'authorization_code',
          client_id: environment.AWS_CLIENT_ID,
          client_secret: environment.AWS_CLIENT_SECRET,
          redirect_uri: environment.AWS_REDIRECT_URL,
          code,
        };
        try {
          const response = await fetch(environment.AWS_TOKEN_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(config),
          });
          const data = await response.json();
          console.log(data);

          setItem('access_token', data.access_token);
          setItem('refresh_token', data.refresh_token);
          setItem('id_token', data.id_token);
          navigate('/');
        } catch (err) {
          console.log(err);
        }
      }
    };
    getAccessToken();
  }, []);
  return <h1>Redirecting...</h1>;
};

export default OAuthCallback;
