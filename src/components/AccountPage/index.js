import Cookies from 'js-cookie'
import Header from '../Header/index'
import Footer from '../Footer/index'
import './index.css'

const AccountPage = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="accounts-page">
      <Header />
      <div className="account-details-section">
        <div>
          <h1>Account</h1>
          <div className="member-ship-div">
            <p className="member-ship-heading">Member ship</p>
            <div>
              <p className="email-premium">syamN@gmail.com</p>
              <p className="password">Password: ********</p>
            </div>
          </div>
          <div className="plan-details-div">
            <p className="member-ship-heading">Plan Details</p>
            <p className="email-premium">Premium</p>{' '}
            <p className="email-premium ultra-hd">Ultra HD</p>
          </div>
        </div>
        <button onClick={onClickLogout} className="logout-button" type="button">
          Logout
        </button>
      </div>
      <Footer />
    </div>
  )
}
export default AccountPage
