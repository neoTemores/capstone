import './App.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/title/Navbar'
import Home from './Components/home/Home'
import Forum from "./Components/forum/Forum"
import Wallet from "./Components/wallet/Wallet"
import Profile from "./Components/profile/Profile"
import LoginPage from './Components/landing/LoginPage'
import CreateAccountPage from './Components/landing/CreateAccountPage'
import { fetchAllSavedCoinsByUser } from './State/wallet/savedCoins'

const App = () => {
  const dispatch = useDispatch()

  // const loggedIn = useSelector(state => state.loggedIn.value)
  // const currentUser = useSelector(state => state.currentUser.value)

  // useEffect(() => {
  //   if (loggedIn)
  //     dispatch(fetchAllSavedCoinsByUser(currentUser.id))
  // }, [currentUser, loggedIn])

  return (
    <div className="appContainer">
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/forum' element={<Forum />} />
        <Route path='/wallet' element={<Wallet />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create-acc' element={<CreateAccountPage />} />
      </Routes>
    </div>
  );
}
export default App;
