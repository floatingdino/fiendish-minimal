import { h, Component, render } from "preact";

import Masonry from "masonry-layout";

import Post from "../post";

export default class Home extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.Masonry = new Masonry(this.grid, {
      columnWidth: "article.sizer",
      itemSelector: "article",
      percentPosition: true,
      initLayout: false
    });
  }
  render(props, state) {
    return (
      <main id="content" ref={grid => (this.grid = grid)}>
        {props.Posts.map(post => (
          <Post {...post} Masonry={() => this.Masonry} />
        ))}
        <article class="sizer" />
      </main>
    );
  }
}
