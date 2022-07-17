import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import titleImage from './assets/league-of-wordle.png'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <img id="title" src={titleImage} alt="Title Screen"></img>
)