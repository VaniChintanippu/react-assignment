import React from 'react'

const resourceContext = React.createContext({
  activeResource: 'RESOURCES',
  changeResource: () => {},
})

export default resourceContext
