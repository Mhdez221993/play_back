import { useEffect, useState } from 'react';

import axios from 'axios';

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()

  useEffect(() => {
    axios
      .post('http://localhost:3001/login', {code})
      .then(res => {
        setAccessToken(res.body.access_token)
        console.log(res.body);
      })
      .catch(err => {
        window.location = '/'
      })
  }, [code])

  return accessToken
};
