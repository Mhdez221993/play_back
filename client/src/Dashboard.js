import { Container, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import auth from './useAuth';

const Dashboard = ({code}) => {
  const accessToken = auth(code)

  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState('')

  useEffect(() =>{
    if (search === '') return
    if (!accessToken) return setSearchResult([])



  }, [search, accessToken])

  return (
    <Container>
      <Form.Control
        type="search"
        placeholder="Saerch Songs/Artis..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


    </Container>
  );
};

export default Dashboard;
