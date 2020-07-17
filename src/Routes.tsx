import * as React from 'react'
import { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import Loading from './components/utils/Loading'
import { CenteredDiv } from './styles/utils/CenteredDiv'
import OtherPage from './pages/OtherPage'

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'))
const DoesNotExist = lazy(() => import('./pages/404'))

export const Routes = () => (
  <>
    <Suspense
      fallback={
        <CenteredDiv>
          <Loading />
        </CenteredDiv>
      }
    >
      <Switch>
        <Route exact={true} path='/'>
          <Home />
        </Route>
        <Route exact={true} path='/otherPage'>
          <OtherPage />
        </Route>

        {/* 404 route */}
        <Route>
          <DoesNotExist />
        </Route>
      </Switch>
    </Suspense>
  </>
)
