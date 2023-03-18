import './index.css'
import {Link} from 'react-router-dom'

const PageNotFound = () => (
  <div className="page-not-found-container">
    <h1>Lost Your Way</h1>
    <p>
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link className="goto-home-button" to="/">
      <button type="button"> Go to Home</button>
    </Link>
  </div>
)

export default PageNotFound
