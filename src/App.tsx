import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Test } from './views/test'
import { Landing } from './views/landing';
import  NavBar  from './components/navbar';
import { NavBarType } from './components/navbartype';
import { Footer } from './components/footer';
import { OngView } from './Views/OngView';

function hasJWT() : boolean {
  return window.localStorage.getItem("authUser") !== null;
}

const flag = true;

export const App = () => (
  <Router>
    { flag ? <NavBarType/> : <NavBar/> }
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/test' element={<Test/>}/>
      <Route path='/ong' element={<OngView/>}/>
    </Routes>
    <Footer/>
  </Router>
)

export default App
