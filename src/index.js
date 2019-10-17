import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Context from './Context'

ReactDOM.render(
    <Context.Provider>
        <App />
    </Context.Provider>,
    document.getElementById('root'))

registerServiceWorker()
