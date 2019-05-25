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
      Posts: props.Posts,
      Pagination: props.Pagination
    };
    this.initialPosts = props.Posts.length;
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
  fetchPosts() {
    fetch(this.state.Pagination.NextPage)
      .then(resp => resp.text())
      .then(resp => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(resp, "text/html");
        const data = JSON.parse(this.sanitiseJSON(doc.getElementById("data")));
        console.log(data);
      });
  }
  componentDidMount() {
    this.Masonry = new Masonry(this.grid, {
      columnWidth: "article.sizer",
      itemSelector: "article",
      percentPosition: true,
      initLayout: false
    });
    this.fetchPosts();
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
        class={state.initialLoaded && "loaded"}
        id="content"
        ref={grid => (this.grid = grid)}>
        {state.Posts.map(post => (
          <Post
            {...post}
            key={post.Permalink}
            loadPost={() => this.loadPost()}
            Masonry={() => this.Masonry}
          />
        ))}
        <article class="sizer" />
      </main>
    );
  }
}
