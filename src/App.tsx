import { useState } from 'react'
import Offer from './components/Offer'
import User from './pages/User';
import Offers from './pages/Offers';

import './App.css'

function App() {

  const [user, setUser] = useState(false);

  return (
    <>
      <button onClick={() => setUser(!user)}>Changer de page</button>
      {
        user ?
        <User /> :
        <Offers />
      }
    </>
  )
}

export default App
