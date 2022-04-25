
import logo from './league-of-wordle.png';
import './App.css';
import App2 from './App2';
import { Route, NavLink, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

  function App() { 
    return (
    <div className="App">

<div className = "nav">
<NavLink exact to ="/React" > App2</NavLink>
</div>
<Route render ={({location}) => (
  <TransitionGroup>
  <CSSTransition
  key={location.key}
  timeout={450}
  classNames="fade"
  >
    <Switch>
  <Route exact path="/App2">
    <App2 />
  </Route>
  </Switch>
  </CSSTransition>
  </TransitionGroup>
)}/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        
        </p>
        <a
          className="App-link"
          href="www.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          test
        </a>
      </header>



    </div>
  );
}


export default App;
