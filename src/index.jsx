import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import fetchMock from "fetch-mock";

import App from "./App";
// import setUpGlobalMock from "./setUpGlobalMock";
import reducers from "./reducers";
import fetchResponse from "./mocks/fetchResponse";

const title = "Didomi's challenge";

fetchMock.get("http://mock.url/consents", fetchResponse);

fetchMock.post("http://mock.url/consent", {}, {
  delay: 200,
});

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <Router>
      <App title={title} />
    </Router>
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById("app"),
);

module.hot.accept();
