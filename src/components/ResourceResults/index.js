import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import * as Loader from 'react-loader-spinner'
import resourceContext from '../../Context/resourceContext'
import DisplayRenderSuccessView from '../DisplayRenderSuccessView'
import Pagination from '../Pagination'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  empty: 'EMPTY',
}
let totalItems

class ResourceResults extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    resourcesData: [],
    activePage: 1,
  }

  componentDidMount() {
    this.getResourcesData()
  }

  getResourcesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl =
      'https://media-content.ccbp.in/website/react-assignment/resources.json'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.map(resource => ({
        id: resource.id,
        category: resource.category,
        description: resource.description,
        title: resource.title,
        link: resource.link,
        tag: resource.tag,
        iconUrl: resource.icon_url,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        resourcesData: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="resources-loader-container">
      <Loader.TailSpin type="Rings" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickTryAgain = () => {
    this.getResourcesData()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dyrfx9ekj/image/upload/v1661942080/Group_7522_gdsj57.png"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong. Please try again</p>

      <button
        type="button"
        className="try-again-button"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  getSearchResults = () => {
    const {searchInput, resourcesData} = this.state
    const searchResults = resourcesData.filter(resource =>
      resource.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return searchResults
  }

  onChangeActivePage = page => {
    this.setState({activePage: page})
  }

  renderSuccessViews = () => (
    <resourceContext.Consumer>
      {value => {
        const {activeResource} = value
        const {activePage} = this.state
        const searchResults = this.getSearchResults()
        let updatedData
        if (activeResource === 'REQUESTS') {
          updatedData = searchResults.filter(
            resource => resource.tag === 'request',
          )
        } else if (activeResource === 'USERS') {
          updatedData = searchResults.filter(
            resource => resource.tag === 'user',
          )
        } else {
          updatedData = searchResults
        }
        totalItems = updatedData.length
        const lastPage = activePage * 6
        const firstPage = lastPage - 6
        return (
          <div>
            <ul className="results-container">
              {updatedData.slice(firstPage, lastPage).map(resource => (
                <DisplayRenderSuccessView
                  resources={resource}
                  key={resource.id}
                />
              ))}
            </ul>
            <Pagination
              key={totalItems}
              totalItems={totalItems}
              onChangeActivePage={this.onChangeActivePage}
              activePage={activePage}
            />
          </div>
        )
      }}
    </resourceContext.Consumer>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessViews()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {searchInput} = this.state
    return (
      <div>
        <div className="search-container">
          <BsSearch className="search-icon" />
          <input
            type="search"
            placeholder="Search"
            value={searchInput}
            className="search-input"
            onChange={this.onChangeSearchInput}
          />
        </div>
        <div className="render-view">{this.renderView()}</div>
      </div>
    )
  }
}

export default ResourceResults
