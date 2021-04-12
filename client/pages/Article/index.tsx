import React from "react";
import ReactMarkdown from "react-markdown";
import { useQuery, gql } from "@apollo/client";

import "./index.scss";

interface IArticleProps {
  match: any;
}

function Article(props: IArticleProps) {
  const issueId = props?.match?.params?.id;

  const graphql = gql`
    query {
      viewer {
        repository(name: "blogs") {
          issue1: issue(number: ${issueId}) {
            title
            createdAt
            body
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(graphql);
  return (
    <div className="article">
      <ReactMarkdown>{data?.viewer?.repository?.issue1?.body}</ReactMarkdown>
    </div>
  );
}
export default Article;
