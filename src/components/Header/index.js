import {Link} from 'react-router-dom'
import './index.css'

const Header = () => {
  const onClickAdd = () => {}

  return (
    <nav className="nav-container">
      <img
        src="https://res.cloudinary.com/dyrfx9ekj/image/upload/v1668099253/NxtWave_TM_Coloured_logo_1_hcvsie.png"
        alt="logo"
        className="header-logo"
      />
      <div className="button-image-container">
        <Link to="/create-item">
          <button type="button" className="add-button" onClick={onClickAdd}>
            Add Item
          </button>{' '}
        </Link>
        <img
          src="https://res.cloudinary.com/dyrfx9ekj/image/upload/v1668137283/image_ejlu6r.png"
          alt="person"
          className="header-person"
        />
      </div>
    </nav>
  )
}

export default Header
