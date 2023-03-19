import {BsFillExclamationTriangleFill} from 'react-icons/bs'

const FetchErrorTryAgain = props => {
  const {getData} = props
  return (
    <div className="error-page">
      <img src="https://i.ibb.co/LgfbYZR/Icon.png" alt="failure view" />
      <p>Something went wrong. Please try again</p>
      <button onClick={getData} type="button">
        Try Again
      </button>
    </div>
  )
}
export default FetchErrorTryAgain
