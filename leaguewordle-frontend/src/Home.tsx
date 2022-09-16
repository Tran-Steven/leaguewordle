import React from "react";
import "./Home.css";
//components
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Game from "./components/Game/Game.tsx";
const Home = () => {
  return (
    <div className="main">
      <header>
        <Header />
      </header>

      <main className="gameSection">
        <Game />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
export default Home;
