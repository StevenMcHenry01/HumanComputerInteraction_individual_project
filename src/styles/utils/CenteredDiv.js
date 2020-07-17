// 3rd party imports
import React from 'react'
import styled from 'styled-components'

export const CenteredDiv = ({ children }) => <DivStyled>{children}</DivStyled>

// STYLING
const DivStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
`
