import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import ReactSlick from '../ReactSlick'

const status = {loading: 'Loading', success: 'success', failed: 'failed'}
class MoviesSlider extends Component {
  state = {pageStatus: status.loading, slidesData: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({pageStatus: status.loading})
    const {url} = this.props
    try {
      const token = Cookies.get('jwt_token')
      console.log(url)
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      this.setState({slidesData: data.results, pageStatus: status.success})
    } catch (error) {
      this.setState({pageStatus: status.failed})
    }
  }

  renderError = () => (
    <div className="error-page">
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getData}>
        Try Again
      </button>
    </div>
  )

  renderPage = () => {
    const {pageStatus, slidesData} = this.state
    switch (pageStatus) {
      case status.loading:
        return (
          <div testid="loader" className="loader">
            <Loader type="Oval" color="red" height={30} />
          </div>
        )
      case status.success:
        return <ReactSlick data={slidesData} />
      default:
        return this.renderError()
    }
  }

  render() {
    return <div>{this.renderPage()}</div>
  }
}

export default MoviesSlider
