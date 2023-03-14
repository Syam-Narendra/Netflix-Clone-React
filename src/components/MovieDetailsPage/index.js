import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header/index'
import Footer from '../Footer/index'
import SimilarMovieItem from '../SimilarMovieItem/index'

const status = {loading: 'Loading', success: 'success', failed: 'failed'}

class MovieDetailsPage extends Component {
  state = {movieData: [], pageStatus: status.loading}

  componentDidMount() {
    this.getMovieDetailsData()
  }

  getMovieDetailsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    try {
      const url = `https://apis.ccbp.in/movies-app/movies/${id}`
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      let data = await response.json()
      data = data.movie_details
      const responseData = [data].map(each => ({
        adult: each.adult,
        backDropPath: each.backdrop_path,
        budget: each.budget,
        genres: each.genres,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        releaseDate: each.release_date.slice(0, 4),
        runtime: each.runtime,
        hours: Math.floor(each.runtime / 60),
        minutes: each.runtime % 60,
        similarMovies: each.similar_movies,
        spokenLanguages: each.spoken_languages,
        title: each.title,
        voteAverage: each.vote_average,
        voteCount: each.vote_count,
      }))
      this.setState({
        movieData: {...responseData[0]},
        pageStatus: status.success,
      })
    } catch {
      this.setState({pageStatus: status.failed})
    }
  }

  getSimilarMovies = () => {
    const {movieData} = this.state
    const {similarMovies} = movieData
    const similarMoviesData = similarMovies.map(each => ({
      backDropPath: each.backdrop_path,
      id: each.id,
      posterPath: each.poster_path,
      title: each.title,
    }))
    return (
      <div className="similar-movies-container">
        <h1 className="more-heading">More Like This</h1>
        <div className="similar-movies-list">
          {similarMoviesData.map(each => (
            <SimilarMovieItem data={each} key={each.id} />
          ))}
        </div>
      </div>
    )
  }

  renderPage = () => {
    const {movieData} = this.state
    const {
      backDropPath,
      title,
      hours,
      minutes,
      overview,
      adult,
      releaseDate,
      genres,
      spokenLanguages,
      voteCount,
      voteAverage,
      budget,
    } = movieData
    const audioAvailable = spokenLanguages.map(each => ({
      id: each.id,
      audioName: each.english_name,
    }))
    const certificate = adult ? 'A' : 'U/A'
    const runTime = `${hours}h ${minutes}m`

    return (
      <>
        <div
          className="movie-detail-banner"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${backDropPath})`,
          }}
        >
          <Header />
          <div className="specific-movie-details">
            <h1 className="movie-detail-title">{title}</h1>
            <div className="time-certificate-container">
              <p>{runTime}</p>
              <p className="movie-certificate">{certificate}</p>
              <p>{releaseDate}</p>
            </div>
            <p className="movie-detail-overview">{overview}</p>
            <button className="movie-detail-play-button" type="button">
              Play
            </button>
          </div>
        </div>

        <div className="movie-other-bottom-container">
          <div className="genres-container">
            <h1 className="movie-info-heading">Genres</h1>
            {genres.map(each => (
              <p key={each.id}>{each.name}</p>
            ))}
          </div>

          <div className="audio-available-container">
            <h1 className="movie-info-heading">Audio Available</h1>
            {audioAvailable.map(each => (
              <p key={each.id}>{each.audioName}</p>
            ))}
          </div>

          <div className="rating-count-average">
            <h1 className="movie-info-heading">Rating Count</h1>
            <p>{voteCount}</p>
            <h1 className="movie-info-heading">Rating Average</h1>
            <p>{voteAverage}</p>
          </div>

          <div className="budget-releasedate">
            <h1 className="movie-info-heading">Budget</h1>
            <p>{budget}</p>
            <h1 className="movie-info-heading">Release Date</h1>
            <p>{releaseDate}</p>
          </div>
        </div>
        {this.getSimilarMovies()}
      </>
    )
  }

  renderLoader = () => (
    <>
      <Header />
      <div className="movie-details-loader-container">
        <Loader type="Oval" color="red" height={40} />
      </div>
    </>
  )

  renderSwitch = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case status.loading:
        return this.renderLoader()
      case status.success:
        return this.renderPage()
      default:
        return <h1>Error</h1>
    }
  }

  render() {
    return (
      <div className="movie-detail-main">
        {this.renderSwitch()}
        <Footer />
      </div>
    )
  }
}

export default MovieDetailsPage
