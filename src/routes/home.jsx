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

    // Less aggressive infinite scroll when on "Data Saver" mode
    this.triggerDistance =
      "connection" in navigator && navigator.connection.saveData
        ? "0px"
        : "500px";
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

    // If the images are already cached / first page contains text posts only they can be loaded before this component mounts
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
    // Cleanup
    this.observer.disconnect();
    this.observer = null;
    this.Masonry.destroy();
  }
  componentDidUpdate(prevProps) {
    // If you load up from a permalink and then go back to the homepage, this will trigger the infinite scroll "prefill"
    if (
      prevProps.Posts.length <= 0 &&
      this.props.Posts.length > 0 &&
      this.lastRatio > 0 &&
      !this.state.fetching
    ) {
      this.runLoadNext();
    }
  }
  setupInfiniteScroll() {
    // Super simple hand-rolled infinite scroll using IntersectionObserver
    this.observer = new IntersectionObserver(
      entries => this.infiniteScrollCallback(entries),
      {
        rootMargin: this.triggerDistance
      }
    );
    this.observer.observe(this.trigger);
  }
  infiniteScrollCallback(entries) {
    // Keep track of the ratio as this callback only triggers when the element enters or leaves the screen
    this.lastRatio = entries[0].intersectionRatio;
    requestIdleCallback(() => {
      if (
        entries[0].intersectionRatio > 0 &&
        !this.state.fetching &&
        this.props.Pagination() &&
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
      console.log("fetched next page");
      this.setState({
        fetching: false
      });
      // Will keep grabbing pages until the observer threshold is passed
      if (this.lastRatio >= 1 && this.props.Pagination().NextPage) {
        requestIdleCallback(() => {
          this.runLoadNext();
        });
      }
    });
  }
  loadPost() {
    // Triggered by child components when they're considered "loaded"
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
        {state.fetching ||
          (state.loaded < props.Posts.length && (
            <div class="loader">
              <img
                alt="Loading."
                src="https://static.tumblr.com/ii7qpmy/Q11nihd1m/loading.gif"
              />
            </div>
          ))}
      </main>
    );
  }
}
