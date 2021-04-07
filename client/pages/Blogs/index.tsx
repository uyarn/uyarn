import React from "react";
import axios from "axios";
import "./index.scss";
import { Link } from "react-router-dom";
import { WaitList } from "@/components";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: "",
      getList: false,
    };
  }
  componentDidMount() {
    let list = "";
    let that = this;
    axios
      .get("article/articleList.php")
      .then((res) => {
        list = res.data.map((data) => (
          <div className="yarn_li" key={data.id}>
            <span>{data.time}</span>
            <Link to={"/article/" + data.id}>{data.title}</Link>
          </div>
        ));
        that.setState({
          list: list,
          getList: true,
        });
      })
      .catch(function (err) {});
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  render() {
    // const wait = this.state.getList ? (
    //   <div className="yarn_list">{this.state.list}</div>
    // ) : (

    // );
    return (
      <div className="blog">
        <h3>列表</h3>
        <WaitList />
      </div>
    );
  }
}

export default Blog;
