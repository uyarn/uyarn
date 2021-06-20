import React from "react";
import Spin from "@/components/Spin";
import List from "./List";
import { getBlogList } from "@/apis";
import { useQuery } from "@apollo/client";

export default function Blogs() {
  const { loading, data } = useQuery(getBlogList);
  const blogList: Array<Record<string, string>> =
    data?.viewer?.repository?.issues?.edges || [];
  return loading ? <Spin /> : <List list={blogList} />;
}
