import './App.css';
import Home from './Home';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Room from './Room';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/room/:roomId' element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
