import { h, Component } from "preact";
import Router from "preact-router";

import Header from "./header";
import Home from "./pages/home";
import Single from "./pages/single";

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
  render(props, state) {
    return (
      <div class={`wrapper ${state.page.type}`}>
        <Header {...props.blog} />
        <Router onChange={this.handleRoute}>
          <Home
            Posts={state.Posts}
            Pagination={props.page.Pagination}
            path="/"
            setPageType={type => this.setPageType(type)}
          />
          <Single
            path="/post/:PostID?/:PostSlug?"
            Posts={state.Posts}
            Post={state.Post}
            setPageType={type => this.setPageType(type)}
          />
        </Router>
      </div>
    );
  }
}
