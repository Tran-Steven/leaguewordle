import "./App.css";
// importing components from react-router-dom package
import {
BrowserRouter as Router,
Switch,
Route,
Redirect,
} from "react-router-dom";

// imports Home component and About component
import Home from "./components/Home";


function App() {
return (
	<>
	{/* This is the alias of BrowserRouter i.e. Router */}
	<Router>
		<Switch>
		{/* This route is for home component
		with exact path "/", in component props
		we passes the imported component*/}
		<Route exact path="/" component={Home} />
			
		{/* This route is for about component
		with exact path "/about", in component
		props we passes the imported component*/}
			
		{/* This route is for contactus component
		with exact path "/contactus", in
		component props we passes the imported component*/}
			
		{/* If any route mismatches the upper
		route endpoints then, redirect triggers
		and redirects app to home component with to="/" */}
		<Redirect to="/" />
		</Switch>
	</Router>
	</>
);
}

export default App;