import { h, Component } from "preact";
import { Router } from "preact-router";

import getDataFromResponse from "functions/getDataFromResponse";

import Header from "components/header";
import Home from "routes/home";
import Single from "routes/single";

export default class Tumblog extends Component {
  constructor(props) {
    super();
    this.state = {
      page: props.page,
      Posts: props.Posts || [],
      Post: props.Post || null
    };
    this.currentURL = null;
    this.lastIndex = null;
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

  checkIndexPage(url) {
    return /^\/$|^\/tagged\/\w+|^\/search/.test(url);
  }

  handleRoute(e) {
    // Post data storage should probably go out to state management to avoid this messiness, but it seems overkill for such a small app
    // "Unmount" events don't trigger if the router moves between two routes using the same component, so those actions need to be triggered separately
    if (this.state.Post && this.currentURL != e.url) {
      this.setState({
        Post: null
      });
    }
    if (
      (this.lastIndex || this.state.Posts.length <= 0) &&
      e.url !== this.lastIndex &&
      this.checkIndexPage(e.url)
    ) {
      this.setState({
        Posts: []
      });
      this.loadNextPage(e.url);
    }
    if (this.checkIndexPage(e.url)) {
      this.lastIndex = e.url;
    }
    this.currentURL = e.url;
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
            Post={state.Post}
            Posts={() => state.Posts}
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
