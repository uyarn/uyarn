import React from "react";
import axios from "axios";
import renderHTML from "react-render-html";
import "./index.scss";

interface IArticleProps {
  match: any;
}
interface IArticleState {
  id: number;
  article: string;
}
class Article extends React.Component<IArticleProps, IArticleState> {
  constructor(props) {
    super(props);
    this.state = {
      article: "",
      id: this.props.match.params.id,
    };
  }
  componentDidMount() {
    let article = "";
    let that = this;
    axios
      .get("article/article.php", {
        params: {
          id: this.state.id,
        },
      })
      .then(function (res) {
        article = res.data.map((data) => (
          <div key={1}>
            <h3>{data.title} </h3>
            <h5>{data.time} </h5>
            {renderHTML(data.content.replace(/\r\n/g, "<br>"))}
          </div>
        ));
        that.setState({
          article: article,
        });
      })
      .catch(function (err) {});
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.article != this.state.article ? true : false;
  }
  render() {
    return <div className="article">{this.state.article}</div>;
  }
}

export default Article;
