import Cookies from 'js-cookie'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import Footer from '../Footer/index'
import './index.css'

const status = {loading: 'Loading', success: 'success', failed: 'failed'}

class PopularPage extends Component {
  state = {popularMovies: [], pageStatus: status.loading}

  componentDidMount() {
    this.getPopularData()
  }

  getPopularData = async () => {
    const token = Cookies.get('jwt_token')
    try {
      const url = 'https://apis.ccbp.in/movies-app/popular-movies'
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      const popularMovies = data.results.map(each => ({
        backDropPath: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({popularMovies, pageStatus: status.success})
    } catch {
      this.setState({pageStatus: status.failed})
    }
  }

  renderPopularListItems = () => {
    const {popularMovies} = this.state
    return (
      <div className="middleware">
        <ul className="popular-list-container">
          {popularMovies.map(each => (
            <Link key={each.id} to={`/movies/${each.id}`}>
              <li className="image-item">
                <img
                  className="popular-image"
                  src={each.backDropPath}
                  alt={each.title}
                />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="popular-loader-error">
      <Loader type="Oval" color="red" height={40} />
    </div>
  )

  renderErrorPage = () => (
    <div className="popular-loader-error">
      <h1>Error</h1>
    </div>
  )

  renderPage = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case status.loading:
        return this.renderLoader()
      case status.success:
        return this.renderPopularListItems()
      default:
        return this.renderErrorPage()
    }
  }

  render() {
    return (
      <div className="popular-home">
        <Header />
        {this.renderPage()}
        <Footer />
      </div>
    )
  }
}
export default PopularPage
