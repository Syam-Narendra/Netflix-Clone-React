import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header/index'
import './index.css'
import MoviesSlider from '../MoviesSlider/MoviesSlider'
import Footer from '../Footer/index'

const trendingUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
const originalsUrl = 'https://apis.ccbp.in/movies-app/originals'
const status = {loading: 'Loading', success: 'success', failed: 'failed'}
class Home extends Component {
  state = {
    homeTitle: '',
    homeOverview: '',
    homePageStatus: status.loading,
    imgUrl: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const token = Cookies.get('jwt_token')
    try {
      const response = await fetch(originalsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      const res = data.results
      const randomNum = Math.floor(Math.random() * 10)
      let homeTitle = res[randomNum].title
      homeTitle = homeTitle.charAt(0).toUpperCase() + homeTitle.slice(1)
      const homeOverview = res[randomNum].overview
      const imgUrl = res[randomNum].backdrop_path
      console.log(randomNum)
      this.setState({
        homeTitle,
        homeOverview,
        imgUrl,
        homePageStatus: status.success,
      })
    } catch {
      this.setState({homePageStatus: status.failed})
    }
  }

  renderHomeBanner = () => {
    const {homeOverview, homeTitle, imgUrl} = this.state
    return (
      <div
        className="home-banner"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${imgUrl})`,
        }}
      >
        <div className="home-movie-details">
          <h1 className="home-heading">{homeTitle}</h1>
          <p className="header-para">{homeOverview}</p>
          <button type="button" className="play-button">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader home-bg-loader" testid="loader">
      <Loader type="Oval" color="red" height={30} />
    </div>
  )

  renderHome = () => {
    const {homePageStatus} = this.state
    switch (homePageStatus) {
      case status.loading:
        return this.renderLoader()
      case status.success:
        return this.renderHomeBanner()
      default:
        return <h1>Error</h1>
    }
  }

  render() {
    return (
      <div className="home-main">
        <Header />
        {this.renderHome()}
        <div className="bottom-banner">
          <div className="trending-banner">
            <h1 className="trending-now-heading">Trending Now</h1>
            <div className="originals-section">
              <MoviesSlider url={trendingUrl} />
            </div>
            <h1 className="trending-now-heading">Originals</h1>
            <div className="originals-section">
              <MoviesSlider url={originalsUrl} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
