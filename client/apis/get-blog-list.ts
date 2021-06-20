import { gql } from "@apollo/client";

export const getBlogList = gql`
  query {
    viewer {
      repository(name: "uyarn") {
        issues(first: 20) {
          edges {
            node {
              id
              title
              number
              createdAt
              labels(first: 10) {
                nodes {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  }
`;
