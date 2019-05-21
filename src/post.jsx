import { h, Component } from "preact";

export default class Post extends Component {
  render(props) {
    console.log(props);
    return (
      <article class={`${props.PostType} ${props.TagsAsClasses}`}>
        <h2>
          <a href={`${props.Permalink}#title`} class="black">
            x
          </a>
          <a href={`${props.ReblogRootURL}`}>{props.ReblogRootName}</a>
        </h2>
        <a href={`${props.Permalink}#title`}>
          <img src={props["PhotoURL-400"]} alt={props.PhotoAlt} />
        </a>
      </article>
    );
  }
}
