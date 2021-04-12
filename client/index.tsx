import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./layouts/App";
import { HashRouter } from "react-router-dom";
import store from "./redux/store";
import { ApolloProvider } from "@apollo/client/react";
import client from "./graphql/http";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("app")
);
