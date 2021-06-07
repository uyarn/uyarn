import { gql } from "@apollo/client";

export const GET_BLOG_LIST_FROM_GITHUB = gql`
  query {
    viewer {
      repository(name: "uyarn") {
        issues(last: 20) {
          edges {
            node {
              id
              title
              number
              createdAt
            }
          }
        }
      }
    }
  }
`;
