import { h } from "preact";

import Loadable from "./loadable";

export default class LinkPost extends Loadable {
  render(props) {
    return (
      <a
        href={props.URL.replace(/&amp;/g, "&")}
        ref={frame => (this.frame = frame)}
        rel="nofollow noopener"
        target="_blank">
        {props.Thumbnail && (
          <img alt="" onLoad={this.props.LoadPost} src={props.Thumbnail} />
        )}
        {props.Host && <h3>{props.Host}</h3>}
        {props.Description && (
          <p
            dangerouslySetInnerHTML={{
              __html:
                props.Description &&
                props.Description.replace(/(%[\da-fA-F]{2})/g, m =>
                  decodeURIComponent(m)
                )
            }}
          />
        )}
      </a>
    );
  }
}
