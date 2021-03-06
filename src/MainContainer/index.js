import React from 'react';
import './MainContainer.scss';
import { Route, Switch } from 'react-router-dom';
import Ratio from '../Ratio';
import ValidInvalid from '../ValidInvalid';
import Home from '../Home';

const MainContainer = props => (
  <div className="main-container">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/valid-invalid" component={ValidInvalid} />
      <Route exact path="/ratio" component={Ratio} />
    </Switch>
  </div>
);

export default MainContainer;
