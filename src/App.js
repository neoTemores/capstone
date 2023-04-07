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
import { useSelector } from 'react-redux'
import Footer from './Components/footer/Footer'
import About from './Components/footer/About'

const App = () => {
  const loading = useSelector(state => state.loading.value)

  return (
    <div className="appContainer">
      <Navbar />
      {loading && <Loading />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/forum' element={<Forum />} />
        <Route path='/wallet' element={<Wallet />} />
        <Route exact path='/profile/:username/:id' element={<Profile />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create-acc' element={<CreateAccountPage />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
