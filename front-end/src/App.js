import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import SearchPage from './pages/SearchPage';
import MyPetsPage from './pages/MyPetsPage';
import PetPage from './pages/PetPage';
import Dashboard from './pages/Dashboard';
import AddPet from './pages/AddPet';
import Navbar from './components/Navbar';
import NavbarSlim from './components/NavbarSlim';


function App() {
  return (
    <div className="App">
      <Router>
        <NavbarSlim />
        <Routes>
          <Route exact path='/' element={<Homepage />}></Route>
          <Route exact path='/profile' element={<Profile />}> </Route>
          <Route exact path='/mypetspage' element={<MyPetsPage />}> </Route>
          <Route exact path='/searchpage' element={<SearchPage />}> </Route>
          <Route exact path='/dashboard' element={<Dashboard />}> </Route>
          <Route exact path='/addpet' element={<AddPet />}> </Route>
          <Route exact path='/petpage' element={<PetPage />}> </Route>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
