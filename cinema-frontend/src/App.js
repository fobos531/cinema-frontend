import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom"
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/adminOnly/dashboard/index'

const App = () => {
  return (
    <div>
    <Router>
      <div>
        <Link to="/">home</Link>
        <Link to="/login">login</Link>
        <Link to="/register">register</Link>
        <Link to="/admin/dashboard">admin dashboard</Link>
      </div>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/admin/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
    </div>
  )
}

export default App