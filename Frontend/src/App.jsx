import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Landingpage from './components/LandingPage/Landingpage'


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landingpage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
