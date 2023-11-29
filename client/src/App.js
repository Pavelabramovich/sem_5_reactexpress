import logo from './logo.svg';
import axios from 'axios';
import './App.css';


const apiCall = () => {
  axios.get('http://localhost:3001/testAPI')
    .then((data) => {
      console.log(data)
    })
}


function App() {
  return (
    <div className="App">
      <header className="App-header">

        <button onClick={apiCall}>Make API Call</button>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
