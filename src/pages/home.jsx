import { h, Component, render } from "preact";

import Masonry from "masonry-layout";

export default class Home extends Component {
  constructor() {
    super();
    this.Masonry = new Masonry({
      columnWidth: "article:not(.x2):not(.x3)"
    });
  }
  render(props, state) {
    return (
      <main id="content">
        {props.Posts.map(post => (
          <Post {...post} Masonry={this.Masonry} />
        ))}
      </main>
    );
  }
}
