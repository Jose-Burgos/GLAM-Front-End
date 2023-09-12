import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Test } from './views/test'
import { Landing } from './views/landing'
import { SignUp } from './views/signUp'
import NavBar from './components/navbar'
import { NavBarType } from './components/navbartype'
import { Footer } from './components/footer'
import { useEffect, useState } from 'react'
import { Animal } from '../types/supabase.tables'
import { selectAnimals } from './helpers'

const flag = true

const App = () => {
  const [animals, setAnimals] = useState<Animal[]>([])

  useEffect(() => {
    getAnimals()
  }, [])

  async function getAnimals() {
    let { data: animals, error } = await selectAnimals()
    if (animals === null) {
      console.log('Error: ', error)
    } else {
      console.log('Animals: ', animals)
      setAnimals(animals)
    }
  }

  return (
    <Router>
      {flag ? <NavBarType /> : <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<Test />} />
        <Route path="/sign_up" element={<SignUp />} />
      </Routes>
      <h2>Animals</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Species</th>
            <th>Breed</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.id}</td>
              <td>{animal.name}</td>
              <td>{animal.species.name}</td>
              <td>{animal.breed || 'Unspecified'}</td>
              <td>{}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </Router>
  )
}

export default App
