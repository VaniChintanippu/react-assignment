import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaLessThan} from 'react-icons/fa'
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css'

import {ToastContainer, toast} from 'react-toastify'

import resourceContext from '../../Context/resourceContext'
import Header from '../Header'

import './index.css'

class CreateItem extends Component {
  state = {
    itemName: '',
    link: '',
    resourceName: '',
    description: '',
  }

  onSubmitSuccess = () => {
    toast.success('Success', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

  onSubmitFailure = () => {
    toast.error('Try Again', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

  onSubmitFailureValidation = () => {
    toast.error('Please Write Valid Details', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {itemName, link, resourceName, description} = this.state
    const userDetails = {itemName, link, resourceName, description}

    const url =
      'https://media-content.ccbp.in/website/react-assignment/add_resource.json'
    if (
      itemName.length >= 1 &&
      resourceName.length >= 1 &&
      description <= 250
    ) {
      axios
        .post(url, JSON.stringify(userDetails))
        .then(response => {
          this.onSubmitSuccess(response)
        })
        .catch(error => {
          this.onSubmitFailure(error)
        })
    } else {
      this.onSubmitFailureValidation()
    }
  }

  onChangeItemName = event => {
    this.setState({itemName: event.target.value})
  }

  onChangeUrl = event => {
    this.setState({link: event.target.value})
  }

  onChangeResourceName = event => {
    this.setState({resourceName: event.target.value})
  }

  onChangeDescription = event => {
    this.setState({description: event.target.value})
  }

  goBackToHome = () => (
    <resourceContext.Consumer>
      {value => {
        const {activeResource} = value
        const val = activeResource.toLowerCase()
        return (
          <Link to="/" className="create-item-link">
            <div className="create-item-go-back-container">
              <FaLessThan className="create-item-link-value" />
              <p> {val}</p>
            </div>
          </Link>
        )
      }}
    </resourceContext.Consumer>
  )

  render() {
    const {itemName, link, resourceName, description} = this.state
    return (
      <div className="create-item-bg-container">
        <Header />

        <div className="create-item-container">
          <div className="mobile-go-back">{this.goBackToHome()}</div>
          <img
            src="https://res.cloudinary.com/dyrfx9ekj/image/upload/v1668249935/image_9_wcamg3.png"
            alt="Create Item"
            className="create-item-image"
          />
          <div className="create-item-box-container">
            <div className="desktop-go-back">{this.goBackToHome()}</div>
            <form
              className="create-item-card-container"
              onSubmit={this.submitForm}
            >
              <h1 className="create-item-card-heading">Item Details</h1>
              <label htmlFor="itemName" className="label-name">
                ITEM NAME
              </label>
              <input
                type="text"
                id="itemName"
                onChange={this.onChangeItemName}
                value={itemName}
                className="input-field user-input"
              />
              <label htmlFor="link" className="label-name">
                LINK
              </label>
              <input
                type="url"
                id="link"
                onChange={this.onChangeUrl}
                value={link}
                className="input-field user-input"
              />
              <label htmlFor="resourceName" className="label-name">
                RESOURCE NAME
              </label>
              <input
                type="text"
                id="resourceName"
                onChange={this.onChangeResourceName}
                value={resourceName}
                className="input-field user-input"
              />
              <label htmlFor="description" className="label-name">
                DESCRIPTION
              </label>
              <textarea
                id="description"
                className="text-area-field user-input"
                onChange={this.onChangeDescription}
                name="description"
                rows="4"
                value={description}
              >
                Please write description...
              </textarea>
              <button className="create-button" type="submit">
                CREATE
              </button>
            </form>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CreateItem
