
import React from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link } from "react-router-dom";
  
const Home = () => {
  return (
    <div>
      <h1>League of Wordle</h1>
      <br />
      <ul>

        <li>
          {/* Endpoint to route to About component */}
          <Link to="/about">About</Link>
        </li>

      </ul>
    </div>
  );
};
  
export default Home;