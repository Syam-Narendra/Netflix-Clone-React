import Slider from 'react-slick'

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
          <div key={each.id} className="slick">
            <img
              className="backdrop-image"
              src={each.posterPath}
              alt={each.name}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ReactSlick
