import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"
import PrivateRoute from './components/PrivateRoute'
import PrivateRouteAdmin from './components/PrivateRouteAdmin'
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
import StatisticsView from './pages/adminOnly/dashboard/components/StatisticsView'
import ReservationsView from './pages/adminOnly/dashboard/components/ReservationsView'
import BookMoviePage from './pages/bookMoviePage/index'
import MoviesPage from './pages/moviesPage/index'
import MyReservationsPage from './pages/MyReservationsPage/index'
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";
let socket = socketIOClient(ENDPOINT)

const App = () => {
  console.log("socket is ", socket)
  const handleSendMessage = (message) => {
    socket.emit("sendMsgToServer", {message: message});
  }
  socket.on("sendMsgToClient", (message) => {
    addResponseMessage(message.message.message)
  })
  return (
    <div>
    <Router>
     {/*  <div>
        <Link to="/">home</Link>
        <Link to="/login">login</Link>
        <Link to="/register">register</Link>
        <Link to="/admin/dashboard">admin dashboard</Link>
        <Link to="/user/dashboard">user dashboard</Link>
        <Link to="/homepage">home page</Link>
      </div> */}
      <Navbar />

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <PrivateRouteAdmin path="/admin/dashboard">
          <Dashboard>
            <MainView />
          </Dashboard>
        </PrivateRouteAdmin>
        <PrivateRouteAdmin path="/admin/cinemas">
          <Dashboard>
            <CinemasView />
          </Dashboard>
        </PrivateRouteAdmin>
        <PrivateRouteAdmin path="/admin/movies">
          <Dashboard>
            <MoviesView />
          </Dashboard>
        </PrivateRouteAdmin>
        <PrivateRouteAdmin path="/admin/screeningtimes">
          <Dashboard>
            <ScreeningTimesView />
          </Dashboard>
        </PrivateRouteAdmin>
        <PrivateRouteAdmin path="/admin/reservations">
          <Dashboard>
            <ReservationsView />
          </Dashboard>
        </PrivateRouteAdmin>
        <PrivateRouteAdmin path="/admin/statistics">
          <Dashboard>
            <StatisticsView />
          </Dashboard>
        </PrivateRouteAdmin>
        <PrivateRoute path="/user/dashboard" component={DashboardUser} />
        <PrivateRoute path="/user/reservations" component={MyReservationsPage} />
        <Route path="/movies" component={MoviesPage} />
        <PrivateRoute path="/movie/book/:id" component={BookMoviePage}>
        </PrivateRoute>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
    {/* Svugdje prikazi chat widget*/}
    <Widget
      title="Cinema Chat"
      subtitle="Chat with fellow users here! :)"
      senderPlaceHolder="Hey, do you have a movie recommendation for me?"
      handleNewUserMessage={handleSendMessage}
      profileAvatar="https://cdn2.iconfinder.com/data/icons/circular-icons-line/82/Circular_Person-512.png"
    />
    </div>
  )
}

export default App