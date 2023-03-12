import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header/index'
import Footer from '../Footer/index'
import './index.css'

class PopularPage extends Component {
  state = {popularMovies: []}

  componentDidMount() {
    this.getPopularData()
  }

  getPopularData = async () => {
    const token = Cookies.get('jwt_token')
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
    this.setState({popularMovies})
  }

  render() {
    const {popularMovies} = this.state
    return (
      <div className="popular-home">
        <Header />
        <div className="popular-list-container">
          {popularMovies.map(each => (
            <img
              className="popular-image"
              src={each.backDropPath}
              alt={each.title}
              key={each.id}
            />
          ))}
        </div>
        <Footer />
      </div>
    )
  }
}
export default PopularPage
