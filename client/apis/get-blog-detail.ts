import { gql } from "@apollo/client";

export const getBlogDetail = (issueId: number) => {
  return gql`query {
        viewer {
          repository(name: "uyarn") {
            issue1: issue(number: ${issueId}) {
              title
              createdAt
              body
            }
          }
        }
      }
  `;
}
