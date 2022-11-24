import { useEffect, useState } from 'react';

import axios from 'axios';

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [expiresIin, setExpiresIin] = useState()
  const [refreshToken, setRefreshToken] = useState()

  useEffect(() => {
    axios
      .post('http://localhost:3001/login', {code})
      .then(res => {
        setAccessToken(res.data.access_token)
        setExpiresIin(res.data.expires_in)
        setRefreshToken(res.data.refresh_token)
      })
      .catch(err => {
        window.location = '/'
      })
  }, [code, accessToken])

  return accessToken
};
