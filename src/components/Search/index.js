import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Header from '../Header/index'
import './index.css'

class Search extends Component {
  state = {searchResultsData: [], showNoResults: false}

  searchInput = async searchText => {
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
      this.setState({showNoResults: true})
    } else {
      this.setState({searchResultsData: updatedData, showNoResults: false})
    }
  }

  renderSearchItems = () => {
    const {searchResultsData} = this.state
    return (
      <ul className="search-results-container">
        {searchResultsData.map(each => (
          <li key={each.id}>
            <Link key={each.id} to={`/movies/${each.id}`}>
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

  render() {
    const {showNoResults} = this.state
    return (
      <div className="search-main">
        <Header searchInput={this.searchInput} />
        <div className="search-results-container">
          {showNoResults ? <h1>Eror</h1> : this.renderSearchItems()}
        </div>
      </div>
    )
  }
}
export default Search
