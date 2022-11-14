import Header from '../Header'
import ResourceTabs from '../ResourceTabs'
import ResourceResults from '../ResourceResults'
import resourceContext from '../../Context/resourceContext'

import './index.css'

const resourceButtons = [
  {id: 1, resourceValue: 'RESOURCES', label: 'Resources'},
  {id: 2, resourceValue: 'REQUESTS', label: 'Requests'},
  {id: 3, resourceValue: 'USERS', label: 'Users'},
]
const Home = () => (
  <resourceContext.Consumer>
    {value => {
      const {activeResource, changeResource} = value
      const onchangeResource = resourceValue => {
        changeResource(resourceValue)
      }
      return (
        <div className="home-bg-container">
          <Header />
          <div className="home-bottom-container">
            <ul className="resource-tabs">
              {resourceButtons.map(button => (
                <ResourceTabs
                  key={button.id}
                  activeResource={activeResource}
                  buttonDetails={button}
                  onchangeResource={onchangeResource}
                />
              ))}
            </ul>
            <ResourceResults />
          </div>
        </div>
      )
    }}
  </resourceContext.Consumer>
)

export default Home
