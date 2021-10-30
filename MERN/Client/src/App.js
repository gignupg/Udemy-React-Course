import React from 'react';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import AppLayout from './components/layout/AppLayout';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import AuthState from './context/auth/authState';
import ProjectState from './context/projects/ProjectState';
import TaskState from './context/tasks/TaskState';
import tokenInHeader from './config/tokenInHeader';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[900]
    }
  }
});

const token = localStorage.getItem('token');
if (token) {
  tokenInHeader(token);
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthState>
        <ProjectState>
          <TaskState>
            <Router>
              <Switch>
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/registration" component={Registration} />
                <PrivateRoute path="/" component={AppLayout} />
              </Switch>
            </Router>
          </TaskState>
        </ProjectState>
      </AuthState>
    </ThemeProvider>
  );
}

export default App;
