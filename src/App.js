import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'
import ProtectedRoute from './components/ProtectedRoute/index'
import Home from './components/Home/index'
import Login from './components/Login/index'
import PopularPage from './components/PopularPage/index'
import AccountPage from './components/AccountPage/index'
import MovieDetailsPage from './components/MovieDetailsPage/index'
import Search from './components/Search/index'
import PageNotFound from './components/PageNotFound/index'

class App extends Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/popular" component={PopularPage} />
        <ProtectedRoute exact path="/account" component={AccountPage} />
        <ProtectedRoute exact path="/movies/:id" component={MovieDetailsPage} />
        <ProtectedRoute exact path="/search" component={Search} />
        <Route path="/page-not-found" component={PageNotFound} />
        <Redirect to="/page-not-found" />
      </Switch>
    )
  }
}
export default App
