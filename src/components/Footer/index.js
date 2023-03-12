import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer">
    <div className="icons">
      <div className="icon">
        <FaGoogle size={20} />
      </div>

      <div className="icon">
        <FaTwitter size={20} />
      </div>

      <div className="icon">
        <FaInstagram size={20} />
      </div>

      <div className="icon">
        <FaYoutube size={20} />
      </div>
    </div>
    <p>Contact us</p>
  </div>
)

export default Footer
