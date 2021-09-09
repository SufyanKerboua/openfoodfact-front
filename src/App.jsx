import React, { useState } from 'react';
import Form from './views/Form';
import Dashboard from './views/Dashboard';

import './styles/App.css';

function App() {
  const [token, setToken] = useState(null);

  return token ?
    <Dashboard token={token} setToken={setToken} />
    :
    <Form setToken={setToken} />
  ;
}

export default App;
