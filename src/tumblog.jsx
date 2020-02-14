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
      .then(resp => {
        if (!resp.ok) {
          throw Error(resp.statusText);
        }
        return resp.text();
      })
      .then(resp => {
        return getDataFromResponse(resp);
      })
      .catch(e => {
        console.warn("Couldn't fetch the next page - are you in preview mode?");
      });
  }

  loadNextPage(route = this.state.page.Pagination.NextPage) {
    if (this.state.preview) {
      return;
    }
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
    if (/customize_preview_receiver/.test(e.url)) {
      this.setState({
        preview: true,
        Posts: this.unescapePosts(this.state.Posts)
      });
    }
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

  unescapePosts(posts) {
    posts.map(post => {
      Object.keys(post).forEach(key => {
        if (typeof post[key] === "string") {
          post[key] = this.unserializeData(post[key]);
        }
      });
    });

    return posts;
  }

  unserializeData(str) {
    var element = document.createElement("div");
    if (str && typeof str === "string") {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = "";
    }

    return str;
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
          <Home
            loadNextPage={() => this.loadNextPage()}
            Pagination={() => state.page.Pagination}
            path="/customize_preview_receiver.html"
            Posts={state.Posts}
            setPageType={type => this.setPageType(type)}
          />
          <Home
            loadNextPage={() => this.loadNextPage()}
            Pagination={() => state.page.Pagination}
            path="/search"
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
        {state.preview && (
          <div class="theme-error">Can't fetch next page in preview</div>
        )}
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
