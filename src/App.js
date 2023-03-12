import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import './App.css'
import ProtectedRoute from './components/ProtectedRoute/index'
import Home from './components/Home/index'
import Login from './components/Login/index'

class App extends Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    )
  }
}
export default App
