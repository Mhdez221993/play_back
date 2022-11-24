import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './Dashboard';
import Login from "./Login";
import React from "react";

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return !code  ? <Login /> : <Dashboard code={code} />;
}

export default App;
