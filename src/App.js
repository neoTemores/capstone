import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import AllRecords from './Components/AllRecords'
import About from './Components/About'
import EditModal from './Components/EditModal'
import { useDispatch, useSelector } from 'react-redux'
import { setRecordsToDisplay } from './features/recordsToDisplay'
import NewRecordModal from './Components/NewRecordModal'
import Login from './Components/Login'

export const URL = {
  "LIST_NAME": "coinList",
  "FETCH_ALL": "http://localhost:8080/api/get-coins",
  "FETCH_ONE": "http://localhost:8080/api/coin/",
  "POST": "http://localhost:8080/api/records/add",
  "PATCH": "http://localhost:8080/api/records/update/",
  "DELETE": "http://localhost:8080/api/records/delete/"
}

const App = () => {
  const dispatch = useDispatch();
  const allRecords = useSelector((state) => state.allRecords.value)
  const startIndex = useSelector((state) => state.startIndex.value)
  const endIndex = useSelector((state) => state.endIndex.value)
  const showModal = useSelector(state => state.showModal.value)
  const showMsg = useSelector(state => state.showMsg.value)
  const msgText = useSelector(state => state.msgText.value)
  const showNewRecordModal = useSelector(state => state.showNewRecordModal.value)
  const loggedIn = useSelector(state => state.loggedIn.value)

  useEffect(() => {
    updateRecordsDisplay();
  }, [startIndex, endIndex, allRecords])

  const updateRecordsDisplay = () => {
    dispatch(setRecordsToDisplay(allRecords.slice(startIndex, endIndex)))
  }

  if (!loggedIn) return <Login />

  return (
    <div className="appContainer">
      <Navbar />
      {showMsg && <div className='updateMsgContainer'><h3>{msgText}</h3></div>}
      {showModal && <EditModal />}
      {showNewRecordModal && <NewRecordModal />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all-records' element={<AllRecords />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
export default App;
