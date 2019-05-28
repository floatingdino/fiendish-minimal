import { h, Component } from "preact";
import { Router } from "preact-router";

import getDataFromResponse from "./functions/getDataFromResponse";

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
  fetchNextPage(route = this.state.page.Pagination.NextPage) {
    return fetch(route)
      .then(resp => resp.text())
      .then(resp => {
        return getDataFromResponse(resp);
      });
  }
  loadNextPage(route = this.state.page.Pagination.NextPage) {
    return this.fetchNextPage(route).then(data => {
      if (this.state.page.type === "index") {
        this.setState({
          Posts: [...this.state.Posts, ...data.Posts],
          page: {
            ...data.page
          }
        });
      }
    });
  }
  handleRoute(e) {
    if (this.state.Post && /post/.test(e.url)) {
      this.setState({
        Post: null
      });
    }
    if (this.state && e.url === "/" && this.state.Posts.length <= 0) {
      this.loadNextPage("/");
    }
  }
  render(props, state) {
    return (
      <div class={`wrapper ${state.page.type}`}>
        <Header {...props.blog} />
        <Router onChange={e => this.handleRoute(e)}>
          <Home
            loadNextPage={() => this.loadNextPage()}
            Pagination={() => state.page.Pagination}
            path="/"
            Posts={state.Posts}
            setPageType={type => this.setPageType(type)}
          />
          <Home
            loadNextPage={() => this.loadNextPage()}
            Pagination={() => state.page.Pagination}
            path="/tagged/:Tag"
            Posts={state.Posts}
            setPageType={type => this.setPageType(type)}
          />
          <Single
            path="/post/:PostID?/:PostSlug?"
            Posts={() => state.Posts}
            Post={state.Post}
            setPageType={type => this.setPageType(type)}
          />
          <Single
            path="/ask"
            Post={state.Post}
            setPageType={type => this.setPageType(type)}
          />
          <Single
            path="/submit"
            Post={state.Post}
            setPageType={type => this.setPageType(type)}
          />
        </Router>
        {props.blog.ThemeAttribution && (
          <div class="theme-author">
            Theme by{" "}
            <a
              href="https://samhaakman.com"
              rel="nofollow noopener"
              target="_blank">
              Sam
            </a>
          </div>
        )}
      </div>
    );
  }
}
