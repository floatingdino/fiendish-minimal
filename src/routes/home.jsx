import { h, Component } from "preact";

import Masonry from "masonry-layout";

import Post from "components/post";

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
    this.Masonry = false;

    // Wait this long for idle callbacks
    this.maxNotIdle = 750;

    // Less aggressive infinite scroll if the user has "Data Saver" turned on
    this.triggerDistance =
      "connection" in navigator && navigator.connection.saveData
        ? "0px"
        : "500px";
  }

  componentWillMount() {
    this.props.setPageType("index");
  }

  componentDidMount() {
    if (this.props.Posts.length > 0) {
      this.setupGrid();
    }

    // If the images are already cached / first page contains no "loadable" components they can be loaded before this component mounts
    if (this.props.Posts.length > 0 && this.state.loaded >= this.initialPosts) {
      requestAnimationFrame(() => {
        this.Masonry.layout();
        this.Masonry.once("layoutComplete", () => {
          this.setState({
            initialLoaded: true
          });
        });
      });
    }
  }

  componentWillUnmount() {
    this.cleanupGrid();
  }

  componentDidUpdate(prevProps) {
    // If you load up from a permalink and then go back to the homepage, this will trigger the infinite scroll "prefill"
    if (
      prevProps.Posts.length <= 0 &&
      this.props.Posts.length > 0 &&
      this.paginationTriggerInRange &&
      !this.state.fetching
    ) {
      this.runLoadNext();
    }
    if (this.props.Posts.length > 0 && prevProps.Posts.length <= 0) {
      this.setupGrid();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.Posts.length > 0 && nextProps.Posts.length <= 0) {
      this.cleanupGrid();
    }
    if (this.props.Posts.length <= 0 && nextProps.Posts.length > 0) {
      this.initialPosts = nextProps.Posts.length;
      this.setupGrid();
    }
  }

  setupGrid() {
    if (!this.Masonry && this.props.Posts && this.props.Posts.length > 0) {
      // Masonry kinda freaks out if you try and set it up with no elements to layout, so I let the first page of elements
      this.Masonry = new Masonry(this.grid, {
        columnWidth: "article.sizer",
        itemSelector: "article:not(.sizer)",
        stamp: ".tag-header",
        percentPosition: true,
        initLayout: false,
        transitionDuration: 0
      });
      this.Masonry.once("layoutComplete", () => {
        // Trigger a re-render once Masonry is setup
        this.setState({});
      });
      this.setupInfiniteScroll();
    }
  }

  cleanupGrid() {
    this.setState({
      loaded: 0,
      initialLoaded: false,
      Pagination: this.props.Pagination,
      fetching: false
    });

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.Masonry) {
      this.Masonry.destroy();
      this.Masonry = null;
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

  infiniteScrollCallback(entries = null) {
    // Keep track of the ratio as this callback only triggers when the element enters or leaves the screen
    this.paginationTriggerInRange = entries
      ? entries[0].intersectionRatio > 0
      : this.paginationTriggerInRange;

    if (
      this.paginationTriggerInRange &&
      !this.state.fetching &&
      (this.props.Pagination() && this.props.Pagination().NextPage) &&
      this.state.initialLoaded
    ) {
      if (!!window.requestIdleCallback) {
        requestIdleCallback(
          () => {
            this.runLoadNext();
          },
          { timeout: this.maxNotIdle }
        );
      } else {
        this.runLoadNext();
      }
    } else if (
      this.paginationTriggerInRange &&
      (this.props.Pagination() && this.props.Pagination().NextPage)
    ) {
      setTimeout(() => {
        this.infiniteScrollCallback();
      }, this.maxNotIdle);
    }
  }

  runLoadNext() {
    this.setState({
      fetching: true
    });
    this.props.loadNextPage().then(() => {
      this.setState({
        fetching: false
      });
      // Will keep grabbing pages until the observer threshold is passed ("Prefill")
      if (this.paginationTriggerInRange && this.props.Pagination().NextPage) {
        if (!!window.requestIdleCallback) {
          requestIdleCallback(
            () => {
              this.runLoadNext();
            },
            { timeout: this.maxNotIdle }
          );
        } else {
          this.runLoadNext();
        }
      }
    });
  }

  loadPost() {
    // Triggered by child components when they're considered "loaded"
    if (this.state.loaded + 1 >= this.initialPosts && this.Masonry) {
      this.Masonry.layout();
    }
    this.setState({
      loaded: this.state.loaded + 1,
      initialLoaded:
        !!this.Masonry && this.state.loaded + 1 >= this.initialPosts
    });
  }

  render(props, state) {
    return (
      <main
        class={state.initialLoaded && "loaded"}
        id="content"
        ref={grid => (this.grid = grid)}>
        {props.Tag && (
          <h2 class="tag-header">
            /tagged/<span class={props.Tag}>{props.Tag}</span>
          </h2>
        )}
        {props.Posts.map(post => (
          <Post
            {...post}
            key={post.Permalink}
            loadPost={() => this.loadPost()}
            Masonry={() => state.initialLoaded && this.Masonry}
          />
        ))}
        <article class="sizer" />
        {!window.IntersectionObserver &&
          !this.state.fetching &&
          (this.props.Pagination() && this.props.Pagination().NextPage) &&
          this.state.initialLoaded && (
            <button class="load-more" onClick={() => this.runLoadNext()}>
              Load More
            </button>
          )}

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
