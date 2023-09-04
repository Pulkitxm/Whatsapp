import React from 'react'

import LeftSidebar from '../components/LeftSidebar'
import RightMain from '../components/RighMain'
import './Main.css'

const Main = ({logout}) =>{
    
  return (
      <div className='main' >
        <LeftSidebar logout={logout} />
        <RightMain/>
      </div>
  )
}

export default Main