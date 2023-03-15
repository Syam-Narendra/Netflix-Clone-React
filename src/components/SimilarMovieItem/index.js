import {Link} from 'react-router-dom'

const SimilarMovieItem = props => {
  const {data} = props
  const {posterPath, title, id} = data
  return (
    <Link
      to={`/movies/${id}`}
      target="__blank"
      className="similar-movie-button"
    >
      <img className="similar-movie-image" src={posterPath} alt={title} />
    </Link>
  )
}

export default SimilarMovieItem
