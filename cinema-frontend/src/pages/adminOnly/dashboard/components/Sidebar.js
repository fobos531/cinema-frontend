import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TheatersIcon from '@material-ui/icons/Theaters';
import MovieIcon from '@material-ui/icons/Movie';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import TimerIcon from '@material-ui/icons/Timer';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PersonIcon from '@material-ui/icons/Person';

export const mainListItems = (
  <div>
    <ListItem
      button
      component={Link}
      to="/admin/dashboard"
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to="/admin/cinemas"
    >
      <ListItemIcon>
        <TheatersIcon />
      </ListItemIcon>
      <ListItemText primary="Cinemas" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to="/admin/movies"
    >
      <ListItemIcon>
        <MovieIcon />
      </ListItemIcon>
      <ListItemText primary="Movies" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to="/admin/screeningtimes"
    >
      <ListItemIcon>
        <TimerIcon />
      </ListItemIcon>
      <ListItemText primary="Screening times" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to="/admin/reservations"
    >
      <ListItemIcon>
        <EventSeatIcon />
      </ListItemIcon>
      <ListItemText primary="Reservations" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to="/admin/statistics"
    >
      <ListItemIcon>
        <EqualizerIcon />
      </ListItemIcon>
      <ListItemText primary="Statistics" />
    </ListItem>
  </div>
);

