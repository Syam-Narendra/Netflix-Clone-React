import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import './index.css'

const searchRoute = true
const searchPageStatusData = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  noData: 'noData',
  failed: 'failed',
}

class Search extends Component {
  state = {
    searchResultsData: [],
    pageStatus: searchPageStatusData.initial,
    searchText: '',
  }

  searchInput = async searchText => {
    this.setState({pageStatus: searchPageStatusData.loading, searchText})
    try {
      const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
      const token = Cookies.get('jwt_token')
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
        title: each.title,
      }))
      console.log(updatedData.length)
      if (updatedData.length === 0) {
        this.setState({pageStatus: searchPageStatusData.noData})
      } else {
        this.setState({
          searchResultsData: updatedData,
          pageStatus: searchPageStatusData.success,
        })
      }
    } catch {
      this.setState({pageStatus: searchPageStatusData.failed})
    }
  }

  renderSearchItems = () => {
    const {searchResultsData} = this.state
    return (
      <ul className="search-results-container">
        {searchResultsData.map(each => (
          <li className="search-item-container" key={each.id}>
            <Link to={`/movies/${each.id}`}>
              <img
                className="search-result-poster"
                src={each.posterPath}
                alt={each.title}
              />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderNodata = () => {
    const {searchText} = this.state
    return (
      <p className="no-data-error">
        <img src="https://i.ibb.co/1nLGDJJ/Layer-2.png" alt="no movies" />
        Your search for {searchText} did not find any matches
      </p>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="red" height={30} />
    </div>
  )

  renderError = () => (
    <div className="popular-error-container">
      <img src="https://i.ibb.co/9V8B71j/Group.png" alt="failure view" />
      <p>Something went wrong. Please try again</p>
      <button onClick={this.searchInput} type="button">
        Try Again
      </button>
    </div>
  )

  renderSearchSwitch = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case searchPageStatusData.initial:
        return <></>
      case searchPageStatusData.loading:
        return this.renderLoader()
      case searchPageStatusData.success:
        return this.renderSearchItems()
      case searchPageStatusData.noData:
        return this.renderNodata()
      default:
        return this.renderError()
    }
  }

  render() {
    return (
      <div className="search-main">
        <Header searchRoute={searchRoute} searchInput={this.searchInput} />
        <div className="search-results-container">
          {this.renderSearchSwitch()}
        </div>
      </div>
    )
  }
}
export default Search
