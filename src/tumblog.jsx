import { h, Component } from "preact";
import Router from "preact-router";

import Header from "./header";
import Home from "./routes/home";
import Single from "./routes/single";

export default class Tumblog extends Component {
  constructor(props) {
    super();
    this.state = {
      page: props.page,
      Posts: props.Posts || [],
      Post: props.Post || null
    };
  }
  componentWillMount() {
    document.title = this.props.blog.Title;
  }
  setPageType(type) {
    this.setState({
      page: {
        ...this.state.page,
        type
      }
    });
  }
  sanitiseJSON(node) {
    return node.innerHTML
      .replace("var data =", "")
      .replace(/'/g, '"')
      .replace(/\\x/g, "%")
      .replace(/,[ \r\n]*]/gs, "]")
      .replace(/,[ \r\n]*}/gs, "}")
      .replace(/\\?[\r\n]+/g, " ")
      .replace(/ +/g, " ");
  }
  fetchNextPage() {
    return fetch(this.state.page.Pagination.NextPage)
      .then(resp => resp.text())
      .then(resp => {
        this.setState({
          fetching: false
        });
        const parser = new DOMParser();
        const doc = parser.parseFromString(resp, "text/html");
        return JSON.parse(this.sanitiseJSON(doc.getElementById("data")));
      });
  }
  loadNextPage() {
    return this.fetchNextPage().then(data => {
      this.setState({
        Posts: [...this.state.Posts, ...data.Posts],
        page: {
          ...this.state.page,
          ...data.page
        }
      });
    });
  }
  render(props, state) {
    return (
      <div class={`wrapper ${state.page.type}`}>
        <Header {...props.blog} />
        <Router onChange={this.handleRoute}>
          <Home
            loadNextPage={() => this.loadNextPage()}
            Pagination={() => state.page.Pagination}
            path="/"
            Posts={state.Posts}
            setPageType={type => this.setPageType(type)}
          />
          <Single
            path="/post/:PostID?/:PostSlug?"
            Posts={() => state.Posts}
            Post={state.Post}
            setPageType={type => this.setPageType(type)}
          />
        </Router>
      </div>
    );
  }
}
