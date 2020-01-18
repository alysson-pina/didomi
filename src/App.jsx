import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core";

// import LeftNav from "./src/components/LeftNav";
import GiveConsent from "./views/GiveConsent";
import NotFound from "./views/NotFound";
import Consents from "./views/Consents";

// import "./App.scss";

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/give-consent" />
        </Route>
        <Route exact path="/consents" component={Consents} />
        <Route exact path="/give-consent" component={GiveConsent} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
}));
