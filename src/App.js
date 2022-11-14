import {Route, Routes, Navigate} from 'react-router-dom'

import {Component} from 'react'
import Home from './components/Home'
import CreateItem from './components/createItem'
import NotFound from './components/NotFound'

import resourceContext from './Context/resourceContext'
import './App.css'

class App extends Component {
  state = {
    activeResource: 'RESOURCES',
  }

  changeResource = activeResource => {
    this.setState({activeResource})
  }

  render() {
    const {activeResource} = this.state

    return (
      <resourceContext.Provider
        value={{activeResource, changeResource: this.changeResource}}
      >
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-item" element={<CreateItem />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </>
      </resourceContext.Provider>
    )
  }
}

export default App
