import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"
import PrivateRoute from './components/PrivateRoute'
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
import MoviesPage from './pages/moviesPage/index'
import MyReservationsPage from './pages/MyReservationsPage/index'


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
        {/* <Route path="/admin/dashboard">
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
        </Route> */}
       {/*  <Route path="/admin/screeningtimes">
          <Dashboard>
            <ScreeningTimesView />
          </Dashboard>
        </Route> */}
       {/*  <Route path="/admin/reservations">
          <Dashboard>
            <ReservationsView />
          </Dashboard>
        </Route>
        <Route path="/user/dashboard">
          <DashboardUser />
        </Route> */}
        <PrivateRoute path="/admin/dashboard">
          <Dashboard>
            <MainView />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute path="/admin/cinemas">
          <Dashboard>
            <CinemasView />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute path="/admin/movies">
          <Dashboard>
            <MoviesView />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute path="/admin/screeningtimes">
          <Dashboard>
            <ScreeningTimesView />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute path="/admin/reservations">
          <Dashboard>
            <ReservationsView />
          </Dashboard>
        </PrivateRoute>
        <PrivateRoute path="/user/dashboard" component={DashboardUser} />
        <PrivateRoute path="/user/reservations" component={MyReservationsPage} />
        <PrivateRoute path="/movies" component={MoviesPage} />
        {/* <Route path="/movies">
          <MoviesPage />
        </Route> */}
        <Route path="/movie/book/:id" component={BookMoviePage}>
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
    </div>
  )
}

export default App