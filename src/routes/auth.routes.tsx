import React from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "../pages/SingIn";

const AuthRoutes: React.FC = () => (
  <Switch>
    <Route component={SignIn} />
  </Switch>
);

export default AuthRoutes;