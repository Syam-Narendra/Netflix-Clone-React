import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const ReactSlick = props => {
  const {data} = props
  const updatedData = data.map(each => ({
    backDropPath: each.backdrop_path,
    id: each.id,
    overview: each.overview,
    posterPath: each.poster_path,
    title: each.title,
  }))

  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  }
  return (
    <div className="slick-container">
      <Slider {...settings}>
        {updatedData.map(each => (
          <Link key={each.id} to={`/movies/${each.id}`}>
            <div className="slick">
              <img
                className="backdrop-image"
                src={each.posterPath}
                alt={each.name}
              />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  )
}

export default ReactSlick
