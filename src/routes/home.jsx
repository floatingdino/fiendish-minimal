/* eslint-disable quotes */
import { h, Component } from "preact";

import Masonry from "masonry-layout";

import Post from "../posts/post";

export default class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      loaded: 0,
      initialLoaded: false,
      Pagination: props.Pagination,
      fetching: false
    };
    this.initialPosts = props.Posts.length;
    this.triggerDistance = "500px";
  }
  componentWillMount() {
    this.props.setPageType("index");
  }
  componentDidMount() {
    this.Masonry = new Masonry(this.grid, {
      columnWidth: "article.sizer",
      itemSelector: "article:not(.sizer)",
      percentPosition: true,
      initLayout: false,
      transitionDuration: 0
    });
    this.setupInfiniteScroll();
    if (this.state.loaded >= this.initialPosts) {
      requestAnimationFrame(() => {
        this.Masonry.layout();
        this.setState({
          initialLoaded: true
        });
      });
    }
  }
  componentWillUnmount() {
    this.observer.disconnect();
    this.observer = null;
    this.Masonry.destroy();
  }
  fetchPosts() {
    fetch(this.props.url)
      .then(resp => resp.text())
      .then(resp => {
        const data = getDataFromResponse(resp);
        this.setState({
          Posts: data.Posts
        });
      });
  }
  setupInfiniteScroll() {
    this.observer = new IntersectionObserver(
      entries => this.infiniteScrollCallback(entries),
      {
        rootMargin: this.triggerDistance
      }
    );
    this.observer.observe(this.trigger);
  }
  infiniteScrollCallback(entries) {
    this.lastRatio = entries[0].intersectionRatio;
    requestIdleCallback(() => {
      if (
        entries[0].intersectionRatio > 0 &&
        !this.state.fetching &&
        this.props.Pagination().NextPage
      ) {
        this.runLoadNext();
      }
    });
  }
  runLoadNext() {
    this.setState({
      fetching: true
    });
    this.props.loadNextPage().then(() => {
      this.setState({
        fetching: false
      });
      if (this.lastRatio >= 1 && this.props.Pagination().NextPage) {
        requestIdleCallback(() => {
          this.runLoadNext();
        });
      }
    });
  }
  loadPost() {
    this.setState({
      loaded: this.state.loaded + 1,
      initialLoaded: this.Masonry && this.state.loaded + 1 >= this.initialPosts
    });
    if (this.state.initialLoaded && this.Masonry) {
      this.Masonry.layout();
    }
  }
  render(props, state) {
    return (
      <main id="content" ref={grid => (this.grid = grid)}>
        {props.Posts.map(post => (
          <Post
            {...post}
            key={post.Permalink}
            loadPost={() => this.loadPost()}
            Masonry={() => this.Masonry}
          />
        ))}
        <article class="sizer" />
        <div class="page-trigger" ref={trigger => (this.trigger = trigger)} />
        {state.fetching && (
          <div class="loader">
            <img
              alt="Loading."
              src="https://static.tumblr.com/ii7qpmy/Q11nihd1m/loading.gif"
            />
          </div>
        )}
      </main>
    );
  }
}
