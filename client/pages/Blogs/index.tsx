import React from "react";
import Spin from "@/components/Spin";
import List from "./List";
import { GET_BLOG_LIST_FROM_GITHUB } from "@/apis";
import { useQuery } from "@apollo/client";

function Blog() {
  const { loading, data } = useQuery(GET_BLOG_LIST_FROM_GITHUB);
  const blogList: Array<Record<string, string>> =
    data?.viewer?.repository?.issues?.edges || [];
  return loading ? <Spin /> : <List list={blogList} />;
}
export default Blog;
