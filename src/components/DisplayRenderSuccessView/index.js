import './index.css'

const DisplayRenderSuccessView = props => {
  const {resources} = props
  const {category, title, link, description, iconUrl} = resources
  return (
    <li className="render-success-list">
      <div className="image-title-container">
        <div className="image-border">
          <img src={iconUrl} alt={title} className="image" />
        </div>
        <div className="title-category-container">
          <h1 className="title">{title}</h1>
          <p className="category">{category}</p>
        </div>
      </div>

      <a href={link} target="_blank" rel="noreferrer" className="link">
        {link}
      </a>
      <p className="category">{description}</p>
    </li>
  )
}

export default DisplayRenderSuccessView
