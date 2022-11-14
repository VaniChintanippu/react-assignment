import './index.css'

const ResourceTabs = props => {
  const {buttonDetails, activeResource, onchangeResource} = props
  const {resourceValue, label} = buttonDetails

  const onchangeResourceLabel = () => {
    onchangeResource(resourceValue)
  }
  const activeButtonClassName =
    activeResource === resourceValue
      ? 'button activeButton'
      : 'button non-active'
  return (
    <li className="tab-list">
      <button
        className={activeButtonClassName}
        type="button"
        onClick={onchangeResourceLabel}
      >
        {label}
      </button>
    </li>
  )
}

export default ResourceTabs
