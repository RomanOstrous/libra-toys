import { Link } from "react-router-dom";
import './Footer.scss';

export default function Footer() {
  return (
    <div className='footer'>
      <div className="footer__container container">
        <div className="footer__info">
          <Link to="https://www.instagram.com/_libra_711/" className="footer__text-l">
            Instagram
          </Link>

          <p className="footer__text-l">
            Libra_711_@gmail.com
          </p>
        </div>

        <div className="footer__info">
          <p className="footer__text">
            Libra_711_
          </p>

          <p className="footer__text">
            ©2024,<br />
            Team #45
          </p>
        </div>
      </div>
    </div>
  )
}
