import { gql } from "@apollo/client";

export const GET_BLOG_LIST_FROM_GITHUB = gql`
  query {
    viewer {
      repository(name: "blogs") {
        issues(first: 10) {
          edges {
            node {
              id
              title
              number
            }
          }
        }
      }
    }
  }
`;
