import { h, Component } from "preact";

import PhotoPost from "./posts/photo";

export default class Post extends Component {
  componentDidMount() {
    setTimeout(() => {
      if (this.props.Masonry()) {
        this.props.Masonry().appended(this.post);
      }
    }, 500);
  }
  render(props) {
    return (
      <article
        class={`${props.PostType} ${props.TagsAsClasses}`}
        ref={post => (this.post = post)}>
        <h2>
          <a href={`${props.Permalink}#title`} class="black">
            x {props.ReblogRootName || ""}
          </a>
        </h2>
        {props.PostType === "photo" ? <PhotoPost {...props} /> : ""}
      </article>
    );
  }
}
