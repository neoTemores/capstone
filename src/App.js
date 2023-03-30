import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Components/title/Navbar'
import Home from './Components/home/Home'
import Forum from "./Components/forum/Forum"
import Wallet from "./Components/wallet/Wallet"
import Profile from "./Components/profile/Profile"

export const COIN_URL = {
  "LIST_NAME": "coinList",
  "GET_ALL": "http://localhost:8080/api/get-coins",
  "GET_ONE": "http://localhost:8080/api/coin/"
}

const App = () => {

  return (
    <div className="appContainer">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/forum' element={<Forum />} />
        <Route path='/wallet' element={<Wallet />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Profile />} />
        <Route path='/profile' element={<Profile />} />

      </Routes>
    </div>
  );
}
export default App;
