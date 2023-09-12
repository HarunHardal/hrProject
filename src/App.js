import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import MainPage from './components/mainPage/MainPage';

function App() {
  return (
    <div className="App">
    
        <Routes>
          <Route path='/' element={<MainPage />} />
        </Routes>
  
    </div>
  );
}

export default App;