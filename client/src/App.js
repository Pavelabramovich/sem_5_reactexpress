import logo from './logo.svg';
import axios from 'axios';
import './App.css';

import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';


const apiCall = () => {
  axios.get('http://localhost:3001/testAPI')
    .then((data) => {
      console.log(data)
    })
}


function App() {
  return (
    <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
  );
}

export default App;
