import React from 'react';
import auth from './useAuth';

const Dashboard = ({code}) => {
  const accessToken = auth(code)

  return (
    <div>
      <h1>{code}</h1>
    </div>
  );
};

export default Dashboard;
