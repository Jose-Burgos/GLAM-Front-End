import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Test } from './views/test'
import { Landing } from './views/landing';
import  NavBar  from './components/navbar';
import { NavBarType } from './components/navbartype';
import { Footer } from './components/footer';
import { OngView } from './views/OngView';
import { Proyecto4patas } from './views/proyecto4patas';
import { PatitasGlew } from './views/PatitasGlew';
import { Zaguatesrefugio } from './views/zaguatesrefugio';
import { Patitasalrescate } from './views/patitasalrescate';
import { AdoptView } from './views/AdoptView';
import  LostPetReportView from './views/LostPetReport'
import  UserMapPageView  from './views/UserMapPage'

// function hasJWT() : boolean {
//   return window.localStorage.getItem("authUser") !== null;
// }

const flag = true;

export const App = () => (
  <Router>
    { flag ? <NavBarType/> : <NavBar/> }
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/test' element={<Test/>}/>
      <Route path='/ong' element={<OngView/>}/>
      <Route path='/proyecto4patas' element={<Proyecto4patas/>}/>
      <Route path='/zaguatesrefugio' element={<Zaguatesrefugio/>}/>
      <Route path='/patitasalrescate' element={<Patitasalrescate/>}/>
      <Route path='/patitasglew' element={<PatitasGlew/>}/>
      <Route path='/rescue' element={<LostPetReportView/>}/>
      <Route path='/map' element={<UserMapPageView/>}/>
      <Route path='/adopcion' element={<AdoptView/>}/>
    </Routes>
    <Footer/>
  </Router>
)

export default App
