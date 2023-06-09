import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
    isButtonLoading: false,
  }

  setPassword = event => {
    this.setState({password: event.target.value})
  }

  setUserName = event => {
    this.setState({username: event.target.value})
  }

  onSubmitSucess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    this.setState({isButtonLoading: true})
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSucess(data.jwt_token)
    } else {
      this.setState({
        showError: true,
        errorMsg: data.error_msg,
        isButtonLoading: false,
      })
    }
  }

  renderButtonLoading = () => <Loader type="Oval" color="white" height={15} />

  render() {
    const {
      username,
      password,
      showError,
      errorMsg,
      isButtonLoading,
    } = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <img
          className="movies-heading"
          src="https://i.ibb.co/68P8WMw/Group-7399.png"
          alt="login website logo"
        />
        <form className="input-container" onSubmit={this.onSubmitForm}>
          <h1 className="login-text">Login</h1>
          <label htmlFor="user-input" className="user-name-text">
            USERNAME
          </label>
          <input
            placeholder="rahul"
            onChange={this.setUserName}
            id="user-input"
            className="input-box"
            type="input"
            value={username}
          />
          <label htmlFor="password-input" className="user-name-text">
            PASSWORD
          </label>
          <input
            onChange={this.setPassword}
            className="input-box"
            id="password-input"
            value={password}
            type="password"
            placeholder="rahul@2021"
          />
          {showError && <p className="error-message">{errorMsg}</p>}

          <button id="logInButton" type="submit" className="sign-in-button">
            {isButtonLoading ? this.renderButtonLoading() : 'Login'}
          </button>
        </form>
      </div>
    )
  }
}

export default Login
