import './App.css'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import FormPage from "./components/FormPage/FormPage.jsx"
import DetailPage from "./components/DetailPage/DetailPage.jsx"
import HomePage from "./components/HomePage/HomePage.jsx" 
import NavBar from "./components/NavBar/NavBar.jsx"
import {useDispatch} from "react-redux"
import { searchCountry } from './redux/actions.js'
import { useState } from 'react'

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentPage,setCurrentPage] = useState(1)

   function onSearch(name){
    try {
      dispatch(searchCountry(name))
      setCurrentPage(1)
    } catch (error) {
      alert(error.message)
    }
  }

  

  return (
    <>
    <div>
    {
      location.pathname !== "/"  && <NavBar onSearch={onSearch} setCurrentPage={setCurrentPage}/>
    }
      <Routes>
        <Route path='/' element={<LandingPage></LandingPage>}></Route>
        <Route path='/home' element={<HomePage currentPage={currentPage} setCurrentPage={setCurrentPage}></HomePage>}></Route>
        <Route path='/:currentPage' element={<HomePage></HomePage>}></Route>
        <Route path='/detail/:id' element={<DetailPage></DetailPage>}></Route>
        <Route path='/form' element={<FormPage></FormPage>}></Route>
      </Routes>
    </div>
    </>
  )
}

export default App
