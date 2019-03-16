import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Ratio from '../Ratio';
import './MainContainer.scss';
const MainContainer = props => (
  <div className="main-container">
    <Switch>
      <Route exact path="/ratio" component={Ratio} />
    </Switch>
  </div>
);

export default MainContainer;
