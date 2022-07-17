
import logo from './league-of-wordle.png';
import './App.css';
import App2 from './App2';
import { Route, NavLink, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';


  function App() { 
    return (

    <div className="App">


      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="www.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >

        </a>
      </header>



    </div>
  );
}


export default App;
