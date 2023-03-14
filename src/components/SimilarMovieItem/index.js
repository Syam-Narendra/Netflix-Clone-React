import {withRouter} from 'react-router-dom'

const SimilarMovieItem = props => {
  const onSimilarMovieClick = () => {
    const {history, data} = props
    const {id} = data
    console.log(data)
    history.push(`/movies/${id}`)
  }
  const {data} = props
  const {posterPath, title} = data
  return (
    <button
      className="similar-movie-button"
      onClick={onSimilarMovieClick}
      type="button"
    >
      <img className="similar-movie-image" src={posterPath} alt={title} />
    </button>
  )
}

export default withRouter(SimilarMovieItem)
