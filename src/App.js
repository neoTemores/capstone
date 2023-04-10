import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/title/Navbar'
import Home from './Components/home/Home'
import Forum from "./Components/forum/Forum"
import Wallet from "./Components/wallet/Wallet"
import Profile from "./Components/profile/Profile"
import LoginPage from './Components/landing/LoginPage'
import CreateAccountPage from './Components/landing/CreateAccountPage'
import Loading from './Components/templates/Loading'
import { useSelector, useDispatch } from 'react-redux'
import { setLoggedIn } from './State/user/loggedIn'
import { setCurrentUser } from './State/user/currentUser'
import { fetchAllSavedCoinsByUser } from './State/wallet/savedCoins'
import Footer from './Components/footer/Footer'
import About from './Components/footer/About'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.loading.value)
  const loggedIn = useSelector(state => state.loggedIn.value)

  useEffect(() => {
    if (!loggedIn & localStorage.getItem('cryptoEagleUser') !== null) {

      const user = JSON.parse(localStorage.cryptoEagleUser)
      dispatch(setLoggedIn(true))
      dispatch(setCurrentUser(user))
      dispatch(fetchAllSavedCoinsByUser(user.id))
    }

  }, [])

  return (
    <div className="appContainer">
      <Navbar />
      {loading && <Loading />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/forum' element={<Forum />} />
        <Route path='/wallet' element={<Wallet />} />
        <Route exact path='/profile/:username' element={<Profile />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create-acc' element={<CreateAccountPage />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
