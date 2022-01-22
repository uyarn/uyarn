import { PT, GITHUB_BASE_URL } from "../consts";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: GITHUB_BASE_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: `bearer ${PT}`,
  },
});

export default client;
