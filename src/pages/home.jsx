import { h, Component, render } from "preact";

import Masonry from "masonry-layout";

import Post from "../posts/post";

export default class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      loaded: 0,
      initialLoaded: false,
      Posts: props.Posts
    };
    this.initialPosts = props.Posts.length;
  }
  componentDidMount() {
    this.Masonry = new Masonry(this.grid, {
      columnWidth: "article.sizer",
      itemSelector: "article",
      percentPosition: true,
      initLayout: false
    });
  }
  loadPost() {
    this.setState({
      loaded: this.state.loaded + 1,
      initialLoaded: this.state.loaded + 1 >= this.initialPosts
    });
    if (this.state.initialLoaded) {
      this.Masonry.layout();
    }
  }
  render(props, state) {
    return (
      <main
        id="content"
        ref={grid => (this.grid = grid)}
        class={state.initialLoaded ? "loaded" : ""}>
        {state.Posts.map(post => (
          <Post
            {...post}
            Masonry={() => this.Masonry}
            loadPost={() => this.loadPost()}
          />
        ))}
        <article class="sizer" />
      </main>
    );
  }
}
