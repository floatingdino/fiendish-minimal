import { h } from "preact";

import Loadable from "./loadable";

export default class TextPost extends Loadable {
  render(props) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html:
            props.Body &&
            props.Body.replace(/(%[\da-fA-F]{2})/g, m => decodeURIComponent(m))
        }}
        ref={frame => (this.frame = frame)}
      />
    );
  }
}
