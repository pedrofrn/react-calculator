import logo from './logo.svg';
import './App.css';
import Calculator from './Calculator';

function App() {

  return (
    <div className="App App-header">
      <header>
        <img src={logo} className="react" alt="logo" />
        <h1>React Calculator</h1>
      </header>
      <Calculator />
      <span className='credit'>Coded by <a href="https://github.com/pedrofrn/" target="_blank">pedrofrn</a></span>
    </div>
  );
}

export default App;
