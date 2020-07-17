// 3rd party imports
import * as React from 'react'
import { CircularProgress } from '@material-ui/core'

// My imports
import { useDelayedRender } from '../../hooks/useDelayedRender'

interface DelayOptions {
  delay: number
  children: any
}

const DelayedRender = ({ delay, children }: DelayOptions) =>
  useDelayedRender(delay)(() => children)

const Loading = ({ size = 60 }) => {
  return (
    // delay the loading spinner by 500 milliseconds
    <DelayedRender delay={500}>
      <CircularProgress size={size} color='primary' />
    </DelayedRender>
  )
}

export default Loading

// STYLING
