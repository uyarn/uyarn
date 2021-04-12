import { GITHUB_ACCESS_TOKEN, GITHUB_BASE_URL } from "../consts";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: GITHUB_BASE_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: `bearer ${GITHUB_ACCESS_TOKEN}`,
  },
});

export default client;
