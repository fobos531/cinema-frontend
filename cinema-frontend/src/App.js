import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/adminOnly/dashboard/index'
import DashboardUser from './pages/dashboardUser/index'
import Navbar from './pages/layout/Navbar'
import CinemasView from './pages/adminOnly/dashboard/components/CinemasView'
import MainView from './pages/adminOnly/dashboard/components/MainView'
import MoviesView from './pages/adminOnly/dashboard/components/MoviesView'
import HomePage from './pages/homePage/HomePage'
import ScreeningTimesView from './pages/adminOnly/dashboard/components/ScreeningTimesView'
import ReservationsView from './pages/adminOnly/dashboard/components/ReservationsView'
import BookMoviePage from './pages/bookMoviePage/index'

const App = () => {
  return (
    <div>
    <Router>
      <div>
        <Link to="/">home</Link>
        <Link to="/login">login</Link>
        <Link to="/register">register</Link>
        <Link to="/admin/dashboard">admin dashboard</Link>
        <Link to="/user/dashboard">user dashboard</Link>
        <Link to="/homepage">home page</Link>
      </div>
      <Navbar />

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/admin/dashboard">
          <Dashboard>
            <MainView />
          </Dashboard>
        </Route>
        <Route path="/admin/cinemas">
          <Dashboard>
            <CinemasView />
          </Dashboard>
        </Route>
        <Route path="/admin/movies">
          <Dashboard>
            <MoviesView />
          </Dashboard>
        </Route>
        <Route path="/admin/screeningtimes">
          <Dashboard>
            <ScreeningTimesView />
          </Dashboard>
        </Route>
        <Route path="/admin/reservations">
          <Dashboard>
            <ReservationsView />
          </Dashboard>
        </Route>
        <Route path="/user/dashboard">
          <DashboardUser />
        </Route>
        <Route path="/homepage">
          <HomePage />
        </Route>
        <Route path="/movie/book/:id" component={BookMoviePage}>
        </Route>
      </Switch>
    </Router>
    </div>
  )
}

export default App