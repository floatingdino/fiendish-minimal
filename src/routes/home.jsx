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
    this.triggerDistance = "0px";
  }
  componentDidMount() {
    this.Masonry = new Masonry(this.grid, {
      columnWidth: "article.sizer",
      itemSelector: "article:not(.sizer)",
      percentPosition: true,
      initLayout: false,
      transitionDuration: 0
    });
  }
  componentWillUnmount() {
    this.observer.disconnect();
    this.observer = null;
    this.Masonry.destroy();
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
    requestIdleCallback(() => {
      if (
        entries[0].intersectionRatio > 0 &&
        !this.state.fetching &&
        this.props.Pagination().NextPage
      ) {
        this.setState({
          fetching: true
        });
        this.props.loadNextPage().then(() => {
          this.setState({
            fetching: false
          });
        });
      }
    });
  }
  loadPost() {
    this.setState({
      loaded: this.state.loaded + 1,
      initialLoaded: this.state.loaded + 1 >= this.initialPosts
    });
    if (this.state.initialLoaded) {
      this.Masonry.layout();
      this.setupInfiniteScroll();
    }
  }
  render(props) {
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
      </main>
    );
  }
}
