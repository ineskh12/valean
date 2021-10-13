import './App.css';
import React, { useEffect, useState } from 'react'
import Routes from './components/Routes'
import { UidContext } from './components/Routes/AppContext'
import axios from 'axios';




function App() {

  const [uid, setUid] = useState(null);




return (


    <Routes />

 
);
}

export default App;
