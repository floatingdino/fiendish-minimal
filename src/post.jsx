import { h, Component } from "preact";

import PhotoPost from "./posts/photo";

export default class Post extends Component {
  render(props) {
    return (
      <article class={`${props.PostType} ${props.TagsAsClasses}`}>
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
