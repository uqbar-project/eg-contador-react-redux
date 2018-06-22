import React, { Component } from 'react'
import './App.css'
import Contador from './components/contador'
import LogContador from './components/logContador'

class App extends Component {
  render() {
    return (
      <div>
        <Contador />
        <LogContador/>
      </div>
    );
  }
}

export default App
