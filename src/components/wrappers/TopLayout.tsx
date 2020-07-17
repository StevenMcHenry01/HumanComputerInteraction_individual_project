import * as React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import styled from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import '../../styles/standardInject.scss'

const TopLayout: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppWrapper>{children}</AppWrapper>
    </BrowserRouter>
  )
}

// STYLING
const AppWrapper = styled.div``

export default TopLayout
