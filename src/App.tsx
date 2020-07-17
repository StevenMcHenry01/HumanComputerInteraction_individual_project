// third party imports
import * as React from 'react'
import styled from 'styled-components'

// my imports
import TopLayout from './components/wrappers/TopLayout'
import { Routes } from './Routes'

function App() {
  // ~ COMPONENT
  return (
    <TopLayout>
      <div style={{ width: '100%' }}>
        <MainContentContainerStyled>
          <Routes />
        </MainContentContainerStyled>
      </div>
    </TopLayout>
  )
}

export default App

// STYLING
const MainContentContainerStyled = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 2rem 1rem;
`
