import './App.css'
import { Route, Routes } from 'react-router-dom'
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

export const POSTS_URL = {
  "LIST_NAME": "posts",
  "GET_ALL": "http://localhost:8080/api/posts",
  "GET_ONE": "http://localhost:8080/api/posts/",
  "POST": "http://localhost:8080/api/posts",
  "PATCH": "http://localhost:8080/api/posts/",
  "DELETE": "http://localhost:8080/api/posts/",
}

export const WALLET_URL = {
  "LIST_NAME": "savedCoinsList",
  "GET_ALL_BY_USER": "http://localhost:8080/api/saved-coins/user/",
  "POST": "http://localhost:8080/api/saved-coins/add",
  "DELETE": "http://localhost:8080/api/saved-coins/delete/"
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
