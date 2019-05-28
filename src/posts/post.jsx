import { h, Component } from "preact";

import PhotoPost from "./photo";
import TextPost from "./text";

export default class Post extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    };
  }
  componentDidMount() {
    if (this.props.PostType === "text") {
      this.loadPost();
    }
    if (this.props.Masonry()) {
      this.props.Masonry().appended(this.post);
    }
  }
  loadPost() {
    this.props.loadPost();
    this.setState({
      loaded: true
    });
  }
  render(props, state) {
    return (
      <article
        class={`${props.PostType} ${props.TagsAsClasses} ${state.loaded &&
          "loaded"}`}
        ref={post => (this.post = post)}>
        <h2>
          <a class="black" href={`${props.Permalink}`}>
            x {props.ReblogRootName || ""}
          </a>
        </h2>
        {props.PostType === "photo" && (
          <PhotoPost {...props} loadPost={() => this.loadPost()} />
        )}
        {props.PostType === "text" && (
          <TextPost {...props} loadPost={() => this.loadPost()} />
        )}
      </article>
    );
  }
}
